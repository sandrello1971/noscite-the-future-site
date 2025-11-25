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

        if (createError) {
          console.error('Error creating user:', createError);
          
          // If the user already exists in Auth, sync profile and role instead of failing
          if (
            createError.message?.includes('already been registered') ||
            (createError as any).code === 'email_exists' ||
            (createError as any).status === 422
          ) {
            try {
              const { data: usersPage, error: listError } = await supabase.auth.admin.listUsers({
                page: 1,
                perPage: 100,
              });

              if (listError) {
                console.error('Error listing users for existing email:', listError);
                throw listError;
              }

              const existingUser = usersPage?.users?.find(
                (u: any) => u.email?.toLowerCase() === email.toLowerCase()
              );

              if (!existingUser) {
                return new Response(JSON.stringify({
                  error: 'Utente già esistente',
                  details: `Un utente con l'email ${email} risulta registrato ma non è stato possibile recuperarlo.`,
                }), {
                  status: 409,
                  headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
              }

              // Ensure profile exists/updated
              await supabase
                .from('profiles')
                .upsert({ user_id: existingUser.id, email }, { onConflict: 'user_id' });

              // Ensure role is set
              await supabase
                .from('user_roles')
                .delete()
                .eq('user_id', existingUser.id);

              await supabase
                .from('user_roles')
                .insert({ user_id: existingUser.id, role });

              // Optionally send password reset email
              if (requirePasswordChange) {
                const { error: resetError } = await supabase.auth.resetPasswordForEmail(
                  email,
                  {
                    redirectTo: `${req.headers.get('origin') || 'https://noscite.it'}/nosciteadmin/auth?reset=true`,
                  },
                );

                if (resetError) {
                  console.error('Error sending password reset email for existing user:', resetError);
                }
              }

              return new Response(JSON.stringify({
                success: true,
                message: `Utente già esistente sincronizzato. Ruolo impostato a ${role}.`,
              }), {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              });
            } catch (syncError) {
              console.error('Error syncing existing user data:', syncError);

              return new Response(JSON.stringify({
                error: 'Utente già esistente',
                details: `Un utente con l'email ${email} è già registrato, ma si è verificato un errore durante la sincronizzazione.`,
              }), {
                status: 409,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              });
            }
          }
          
          // Generic error
          return new Response(JSON.stringify({ 
            error: 'Errore nella creazione utente',
            details: createError.message
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

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