import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TrafficTracker from '../components/TrafficTracker';
import { Link, useNavigate } from 'react-router-dom';
import {
  Play, Flame, Zap, Trophy, TrendingUp, Calendar, ChevronRight, MessageSquare, Bell, Search, Settings, Filter, Download, ExternalLink, Share2, MoreHorizontal, User, LogOut,
  Activity, Dumbbell, ArrowRight, Medal, Target, Scale, QrCode, Plus, Users, Award, Lightbulb, Apple, Moon, Sparkles, Clock, MapPin, BellRing, ChevronLeft, ChevronRight as ChevronRightIcon, CheckCircle2, XCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const WEIGHT_DATA = [
  { week: 'W1', weight: 82.5 },
  { week: 'W2', weight: 81.2 },
  { week: 'W3', weight: 80.8 },
  { week: 'W4', weight: 79.5 },
  { week: 'W5', weight: 78.9 },
  { week: 'W6', weight: 77.4 },
  { week: 'W7', weight: 76.8 },
  { week: 'W8', weight: 75.4 },
];

const MEASUREMENTS_DATA = [
  { month: 'JAN', chest: 102, waist: 82, arms: 38 },
  { month: 'FEB', chest: 104, waist: 81, arms: 39 },
  { month: 'MAR', chest: 105, waist: 80, arms: 40 },
];

const INTELLIGENCE_CARDS = [
  {
    title: "Nutrition Mastery",
    desc: "Fuel your forge with high-density nutrients and lean protein.",
    icon: Apple,
    color: "text-green-400",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600"
  },
  {
    title: "Training Science",
    desc: "Master progressive overload and optimized muscle engagement.",
    icon: Dumbbell,
    color: "text-primary",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600"
  },
  {
    title: "Recovery Protocol",
    desc: "Optimize your 7-9 hours of growth with deep sleep science.",
    icon: Moon,
    color: "text-blue-400",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600"
  },
  {
    title: "Mindset Logic",
    desc: "Hyper-focus and mental resilience are your ultimate weapons.",
    icon: Zap,
    color: "text-amber-400",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600"
  }
];

const UPCOMING_SESSIONS = [
  { id: 1, title: 'Yoga Flow', time: '07:00', instructor: 'Dilini', location: 'Zen Room', day: 5 }, // Today (Friday)
  { id: 2, title: 'Crossfit WOD', time: '17:00', instructor: 'Roshan', location: 'Main Floor', day: 6 }, // Tomorrow (Saturday)
  { id: 3, title: 'HIIT Extreme', time: '18:00', instructor: 'Kasun', location: 'Studio A', day: 1 }, // Monday
  { id: 4, title: 'Core Power', time: '19:15', instructor: 'Chaminda', location: 'Studio B', day: 3 } // Wednesday
];

const ActivityRings = () => (
  <div className="relative w-40 h-40 flex items-center justify-center">
    {/* Outer Ring: Move (Gold) */}
    <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(211,165,35,0.1)" strokeWidth="14" />
      <circle cx="100" cy="100" r="85" fill="none" stroke="#d3a523" strokeWidth="14" strokeDasharray="534" strokeDashoffset="130" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(211,165,35,0.8)]" />
    </svg>
    {/* Middle Ring: Lift (Orange) */}
    <svg className="absolute w-32 h-32 transform -rotate-90" viewBox="0 0 160 160">
      <circle cx="80" cy="80" r="65" fill="none" stroke="rgba(249,115,22,0.1)" strokeWidth="14" />
      <circle cx="80" cy="80" r="65" fill="none" stroke="#f97316" strokeWidth="14" strokeDasharray="408" strokeDashoffset="150" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
    </svg>
    {/* Inner Ring: Focus (Cyan) */}
    <svg className="absolute w-24 h-24 transform -rotate-90" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="14" />
      <circle cx="60" cy="60" r="45" fill="none" stroke="#06b6d4" strokeWidth="14" strokeDasharray="282" strokeDashoffset="40" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
    </svg>
    <div className="absolute flex flex-col items-center justify-center">
      <Flame className="w-6 h-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
    </div>
  </div>
);

const ALL_BADGES = [
  { id: 'rookie', title: 'Rookie Lifter', requiredXP: 500, desc: 'First steps', longDesc: 'You started your journey! This badge is awarded to those who take their first steps into the forge.', rarity: 'Common', img: 'https://cdn-icons-png.flaticon.com/512/5968/5968923.png', color: 'from-blue-400/20 to-blue-600/5' },
  { id: 'consistent', title: 'Consistent King', requiredXP: 2000, desc: '7 days streak', longDesc: 'You have consistently hit the gym for 7 days straight without missing a session. Your dedication is inspiring!', rarity: 'Rare', img: 'https://cdn-icons-png.flaticon.com/512/5968/5968923.png', color: 'from-amber-400/20 to-yellow-600/5' },
  { id: 'heavy', title: 'Heavy Lifter', requiredXP: 5000, desc: 'Moved 10,000kg', longDesc: 'You have moved a cumulative weight of 10,000kg across all your lifts. Your strength is reaching legendary levels.', rarity: 'Epic', img: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png', color: 'from-primary/20 to-amber-600/5' },
  { id: 'goal', title: 'Goal Crusher', requiredXP: 10000, desc: 'Major Goal Reached', longDesc: 'You set a major target and absolutely crushed it. This badge commemorates your incredible dedication.', rarity: 'Legendary', img: 'https://cdn-icons-png.flaticon.com/512/3112/3112946.png', color: 'from-primary/20 to-amber-600/5' },
  { id: 'sleep', title: 'Sleep Master', requiredXP: 15000, desc: '8h Sleep for 7 days', longDesc: 'Recovery is half the battle. You have prioritized your rest and allowed your muscles to grow.', rarity: 'Rare', img: 'https://cdn-icons-png.flaticon.com/512/3094/3094831.png', color: 'from-indigo-400/20 to-purple-600/5' },
  { id: 'water', title: 'Hydration Hero', requiredXP: 18000, desc: '3L Water Daily', longDesc: 'You are perfectly hydrated. Your performance and recovery are at their peak.', rarity: 'Common', img: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png', color: 'from-cyan-400/20 to-blue-600/5' },
  { id: 'legend', title: 'Forge Legend', requiredXP: 25000, desc: 'Top 1% Elite', longDesc: 'Only the top 1% of athletes reach this status. You are a true legend of the forge.', rarity: 'Mythic', img: 'https://cdn-icons-png.flaticon.com/512/3112/3112946.png', color: 'from-purple-500/20 to-indigo-600/5' },
];

const Dashboard = () => {
  const { user, logout, updateBadges } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, [user]);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, points, level')
        .order('points', { ascending: false })
        .limit(5);

      if (error) throw error;

      const MOCK_COMPETITORS = [
        { full_name: 'Kasun Perera', points: 12500, level: 15 },
        { full_name: 'Dilshan Silva', points: 10200, level: 12 },
        { full_name: 'Nimesh Rathnayake', points: 8900, level: 10 },
        { full_name: 'Sachini Fernando', points: 7500, level: 8 }
      ];

      const allUsers = [...(data || []), ...MOCK_COMPETITORS]
        .sort((a, b) => b.points - a.points)
        .slice(0, 6);

      setLeaderboard(allUsers.map((p, i) => ({
        rank: i + 1,
        name: p.full_name,
        xp: p.points,
        level: p.level,
        isMe: p.full_name === user?.name
      })));
    } catch (err) {
      console.error('Error fetching leaderboard:', err.message);
    }
  };
  const navigate = useNavigate();

  // Traffic Tracker State
  const [trafficCount, setTrafficCount] = React.useState(() => {
    const saved = localStorage.getItem('forgex_live_traffic');
    return saved ? parseInt(saved) : 15;
  });

  const [selectedBadge, setSelectedBadge] = React.useState(null);

  const [isCheckedIn, setIsCheckedIn] = React.useState(() => {
    return localStorage.getItem(`forgex_checked_in_${user?.id}`) === 'true';
  });

  // Smart Watch Sync State
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [livePulse, setLivePulse] = React.useState(72);
  const [workoutTimer, setWorkoutTimer] = React.useState(0);
  const [joinedSessions, setJoinedSessions] = React.useState({ 3: true });
  const [reminders, setReminders] = React.useState({ 3: true });
  const [confirmingSessionId, setConfirmingSessionId] = React.useState(null);
  const [reminderTime, setReminderTime] = React.useState('15');
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [isFullScheduleOpen, setIsFullScheduleOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState(new Date(2026, 4, 1)); // Default to May 2026

  const { updateStats } = useAuth();

  // Pulse Simulation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse(prev => {
        const base = isSyncing ? 110 : 70;
        const variation = Math.floor(Math.random() * 20);
        return base + variation;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isSyncing]);

  // Workout Timer Simulation
  React.useEffect(() => {
    let interval;
    if (isSyncing) {
      interval = setInterval(() => {
        setWorkoutTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSyncing]);

  const handleSyncToggle = async () => {
    if (isSyncing) {
      // Ending workout, sync to DB
      const sessionSeconds = workoutTimer;
      if (sessionSeconds < 10) { // Safety: Don't sync sessions shorter than 10s
        setIsSyncing(false);
        setWorkoutTimer(0);
        return;
      }

      const hoursAdded = parseFloat((sessionSeconds / 3600).toFixed(2));
      const currentHours = user?.stats?.totalHours || 0;
      const currentWorkouts = user?.stats?.workoutsCompleted || 0;
      const currentCalories = user?.stats?.caloriesBurned || 0;
      const currentWeight = user?.stats?.currentWeight || 75.0;

      // Calculate new points: 10 XP for starting + 2 XP per minute
      const xpEarned = 10 + Math.floor(sessionSeconds / 60) * 2;
      const newPoints = (user?.stats?.points || 0) + xpEarned;

      // Calculate calories: ~8 calories per minute
      const caloriesEarned = Math.floor(sessionSeconds / 60) * 8;

      // Calculate weight change: ~0.01kg per 100 calories (simulated)
      const weightLoss = (caloriesEarned / 100) * 0.01;
      const newWeight = parseFloat((currentWeight - weightLoss).toFixed(2));

      // Simple level calculation: 1 level per 1000 XP
      const newLevel = Math.max(user?.stats?.level || 1, Math.floor(newPoints / 1000) + 1);

      await updateStats({
        totalHours: currentHours + hoursAdded,
        workoutsCompleted: currentWorkouts + 1,
        points: newPoints,
        level: newLevel,
        caloriesBurned: currentCalories + caloriesEarned,
        currentWeight: newWeight
      });

      setWorkoutTimer(0);
    }
    setIsSyncing(!isSyncing);
  };

  React.useEffect(() => {
    localStorage.setItem('forgex_live_traffic', trafficCount.toString());
  }, [trafficCount]);

  React.useEffect(() => {
    if (user) {
      localStorage.setItem(`forgex_checked_in_${user.id}`, isCheckedIn.toString());
    }
  }, [isCheckedIn, user]);

  // Simulate live traffic fluctuations (Real-time Feel)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTrafficCount(prev => {
        // Randomly change by -1, 0, or +1
        const change = Math.floor(Math.random() * 3) - 1;
        let newCount = prev + change;

        // Keep bounds between 5 and 45 members
        if (newCount < 5) return 5;
        if (newCount > 45) return 45;
        return newCount;
      });
    }, 8000); // Updates every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const handleTrafficToggle = () => {
    if (isCheckedIn) {
      setTrafficCount(prev => Math.max(0, prev - 1));
    } else {
      setTrafficCount(prev => prev + 1);
    }
    setIsCheckedIn(!isCheckedIn);
  };

  const toggleJoin = (sessionId) => {
    setJoinedSessions(prev => ({ ...prev, [sessionId]: !prev[sessionId] }));
  };

  const toggleReminder = (id) => {
    setReminders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleConfirmReservation = (id, wantReminder) => {
    setJoinedSessions(prev => ({ ...prev, [id]: true }));
    if (wantReminder) {
      setReminders(prev => ({ ...prev, [id]: true }));
    }
    setConfirmingSessionId(null);
  };

  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-black text-white selection:bg-primary selection:text-black font-sans pb-32">
      <Navbar />
      <Sidebar />

      <div className="pt-28 md:pt-36 px-4 md:px-8 lg:ml-64 lg:px-12 xl:px-20">
        <div className="max-w-[1600px] mx-auto">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/10 pb-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/70">Personal Dashboard</span>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white uppercase tracking-tighter leading-none">
                G'DAY, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200">{user?.name?.split(' ')[0] || 'Athlete'}</span>
              </h1>
            </motion.div>

            <div className="flex items-center gap-3 relative">
              {/* Quick Schedule Button */}
              <button
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className={`w-12 h-12 rounded-full border transition-all flex items-center justify-center relative z-20 ${isCalendarOpen ? 'bg-primary border-primary text-black' : 'bg-white/5 border-white/10 hover:border-primary/50 text-white'}`}
              >
                <Calendar className="w-5 h-5" />
                {Object.keys(joinedSessions).filter(k => joinedSessions[k]).length > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#050505] flex items-center justify-center text-[8px] font-bold">
                    {Object.keys(joinedSessions).filter(k => joinedSessions[k]).length}
                  </div>
                )}
              </button>

              <AnimatePresence>
                {isCalendarOpen && (
                  <>
                    {/* Backdrop for closing */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsCalendarOpen(false)}
                      className="fixed inset-0 z-[90]"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-16 right-0 w-[350px] bg-[#111] border border-white/10 rounded-[2.5rem] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.9)] z-[100] backdrop-blur-3xl"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h4 className="font-heading text-xl uppercase tracking-widest text-white leading-none">Quick Schedule</h4>
                          <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em] mt-2">Next available sessions</p>
                        </div>
                        <Link to="/classes" onClick={() => setIsCalendarOpen(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all">
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="space-y-4">
                        {UPCOMING_SESSIONS.map((session) => (
                          <div key={session.id} className="p-5 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all group">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h5 className="font-heading text-base uppercase text-white tracking-tight group-hover:text-primary transition-colors">{session.title}</h5>
                                <div className="flex items-center gap-2 mt-1">
                                  <Clock className="w-3 h-3 text-primary" />
                                  <span className="text-[10px] text-white/40 font-bold uppercase">{session.time}</span>
                                </div>
                              </div>
                              <div className="text-[9px] text-white/20 font-bold uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-white/5">
                                {session.location}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleJoin(session.id); }}
                                className={`flex-1 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${joinedSessions[session.id]
                                    ? 'bg-green-500/20 text-green-500 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                                    : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white'
                                  }`}
                              >
                                {joinedSessions[session.id] ? 'Joined' : 'Join Class'}
                              </button>

                              {joinedSessions[session.id] && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); toggleReminder(session.id); }}
                                  className={`px-4 py-3 rounded-xl transition-all ${reminders[session.id]
                                      ? 'bg-primary text-black shadow-[0_0_20px_rgba(211,165,35,0.3)]'
                                      : 'bg-white/5 text-white/30 border border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}
                                  title="Set Reminder"
                                >
                                  <BellRing className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <Link to="/classes" onClick={() => setIsCalendarOpen(false)} className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] hover:text-primary transition-colors">
                          View Full Forge Schedule
                        </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              <div className="w-12 h-12 rounded-full border-2 border-primary/50 overflow-hidden shadow-[0_0_20px_rgba(211,165,35,0.2)]">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Athlete'}`} alt="Profile" className="w-full h-full bg-white/5" />
              </div>
              <button onClick={() => { logout(); navigate('/'); }} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-500 transition-all flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dynamic Milestone Banner (Full Width Slim) */}
          <div className="mb-10">
            {(() => {
              const userXP = user?.stats?.points || 0;
              const earnedBadges = user?.stats?.badges || [];
              const nextBadge = ALL_BADGES.find(b => !earnedBadges.find(ub => ub.title === b.title));

              if (!nextBadge) return null;
              const isReached = userXP >= nextBadge.requiredXP;

              return (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative overflow-hidden rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-3xl border ${isReached
                      ? 'bg-gradient-to-r from-[#d3a523]/20 via-[#d3a523]/5 to-transparent border-[#d3a523]/40'
                      : 'bg-white/[0.03] border-white/10'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isReached ? 'bg-primary text-black animate-pulse' : 'bg-white/5 text-white/20'}`}>
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`font-heading text-lg ${isReached ? 'text-primary' : 'text-white/60'} uppercase tracking-widest leading-none`}>
                        {isReached ? 'Milestone Reached!' : 'Next Rank'}
                      </h4>
                      <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-white/40 mt-1">
                        {isReached ? `Unlock the ${nextBadge.title} Badge` : `Earn XP for ${nextBadge.title}`}
                      </p>
                    </div>
                  </div>
                  <button
                    disabled={!isReached}
                    onClick={() => updateBadges({ ...nextBadge, active: true })}
                    className={`px-6 py-2 text-[9px] font-bold tracking-[0.2em] uppercase rounded-lg transition-all ${isReached ? 'bg-white text-black hover:bg-primary' : 'bg-white/5 text-white/10 cursor-not-allowed'
                      }`}
                  >
                    {isReached ? 'Claim Reward' : 'Locked'}
                  </button>
                </motion.div>
              );
            })()}
          </div>

          {/* Forge Intelligence Infinite Slider (Top Featured) */}
          <div className="relative space-y-6 mb-16">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <h3 className="font-heading text-lg tracking-widest uppercase text-white">Forge Intelligence</h3>
              </div>
              <Link to="/knowledge" className="text-[9px] font-bold tracking-[0.2em] uppercase text-primary hover:text-white transition-colors">
                Explore All <ArrowRight className="inline w-3 h-3 ml-1" />
              </Link>
            </div>

            <div className="relative w-full overflow-hidden py-2">
              <motion.div
                className="flex gap-6 w-fit"
                animate={{
                  x: [0, -1600]
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {[...INTELLIGENCE_CARDS, ...INTELLIGENCE_CARDS, ...INTELLIGENCE_CARDS].map((card, idx) => (
                  <div
                    key={idx}
                    className="w-[350px] md:w-[450px] h-[220px] md:h-[280px] rounded-[2.5rem] relative overflow-hidden border border-white/10 group flex-shrink-0 shadow-2xl"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                    <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 ${card.color}`}>
                          <card.icon className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <h4 className="font-heading text-lg md:text-xl text-white uppercase tracking-tight">{card.title}</h4>
                      </div>
                      <p className="text-white/60 text-[10px] md:text-xs font-light leading-relaxed max-w-[280px]">
                        {card.desc}
                      </p>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <Link to="/knowledge" className="bg-white text-black px-6 py-3 rounded-xl text-[9px] font-bold tracking-widest uppercase">
                        Read Protocol
                      </Link>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>


          {/* MAIN GRID */}

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT COLUMN: Traffic & Charts */}
            <div className="lg:col-span-8 space-y-8">

              {/* Top Row: Traffic & Forge Core */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                <div className="xl:col-span-2 cursor-pointer transition-transform hover:scale-[1.01]" onClick={handleTrafficToggle}>
                  <TrafficTracker count={trafficCount} />
                </div>

                {/* Forge Core Rings */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl p-6 rounded-3xl backdrop-blur-xl flex flex-col items-center justify-center relative"
                >
                  <h3 className="font-heading text-lg tracking-widest uppercase mb-4 w-full text-left">Activity</h3>
                  <ActivityRings />
                  <div className="w-full flex justify-between px-2 mt-4 text-center">
                    <div>
                      <div className="text-primary font-heading text-xl">850</div>
                      <div className="text-[8px] text-white/50 uppercase tracking-widest font-bold">Move</div>
                    </div>
                    <div>
                      <div className="text-orange-500 font-heading text-xl">12k</div>
                      <div className="text-[8px] text-white/50 uppercase tracking-widest font-bold">Lift</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* STATS STRIP */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Workouts', value: user?.stats?.workoutsCompleted || 0, icon: Activity, color: 'text-primary' },
                  { label: 'Kcal Burned', value: user?.stats?.caloriesBurned || 0, icon: Zap, color: 'text-amber-400' },
                  { label: 'Current Weight', value: `${user?.stats?.currentWeight || 75} kg`, icon: Scale, color: 'text-orange-400' },
                  { label: 'Focus Score', value: '92%', icon: Trophy, color: 'text-blue-400' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl p-6 rounded-3xl hover:border-white/20 transition-all backdrop-blur-xl"
                  >
                    <div className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="text-3xl font-heading text-white">{stat.value}</div>
                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* INTERACTIVE CHARTS ROW (RESTORED) */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* Weight Tracker Line Chart */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl p-8 rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-heading text-lg tracking-widest uppercase flex items-center gap-3">
                      <Scale className="w-5 h-5 text-primary" /> Weight Progress
                    </h3>
                    <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-bold tracking-widest uppercase">
                      {(82.0 - (user?.stats?.currentWeight || 75.0)).toFixed(1)} kg Lost
                    </div>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={WEIGHT_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                        <YAxis domain={['dataMin - 2', 'dataMax + 2']} axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                        <Line type="monotone" dataKey="weight" stroke="#d3a523" strokeWidth={4} dot={{ r: 4, fill: '#111', stroke: '#d3a523', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Body Measurements Bar Chart */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl p-8 rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-heading text-lg tracking-widest uppercase flex items-center gap-3">
                      <Activity className="w-5 h-5 text-primary" /> Body Size (cm)
                    </h3>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MEASUREMENTS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                        <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                        <Bar dataKey="chest" fill="#d3a523" radius={[4, 4, 0, 0]} barSize={8} />
                        <Bar dataKey="waist" fill="#ffffff" radius={[4, 4, 0, 0]} barSize={8} opacity={0.6} />
                        <Bar dataKey="arms" fill="#ffffff" radius={[4, 4, 0, 0]} barSize={8} opacity={0.2} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /><span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Chest</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/60" /><span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Waist</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/20" /><span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Arms</span></div>
                  </div>
                </motion.div>

              </div>

              {/* AI Planner Prompt */}
              <motion.div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 shadow-2xl p-10 rounded-[3rem] relative overflow-hidden group backdrop-blur-xl">
                <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Dumbbell className="w-64 h-64 rotate-45" />
                </div>
                <div className="relative z-10 max-w-xl">
                  <h3 className="font-heading text-4xl text-primary uppercase tracking-tight mb-4 drop-shadow-md">Forge Your Next Level</h3>
                  <p className="text-white/80 text-sm mb-8 leading-relaxed font-light">
                    Your personalized training protocol has been updated. Open the ForgeX AI to review today's targets and generate your next workout.
                  </p>
                  <Link
                    to="/ai-planner"
                    className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-primary transition-all duration-500 shadow-lg"
                  >
                    Launch Planner <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* MOVED & REDESIGNED: Upcoming Sessions Widget */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="flex justify-between items-center mb-10">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-heading text-2xl tracking-widest uppercase text-white">Your Training Schedule</h3>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">May 2026 Protocol</span>
                  </div>
                  <Link
                    to="/classes"
                    className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-bold text-white/40 uppercase tracking-widest hover:bg-primary hover:text-black hover:border-primary transition-all group"
                  >
                    Manage Sessions <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {UPCOMING_SESSIONS.map((session) => {
                    const sessionDayLabel = (session.day === new Date().getDay()) ? 'TODAY' : 
                                           (session.day === (new Date().getDay() + 1) % 7) ? 'TOMORROW' : 
                                           ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][session.day];
                    const isToday = sessionDayLabel === 'TODAY';
                    const isJoined = joinedSessions[session.id];

                    return (
                      <div 
                        key={session.id} 
                        className={`p-8 rounded-[2.5rem] border transition-all duration-500 group flex flex-col justify-between ${
                          isToday 
                            ? 'bg-primary/5 border-primary/30 shadow-[0_0_40px_rgba(211,165,35,0.1)]' 
                            : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/20'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className={`font-heading text-2xl uppercase tracking-tight transition-colors ${
                                isToday ? 'text-white' : 'text-white/80 group-hover:text-white'
                              }`}>
                                {session.title}
                              </h4>
                              {isJoined && (
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-pulse" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[12px] font-black uppercase tracking-[0.2em] ${
                                isToday ? 'text-primary' : 'text-white/20'
                              }`}>
                                {sessionDayLabel} • {session.time}
                              </span>
                            </div>
                          </div>
                          <Link 
                            to="/classes"
                            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-primary hover:border-primary/50 transition-all shadow-xl"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

            </div>


            {/* RIGHT COLUMN: Profile & Badges */}
            <div className="lg:col-span-4 space-y-8">

              {/* ForgeWatch Sync Widget (Compact) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-primary" />
                    <span className="font-heading text-sm tracking-widest uppercase text-white">ForgeWatch</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-red-500 animate-ping' : 'bg-green-500'}`} />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-2xl font-heading text-white">{livePulse} <span className="text-[8px] text-white/30 uppercase">BPM</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-heading text-white">
                      {Math.floor(workoutTimer / 60)}:{(workoutTimer % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSyncToggle}
                  className={`w-full py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isSyncing ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-primary text-black hover:bg-white'
                    }`}
                >
                  {isSyncing ? 'End Workout' : 'Start Workout'}
                </button>
              </motion.div>


              {/* Profile Card & Badges Combined (RESTORED) */}
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl rounded-[3rem] p-10 text-center relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="relative z-10">
                  <h3 className="font-heading text-3xl text-white mb-1 uppercase tracking-tight">{user?.name || 'Athlete'}</h3>
                  <p className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-6">{user?.plan || 'Standard'} MEMBER</p>

                  {/* Streak Badge */}
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full mb-8">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-orange-500 text-[10px] font-bold tracking-[0.2em] uppercase">14 Day Streak!</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                      <div className="text-xl font-heading mb-1">75.4</div>
                      <div className="text-[8px] font-bold text-white/60 uppercase tracking-widest">Weight (kg)</div>
                    </div>
                    <div className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                      <div className="text-xl font-heading mb-1">12.2%</div>
                      <div className="text-[8px] font-bold text-white/60 uppercase tracking-widest">Body Fat</div>
                    </div>
                  </div>

                  {/* Detailed Badges Section */}
                  <div className="text-left border-t border-white/10 pt-8 mt-2">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-heading text-lg tracking-widest uppercase text-white">Earned Badges</h4>
                      <span className="text-[9px] font-bold text-primary uppercase tracking-widest">
                        {user?.stats?.badges?.length || 0} / {ALL_BADGES.length} Unlocked
                      </span>
                    </div>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {(() => {
                        const earnedBadges = user?.stats?.badges || [];

                        // Merge all badges, tagging them as active/locked
                        const displayBadges = ALL_BADGES.map(template => {
                          const earned = earnedBadges.find(eb => eb.title === template.title);
                          return {
                            ...template,
                            active: !!earned,
                            date: earned ? earned.date : 'Locked',
                            earnedAt: earned ? new Date(earned.date).getTime() : 0
                          };
                        });

                        // Sort: Earned first (newest first), then by required XP
                        const sortedBadges = displayBadges.sort((a, b) => {
                          if (a.active !== b.active) return b.active ? 1 : -1;
                          if (a.active) return b.earnedAt - a.earnedAt;
                          return a.requiredXP - b.requiredXP;
                        });

                        return sortedBadges.map((badge, i) => (
                          <motion.div
                            key={badge.id}
                            whileHover={badge.active ? { scale: 1.05, x: 5 } : {}}
                            whileTap={badge.active ? { scale: 0.95 } : {}}
                            onClick={() => badge.active && setSelectedBadge(badge)}
                            className={`flex items-center gap-4 p-4 rounded-[2rem] border transition-all cursor-pointer group ${badge.active ? 'bg-white/5 border-white/10 hover:border-primary/50 shadow-xl' : 'bg-white/[0.02] border-white/5 opacity-40 grayscale'}`}
                          >
                            <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg p-2 ${badge.active ? `bg-gradient-to-br ${badge.color}` : 'bg-white/5'}`}>
                              <img src={badge.img} alt={badge.title} className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                            </div>
                            <div className="flex-1">
                              <div className={`text-[12px] font-heading uppercase tracking-widest ${badge.active ? 'text-white' : 'text-white/40'}`}>{badge.title}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className={`text-[9px] font-bold uppercase tracking-[0.2em] ${badge.active ? 'text-primary' : 'text-white/20'}`}>{badge.desc}</div>
                                {!badge.active && (
                                  <div className="text-[7px] text-white/30 font-bold uppercase border border-white/10 px-1.5 py-0.5 rounded-full">
                                    {badge.requiredXP} XP
                                  </div>
                                )}
                              </div>
                            </div>
                            {badge.active && (
                              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                <ChevronRight className="w-4 h-4 text-white/40" />
                              </div>
                            )}
                          </motion.div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Global Leaderboard Widget */}
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl rounded-[3rem] p-8 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-heading text-xl tracking-widest uppercase text-white flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-primary" /> Leaderboard
                  </h3>
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Global Rank</span>
                </div>

                <div className="space-y-3">
                  {leaderboard.length > 0 ? leaderboard.map((entry, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${entry.isMe ? 'bg-primary/20 border-primary/40 shadow-[0_0_20px_rgba(211,165,35,0.1)]' : 'bg-white/5 border-white/5'}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-heading ${entry.rank === 1 ? 'text-primary' : 'text-white/40'}`}>#{entry.rank}</span>
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.name}`} alt={entry.name} />
                          </div>
                          {entry.rank === 1 && <div className="absolute -top-1 -right-1 text-[10px]">👑</div>}
                        </div>
                        <div>
                          <div className={`text-[11px] font-bold uppercase tracking-widest ${entry.isMe ? 'text-white' : 'text-white/80'}`}>{entry.name}</div>
                          <div className="text-[8px] font-bold text-primary uppercase tracking-[0.2em]">LVL {entry.level}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-heading text-white">{entry.xp}</div>
                        <div className="text-[7px] font-bold text-white/30 uppercase tracking-widest">XP</div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-4 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                      Loading rankings...
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Forge Interactive Calendar Modal */}
          <AnimatePresence>
            {isFullScheduleOpen && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8">
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsFullScheduleOpen(false)}
                  className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                />

                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 40 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="relative w-full max-w-[1600px] max-h-[92vh] overflow-y-auto bg-[#080808] border border-white/10 rounded-[4rem] p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.9)] scrollbar-hide"
                >
                  {/* Modal Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative">
                    <div className="z-10">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-heading text-3xl md:text-4xl tracking-tighter uppercase text-white">Forge Master Schedule</h3>
                      </div>
                      <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] ml-1">
                        Viewing {viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 z-10">
                      <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                        <button
                          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                          className="text-white/40 hover:text-primary transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="font-heading text-lg uppercase tracking-widest text-white px-4 min-w-[180px] text-center">
                          {viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}
                        </span>
                        <button
                          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                          className="text-white/40 hover:text-primary transition-colors"
                        >
                          <ChevronRightIcon className="w-5 h-5" />
                        </button>
                      </div>

                      <button
                        onClick={() => setIsFullScheduleOpen(false)}
                        className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 transition-all group"
                      >
                        <Plus className="w-7 h-7 rotate-45 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>

                    {/* Background Glow */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                  </div>

                  {/* Grid Layout */}
                  <div className="grid grid-cols-7 gap-4 md:gap-8 mt-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center py-8 text-[12px] font-black uppercase tracking-[0.5em] text-primary/80 border-b-2 border-primary/20 bg-primary/5 rounded-t-3xl mb-2">{day}</div>
                    ))}

                    {(() => {
                      const year = viewDate.getFullYear();
                      const month = viewDate.getMonth();
                      const daysInMonth = new Date(year, month + 1, 0).getDate();
                      const startDay = new Date(year, month, 1).getDay();
                      const totalSlots = 42;

                      return Array.from({ length: totalSlots }).map((_, i) => {
                        const dayNum = i - startDay + 1;
                        const sessionDate = new Date(year, month, dayNum);
                        const isToday = new Date().toDateString() === sessionDate.toDateString();
                        const isPast = sessionDate < new Date() && !isToday;

                        const isMay = month === 4;
                        const isApril = month === 3;
                        const classData = (isMay || isApril) ? UPCOMING_SESSIONS.find(s => s.day === (i % 7)) : null;
                        const isValidDay = dayNum > 0 && dayNum <= daysInMonth;

                        return (
                          <div
                            key={i}
                            className={`min-h-[180px] p-4 rounded-[3rem] border-2 transition-all duration-500 relative group ${isValidDay
                                ? 'bg-gradient-to-br from-white/[0.05] to-transparent border-white/5 hover:border-primary/40 hover:bg-white/[0.08] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                                : 'opacity-0 pointer-events-none'
                              } ${isToday ? 'border-primary bg-primary/10 shadow-[0_0_40px_rgba(211,165,35,0.2)] scale-[1.02] z-10' : ''} ${confirmingSessionId === (classData?.id) ? 'z-[100]' : ''
                              }`}
                          >
                            {isValidDay && (
                              <>
                                <div className="flex justify-between items-start mb-4">
                                  <span className={`text-xl font-heading leading-none ${isToday ? 'text-primary scale-125' : 'text-white/40 group-hover:text-white/80'} transition-all`}>
                                    {dayNum}
                                  </span>
                                  {isToday && (
                                    <div className="px-3 py-1 rounded-full bg-primary text-black text-[8px] font-black uppercase tracking-widest animate-pulse">Today</div>
                                  )}
                                </div>

                                {classData && (
                                  <div className="mt-4 space-y-4">
                                    <motion.div
                                      whileHover={!isPast ? { y: -5 } : {}}
                                      className={`p-4 rounded-[2rem] border transition-all shadow-xl backdrop-blur-md relative ${isPast
                                          ? 'bg-black/40 border-white/5 opacity-60'
                                          : 'bg-gradient-to-br from-white/10 to-white/5 border-white/10 group-hover:border-primary/50'
                                        }`}
                                    >
                                      {/* Mini Bell Icon (Top Right Corner) */}
                                      {reminders[classData.id] && (
                                        <div className="absolute top-4 right-4 w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_10px_rgba(211,165,35,0.3)] animate-bounce-slow">
                                          <BellRing className="w-3 h-3" />
                                        </div>
                                      )}

                                      <div className="text-[14px] font-heading text-white uppercase mb-2 leading-tight tracking-tight pr-8">{classData.title}</div>

                                      <div className="flex items-center gap-2 text-[11px] text-white/30 font-black uppercase mb-5 tracking-widest">
                                        <Clock className="w-3.5 h-3.5" /> {classData.time}
                                      </div>

                                      {isPast ? (
                                        <div className="flex items-center gap-3 py-2">
                                          {dayNum % 3 !== 0 ? (
                                            <div className="flex items-center gap-2 text-green-500 font-black text-[12px] uppercase tracking-tighter">
                                              <CheckCircle2 className="w-5 h-5" /> Attended
                                            </div>
                                          ) : (
                                            <div className="flex items-center gap-2 text-red-500/60 font-black text-[12px] uppercase tracking-tighter">
                                              <XCircle className="w-5 h-5" /> Missed
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="flex gap-3 w-full mt-6">
                                          <button 
                                            onClick={() => toggleJoin(classData.id)}
                                            className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg ${
                                              joinedSessions[classData.id] 
                                                ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                                                : 'bg-white/10 text-white/60 border border-white/10 hover:bg-primary hover:text-black hover:border-primary'
                                            }`}
                                          >
                                            {joinedSessions[classData.id] ? 'Joined' : 'Reserve Spot'}
                                          </button>
                                          
                                          {joinedSessions[classData.id] && (
                                            <button 
                                              onClick={() => toggleReminder(classData.id)}
                                              className={`w-12 flex items-center justify-center rounded-2xl transition-all shadow-lg ${
                                                reminders[classData.id] 
                                                  ? 'bg-primary text-black' 
                                                  : 'bg-white/10 text-white/40 border border-white/10 hover:bg-white/20 hover:text-white'
                                              }`}
                                            >
                                              <BellRing className="w-4 h-4" />
                                            </button>
                                          )}
                                        </div>
                                      )}
                                    </motion.div>
                                  </div>
                                )}

                                {/* Subtle background number */}
                                <div className="absolute bottom-6 right-8 text-8xl font-black text-white/[0.02] pointer-events-none group-hover:text-white/[0.06] transition-colors uppercase italic tracking-tighter leading-none">
                                  {dayNum}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* FLOATING ACTION BAR (Gen-Z Mobile App Feel) */}
          <motion.div
            initial={{ y: 100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-3xl border border-white/10 p-2 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 flex lg:hidden items-center gap-2"
          >
            <button className="flex flex-col items-center justify-center w-16 h-16 rounded-full hover:bg-white/10 transition-all group">
              <QrCode className="w-6 h-6 text-white/70 group-hover:text-white transition-colors mb-1" />
              <span className="text-[7px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white">Scan</span>
            </button>
            <button className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-amber-200 text-black shadow-[0_0_20px_rgba(211,165,35,0.4)] hover:scale-105 transition-all transform -translate-y-4">
              <Plus className="w-8 h-8 mb-0.5" />
              <span className="text-[8px] font-bold uppercase tracking-widest">Log</span>
            </button>
            <button className="flex flex-col items-center justify-center w-16 h-16 rounded-full hover:bg-white/10 transition-all group">
              <Users className="w-6 h-6 text-white/70 group-hover:text-white transition-colors mb-1" />
              <span className="text-[7px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white">Social</span>
            </button>
          </motion.div>

          {/* BADGE DETAIL MODAL */}
          <AnimatePresence>
            {selectedBadge && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setSelectedBadge(null)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-2 ${selectedBadge.active ? 'bg-primary' : 'bg-white/10'}`} />

                  <div className="flex flex-col items-center text-center">
                    <div className={`w-24 h-24 rounded-3xl mb-8 flex items-center justify-center p-4 transform rotate-12 ${selectedBadge.active ? 'bg-primary/20 shadow-[0_0_30px_rgba(211,165,35,0.3)] border border-primary/30' : 'bg-white/5 border border-white/10 opacity-40 grayscale'}`}>
                      <img src={selectedBadge.img} alt={selectedBadge.title} className="w-full h-full object-contain -rotate-12 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                    </div>

                    <div className="space-y-2 mb-8">
                      <div className="flex items-center justify-center gap-2">
                        <span className={`text-[9px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full border ${selectedBadge.rarity === 'Legendary' ? 'border-purple-500/50 text-purple-500 bg-purple-500/10' : selectedBadge.rarity === 'Epic' ? 'border-primary/50 text-primary bg-primary/10' : 'border-white/20 text-white/40 bg-white/5'}`}>
                          {selectedBadge.rarity} Achievement
                        </span>
                      </div>
                      <h2 className="font-heading text-4xl uppercase tracking-tight text-white">{selectedBadge.title}</h2>
                      <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">{selectedBadge.desc}</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 w-full">
                      <p className="text-white/70 text-xs leading-relaxed font-light italic">
                        "{selectedBadge.longDesc}"
                      </p>
                    </div>

                    <div className="flex justify-between items-center w-full border-t border-white/10 pt-8">
                      <div className="text-left">
                        <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-1">Earned On</div>
                        <div className="text-sm font-heading text-white">{selectedBadge.date}</div>
                      </div>
                      <button
                        onClick={() => setSelectedBadge(null)}
                        className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-primary transition-all active:scale-95"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
