import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Play, Plus, Dumbbell, Flame, Zap, X, Trophy, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const Workouts = () => {
  const { user, updateStats } = useAuth();
  const [activeRoutine, setActiveRoutine] = useState(null);
  const [isLogging, setIsLogging] = useState(false);
  const [logStatus, setLogStatus] = useState('idle'); // idle, logging, finished

  const categories = [
    { name: 'Strength', icon: Dumbbell, color: 'text-primary' },
    { name: 'Cardio', icon: Flame, color: 'text-orange-500' },
    { name: 'HIIT', icon: Zap, color: 'text-yellow-500' },
  ];

  const routines = [
    { id: 1, title: 'Push Day', duration: '45 Min', level: 'Intermediate', target: 'Chest, Shoulders, Triceps', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80', xp: 50 },
    { id: 2, title: 'Pull Day', duration: '50 Min', level: 'Advanced', target: 'Back, Biceps, Forearms', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80', xp: 60 },
    { id: 3, title: 'Leg Day', duration: '60 Min', level: 'Advanced', target: 'Quads, Hamstrings, Calves', image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&q=80', xp: 75 },
    { id: 4, title: 'Core Crusher', duration: '20 Min', level: 'Beginner', target: 'Abs, Obliques', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80', xp: 30 },
  ];

  const handleStartWorkout = (routine) => {
    setActiveRoutine(routine);
    setIsLogging(true);
    setLogStatus('logging');
  };

  const handleFinishWorkout = async () => {
    setLogStatus('finished');
    const earnedXp = activeRoutine.xp;
    const currentPoints = user?.stats?.points || 0;
    const currentWorkouts = user?.stats?.workoutsCompleted || 0;
    
    const newPoints = currentPoints + earnedXp;
    const newLevel = Math.max(user?.stats?.level || 1, Math.floor(newPoints / 1000) + 1);
    
    const caloriesBurned = earnedXp * 2; // XP based calorie calculation
    const currentCalories = user?.stats?.caloriesBurned || 0;
    const currentWeight = user?.stats?.currentWeight || 75.0;
    const weightLoss = (caloriesBurned / 100) * 0.01;
    const newWeight = parseFloat((currentWeight - weightLoss).toFixed(2));

    // 1. Update Profile Stats in Supabase
    await updateStats({
      points: newPoints,
      level: newLevel,
      workoutsCompleted: currentWorkouts + 1,
      caloriesBurned: currentCalories + caloriesBurned,
      currentWeight: newWeight
    });

    // 2. Save Workout Session to Supabase
    try {
      const { error } = await supabase
        .from('workouts')
        .insert([{
          user_id: user.id,
          title: activeRoutine.title,
          type: activeRoutine.level, // Using level as type for now
          duration: activeRoutine.duration,
          calories: earnedXp * 2, // Mock calorie calculation
          date: new Date().toISOString()
        }]);

      if (error) throw error;
    } catch (err) {
      console.error('Error logging workout to Supabase:', err.message);
    }

    setTimeout(() => {
      setIsLogging(false);
      setActiveRoutine(null);
      setLogStatus('idle');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-black text-white font-sans pb-32">
      <Navbar />
      <Sidebar />
      
      <div className="pt-28 md:pt-36 px-4 md:px-8 lg:ml-64 lg:px-12 xl:px-20">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-heading text-5xl md:text-6xl text-white uppercase tracking-tighter leading-none mb-4">
                Workout <span className="text-primary">Library</span>
              </h1>
              <p className="text-white/50 text-sm font-bold tracking-widest uppercase">Select a plan or create your own</p>
            </motion.div>
            <button className="px-6 py-3 bg-primary text-black font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(211,165,35,0.3)]">
              <Plus className="w-4 h-4" /> Custom Workout
            </button>
          </div>

          <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
            <button className="px-6 py-2 bg-primary text-black rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
              All Routines
            </button>
            {categories.map((cat, i) => (
              <button key={i} className="px-6 py-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap flex items-center gap-2 transition-colors">
                <cat.icon className={`w-3 h-3 ${cat.color}`} /> {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {routines.map((routine, i) => (
              <motion.div 
                key={routine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => handleStartWorkout(routine)}
              >
                <div className="relative h-64 rounded-3xl overflow-hidden mb-4 border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                  <img src={routine.image} alt={routine.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-black shadow-[0_0_30px_rgba(211,165,35,0.5)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-6 h-6 ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest text-primary border border-white/10">
                        {routine.level}
                      </span>
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest text-white border border-white/10">
                        {routine.duration}
                      </span>
                    </div>
                    <span className="w-fit px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest text-primary border border-primary/20">
                      +{routine.xp} XP
                    </span>
                  </div>
                </div>
                <h3 className="font-heading text-2xl uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">{routine.title}</h3>
                <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{routine.target}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Workout Log Modal */}
      <AnimatePresence>
        {isLogging && activeRoutine && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => logStatus !== 'finished' && setIsLogging(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 shadow-[0_0_50px_rgba(211,165,35,0.1)] overflow-hidden"
            >
              {logStatus === 'logging' ? (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <div className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-1">Session Active</div>
                      <h2 className="font-heading text-4xl uppercase tracking-tight text-white">{activeRoutine.title}</h2>
                    </div>
                    <button onClick={() => setIsLogging(false)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                      <X className="w-5 h-5 text-white/40" />
                    </button>
                  </div>

                  <div className="space-y-6 mb-10">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                        <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-1">Target Weight</div>
                        <div className="text-xl font-heading text-white">45<span className="text-xs ml-1 text-white/40 font-sans">KG</span></div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                        <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-1">Sets</div>
                        <div className="text-xl font-heading text-white">4</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                        <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-1">Reps</div>
                        <div className="text-xl font-heading text-white">12</div>
                      </div>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/20 flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(211,165,35,0.2)]">
                        <Dumbbell className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">Current Exercise</div>
                        <div className="text-lg font-heading text-white uppercase tracking-widest">Bench Press</div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleFinishWorkout}
                    className="w-full py-4 bg-primary text-black font-bold uppercase tracking-[0.2em] text-[12px] rounded-2xl hover:bg-amber-400 shadow-xl transition-all active:scale-95"
                  >
                    Finish Workout
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center text-center py-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>
                  <h2 className="font-heading text-5xl uppercase tracking-tighter text-white mb-2">Workout Complete!</h2>
                  <p className="text-white/40 text-sm mb-10 font-medium italic">"The only bad workout is the one that didn't happen."</p>
                  
                  <div className="flex gap-4 w-full">
                    <div className="flex-1 p-6 bg-white/5 rounded-3xl border border-white/10">
                      <Trophy className="w-6 h-6 text-primary mx-auto mb-3" />
                      <div className="text-2xl font-heading text-white leading-none">+{activeRoutine.xp}</div>
                      <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest mt-2">XP Earned</div>
                    </div>
                    <div className="flex-1 p-6 bg-white/5 rounded-3xl border border-white/10">
                      <div className="text-2xl font-heading text-primary leading-none">#{user?.stats?.workoutsCompleted + 1}</div>
                      <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest mt-2">Total Session</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Background Glow */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Workouts;
