import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user' | 'moderator';
  created_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'user' | 'moderator' | null>(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);

  console.log('🔍 useAuth state:', { 
    hasUser: !!user, 
    userEmail: user?.email,
    userRole, 
    loading, 
    roleLoading,
    combinedLoading: loading || roleLoading
  });

  useEffect(() => {
    let mounted = true;
    
    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserRole(session.user.id);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('🔔 Auth state changed:', event);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch role SOLO su login o sessione iniziale, MAI su refresh token
          if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            console.log('✅ Fetching user role for event:', event);
            await fetchUserRole(session.user.id);
          } else {
            console.log('⏭️ Skipping role fetch for event:', event);
            // Mantieni il ruolo esistente per eventi come TOKEN_REFRESHED
          }
        } else {
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserRole = async (userId: string) => {
    console.log('🔄 Starting fetchUserRole for:', userId);
    setRoleLoading(true);
    try {
      console.log('📡 Calling get_current_user_role RPC...');

      const { data, error } = await supabase.rpc('get_current_user_role');

      console.log('📋 RPC role result:', { data, error });

      if (error) {
        console.error('❌ Error fetching user role via RPC:', error);
        setUserRole('user');
      } else if (data) {
        const role = data as 'admin' | 'user' | 'moderator';
        console.log('✅ Setting user role to:', role);
        setUserRole(role);
      } else {
        console.log('ℹ️ No role returned from RPC, defaulting to user');
        setUserRole('user');
      }
    } catch (error) {
      console.error('💥 Exception in fetchUserRole:', error);
      setUserRole('user');
    } finally {
      console.log('🏁 fetchUserRole completed, setting roleLoading to false');
      setRoleLoading(false);
    }
  };

  const isAdmin = () => userRole === 'admin';
  
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    session,
    userRole,
    loading: loading || roleLoading,
    isAdmin,
    signOut,
  };
}