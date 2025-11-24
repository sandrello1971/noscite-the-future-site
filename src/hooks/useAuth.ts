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

    // Listen for auth changes FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        console.log('🔔 Auth state changed:', event);

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch role solo su SIGNED_IN o INITIAL_SESSION, MAI su TOKEN_REFRESHED
          if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            console.log('✅ Scheduling user role fetch for event:', event);
            // Deferiamo la chiamata Supabase fuori dal callback per evitare deadlock
            setTimeout(() => {
              if (!mounted) return;
              fetchUserRole(session.user!.id);
            }, 0);
          } else {
            console.log('⏭️ Skipping role fetch for event:', event);
          }
        } else {
          setUserRole(null);
        }

        setLoading(false);
      }
    );

    // Poi recuperiamo la sessione iniziale
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          console.log('✅ Initial session found, fetching user role');
          fetchUserRole(session.user.id);
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