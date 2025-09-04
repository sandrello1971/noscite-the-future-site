import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
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
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Evita richieste ruolo inutili su TOKEN_REFRESHED/USER_UPDATED
          if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            await fetchUserRole(session.user.id);
          }
        } else {
          setUserRole(null);
        }
        
        // Non rimettiamo mai loading a true qui
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
      console.log('📡 Making role query request...');
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      console.log('📋 Role query completed:', { data, error });

      if (error) {
        if (error.code === 'PGRST116') { 
          console.log('🔍 No role found for user, defaulting to user');
          setUserRole('user');
        } else {
          console.error('❌ Error fetching user role:', error);
          console.error('❌ Error details:', error.message, error.code);
          setUserRole('user'); // Default to user role if error
        }
      } else {
        const role = data?.role || 'user';
        console.log('✅ Setting user role to:', role);
        setUserRole(role);
      }
    } catch (error) {
      console.error('💥 Exception in fetchUserRole:', error);
      setUserRole('user'); // Default to user role
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