import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Dumbbell, TrendingUp, Settings, Calendar, Zap } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Classes', path: '/classes', icon: Calendar },
    { name: 'Workouts', path: '/workouts', icon: Dumbbell },
    { name: 'Progress', path: '/progress', icon: TrendingUp },
    { name: 'Knowledge', path: '/knowledge', icon: Zap },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 pt-28 pb-8 px-6 bg-[#050505]/80 backdrop-blur-2xl border-r border-white/5 z-40 shadow-2xl">
      
      <div className="flex-1 mt-8 space-y-2">
        <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</h4>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl border transition-all duration-300 group ${
                isActive 
                  ? 'bg-[#d3a523]/10 border-[#d3a523]/20 text-white shadow-[0_0_20px_rgba(211,165,35,0.05)]' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white border-transparent'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'text-white/40'}`} />
              <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-primary' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-5 rounded-3xl mt-auto relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 blur-2xl rounded-full" />
        <div className="flex justify-between items-end mb-3">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Current Level</div>
            <div className="text-xl font-heading text-primary leading-none">LVL {user?.stats?.level || 1}</div>
          </div>
          <div className="text-[9px] font-bold text-white/60 bg-white/5 px-2 py-1 rounded-md border border-white/5 uppercase tracking-widest">
            {user?.stats?.points || 0} XP
          </div>
        </div>
        <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 p-[1px]">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(user?.stats?.points % 100) || 0}%` }}
            className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full shadow-[0_0_10px_rgba(211,165,35,0.4)]"
          />
        </div>
        <div className="text-[8px] font-bold text-center text-white/20 uppercase tracking-[0.3em] mt-3">
          Forge Your Legacy
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
