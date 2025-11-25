import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role for admin operations
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    // Initialize client with user auth for permission check
    const authHeader = req.headers.get('Authorization');
    const userSupabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || '',
      {
        global: {
          headers: authHeader ? { Authorization: authHeader } : {},
        },
      }
    );

    // Verify user is admin
    const { data: userRole, error: roleError } = await userSupabase.rpc('get_current_user_role');
    if (roleError || userRole !== 'admin') {
      return new Response(JSON.stringify({ error: 'Unauthorized - Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { action, email, role, userId, password, requirePasswordChange } = await req.json();

    console.log('Admin operation:', { action, email, role, userId });

    switch (action) {
      case 'createUser':
        if (!email || !role || !password) {
          return new Response(JSON.stringify({ error: 'Email, password and role are required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true,
          user_metadata: {
            role: role
          }
        });

        if (createError) throw createError;

        // Create profile
        await supabase
          .from('profiles')
          .insert({
            user_id: newUser.user.id,
            email: email
          });

        // Assign role
        await supabase
          .from('user_roles')
          .insert({
            user_id: newUser.user.id,
            role: role
          });

        // If password change is required, send password reset email
        if (requirePasswordChange) {
          const { error: resetError } = await supabase.auth.resetPasswordForEmail(
            email,
            {
              redirectTo: `${req.headers.get('origin') || 'https://noscite.it'}/nosciteadmin/auth?reset=true`
            }
          );
          
          if (resetError) {
            console.error('Error sending password reset email:', resetError);
            // Don't fail the user creation if reset email fails
          }
        }

        return new Response(JSON.stringify({ 
          success: true, 
          message: requirePasswordChange 
            ? `User ${email} created. Password reset email sent.`
            : `User ${email} created successfully`
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'invite':
        if (!email || !role) {
          return new Response(JSON.stringify({ error: 'Email and role are required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(
          email,
          {
            redirectTo: `${req.headers.get('origin') || 'https://your-domain.com'}/nosciteadmin/auth`
          }
        );

        if (inviteError) throw inviteError;

        return new Response(JSON.stringify({ success: true, message: `Invite sent to ${email}` }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'changeRole':
        if (!userId || !role) {
          return new Response(JSON.stringify({ error: 'UserId and role are required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Delete existing role
        await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId);

        // Insert new role
        const { error: roleUpdateError } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: role
          });

        if (roleUpdateError) throw roleUpdateError;

        return new Response(JSON.stringify({ success: true, message: `Role updated to ${role}` }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'deleteUser':
        if (!userId) {
          return new Response(JSON.stringify({ error: 'UserId is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Delete user roles
        await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId);

        // Delete user profile
        await supabase
          .from('profiles')
          .delete()
          .eq('user_id', userId);

        return new Response(JSON.stringify({ success: true, message: 'User deleted successfully' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

  } catch (error) {
    console.error('Error in admin-operations function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});