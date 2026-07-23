import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { TrendingUp, Scale, Target, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const Progress = () => {
  const { user } = useAuth();
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWorkoutHistory();
    }
  }, [user]);

  const fetchWorkoutHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setWorkoutHistory(data);
    } catch (err) {
      console.error('Error fetching workout history:', err.message);
    } finally {
      setHistoryLoading(false);
    }
  };

  const weightData = [
    { month: 'Jan', weight: 85 }, { month: 'Feb', weight: 83 },
    { month: 'Mar', weight: 82.5 }, { month: 'Apr', weight: 81 },
    { month: 'May', weight: 79.5 }, { month: 'Jun', weight: 78 },
    { month: 'Jul', weight: 76.5 }, { month: 'Aug', weight: 75.4 },
  ];

  const bodyFatData = [
    { month: 'Jan', fat: 18 }, { month: 'Feb', fat: 17.5 },
    { month: 'Mar', fat: 16.2 }, { month: 'Apr', fat: 15.5 },
    { month: 'May', fat: 14.8 }, { month: 'Jun', fat: 13.9 },
    { month: 'Jul', fat: 12.8 }, { month: 'Aug', fat: 12.2 },
  ];

  return (
    <div className="min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-black text-white font-sans pb-32">
      <Navbar />
      <Sidebar />
      
      <div className="pt-28 md:pt-36 px-4 md:px-8 lg:ml-64 lg:px-12 xl:px-20">
        <div className="max-w-[1600px] mx-auto">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="font-heading text-5xl md:text-6xl text-white uppercase tracking-tighter leading-none mb-4">
              Your <span className="text-primary">Progress</span>
            </h1>
            <p className="text-white/50 text-sm font-bold tracking-widest uppercase">Track your journey to greatness</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Current Weight', value: '75.4 kg', change: '-9.6 kg', icon: Scale },
              { label: 'Current Level', value: `LVL ${user?.stats?.level || 1}`, change: `${user?.stats?.points || 0} XP`, icon: Target },
              { label: 'Total Workouts', value: user?.stats?.workoutsCompleted || 0, change: 'Lifetime', icon: Activity },
              { label: 'Strength Index', value: '8.4', change: '+1.2', icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl"
              >
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-heading mb-1">{stat.value}</div>
                <div className="flex items-center justify-between">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-white/50">{stat.label}</div>
                  <div className="text-[10px] font-bold text-green-500">{stat.change}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Session History Section */}
          <div className="mb-12">
            <h3 className="font-heading text-2xl uppercase tracking-widest mb-6">Recent Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {historyLoading ? (
                <div className="col-span-full py-10 flex justify-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : workoutHistory.length > 0 ? (
                workoutHistory.map((h, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-white">{h.title}</div>
                      <div className="text-[8px] font-bold uppercase tracking-widest text-white/30 mt-1">{new Date(h.date).toLocaleDateString()}</div>
                    </div>
                    <div className="text-primary font-heading text-lg">+{Math.floor(h.calories / 2)} XP</div>
                  </div>
                ))
              ) : (
                <div className="col-span-full p-10 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
                  <p className="text-white/30 text-xs font-bold uppercase tracking-widest">No sessions logged yet. Get to work!</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl">
              <h3 className="font-heading text-xl uppercase tracking-widest mb-8">Weight Journey (kg)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weightData}>
                    <defs>
                      <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d3a523" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#d3a523" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} width={30} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ color: '#d3a523', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="weight" stroke="#d3a523" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl">
              <h3 className="font-heading text-xl uppercase tracking-widest mb-8">Body Fat Reduction (%)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bodyFatData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} width={30} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    />
                    <Bar dataKey="fat" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Progress;
