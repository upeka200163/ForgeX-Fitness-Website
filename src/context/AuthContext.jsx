import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        fetchProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (authUser) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      // Merge auth user with profile data (fallback to auth metadata if profile not found)
      setUser({
        ...authUser,
        name: data?.full_name || authUser.user_metadata?.full_name || 'Athlete',
        stats: {
          workoutsCompleted: data?.workouts_completed || 0,
          streak: data?.streak || 0,
          totalHours: data?.total_hours || 0,
          points: data?.points || 0,
          level: data?.level || 1,
          caloriesBurned: data?.calories_burned || 0,
          currentWeight: data?.current_weight || 75.0,
          badges: data?.badges || []
        }
      });
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.name,
          avatar_url: userData.avatar || ''
        }
      }
    });

    if (error) {
      setLoading(false);
      throw error;
    }

    if (data?.user && !data?.session) {
      setLoading(false);
      throw new Error('Registration successful! Please check your email to confirm your account before logging in.');
    }

    return data;
  };

  const login = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      throw error;
    }
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const loginAsGuest = () => {
    setLoading(true);
    const guestUser = {
      id: 'guest-123',
      email: 'guest@forgex.com',
      name: 'Guest Athlete',
      user_metadata: { full_name: 'Guest Athlete' },
      stats: {
        workoutsCompleted: 12,
        streak: 5,
        totalHours: 24,
        points: 1250,
        level: 3,
        caloriesBurned: 8400,
        currentWeight: 78.5,
        badges: [
          { title: 'Early Bird', icon: 'Sun' },
          { title: 'Consistency King', icon: 'Trophy' }
        ]
      }
    };
    setUser(guestUser);
    setLoading(false);
  };

  const updateStats = async (newStats) => {
    if (!user) return;

    // Map stats to database column names
    const dbStats = {};
    if (newStats.workoutsCompleted !== undefined) dbStats.workouts_completed = newStats.workoutsCompleted;
    if (newStats.streak !== undefined) dbStats.streak = newStats.streak;
    if (newStats.totalHours !== undefined) dbStats.total_hours = newStats.totalHours;
    if (newStats.points !== undefined) dbStats.points = newStats.points;
    if (newStats.level !== undefined) dbStats.level = newStats.level;
    if (newStats.caloriesBurned !== undefined) dbStats.calories_burned = newStats.caloriesBurned;
    if (newStats.currentWeight !== undefined) dbStats.current_weight = newStats.currentWeight;

    const { error } = await supabase
      .from('profiles')
      .update({
        ...dbStats,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating stats:', error.message);
      return;
    }
    // Update local state
    setUser(prev => ({
      ...prev,
      stats: { ...prev.stats, ...newStats }
    }));
  };

  const updateBadges = async (newBadge) => {
    if (!user) return;

    const currentBadges = user.stats.badges || [];
    if (currentBadges.find(b => b.title === newBadge.title)) return; 

    const updatedBadges = [...currentBadges, { ...newBadge, date: new Date().toLocaleDateString() }];

    const { error } = await supabase
      .from('profiles')
      .update({
        badges: updatedBadges,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating badges:', error.message);
      return;
    }

    setUser(prev => ({
      ...prev,
      stats: { ...prev.stats, badges: updatedBadges }
    }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, loginAsGuest, updateStats, updateBadges }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
