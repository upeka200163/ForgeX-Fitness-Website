import React from 'react';
import { motion } from 'framer-motion';
import { Users, Info } from 'lucide-react';

const TrafficTracker = ({ count }) => {
  const getStatus = (n) => {
    if (n <= 10) return { label: 'Less Crowded', color: 'bg-green-500', text: 'text-green-500', bg: 'bg-green-500/10' };
    if (n <= 25) return { label: 'Moderately Busy', color: 'bg-yellow-500', text: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    return { label: 'Very Busy', color: 'bg-red-500', text: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const status = getStatus(count);

  return (
    <div className="bg-white/10 border border-white/20 rounded-[2.5rem] p-8 relative overflow-hidden h-full flex flex-col justify-between backdrop-blur-2xl shadow-2xl">
      <div>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="font-heading text-xl text-white tracking-[0.1em] uppercase flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" /> Live Traffic
            </h3>
            <p className="text-white/70 text-[9px] font-bold tracking-[0.2em] uppercase mt-2">Real-time gym occupancy</p>
          </div>
          <div className={`px-4 py-1.5 rounded-full ${status.bg.replace('/10', '/20')} border ${status.color.replace('bg-', 'border-')}/30 flex items-center gap-2.5 backdrop-blur-md`}>
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className={`w-2 h-2 rounded-full ${status.color}`}
            />
            <span className={`text-[9px] font-bold tracking-[0.2em] uppercase text-white`}>{status.label}</span>
          </div>
        </div>

        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-7xl font-heading text-white leading-none">{count}</span>
          <div className="flex flex-col">
            <span className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase leading-none">Members</span>
            <span className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">Training</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <div className="flex -space-x-3">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" className="w-10 h-10 rounded-full border-2 border-[#111] bg-white/10" alt="Friend" />
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" className="w-10 h-10 rounded-full border-2 border-[#111] bg-white/10" alt="Friend" />
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" className="w-10 h-10 rounded-full border-2 border-[#111] bg-white/10" alt="Friend" />
        </div>
        <div className="text-xs text-white/70 font-light leading-tight">
          <span className="font-bold text-white">Kasun</span> & 2 friends are lifting right now.
        </div>
      </div>
    </div>
  );
};

export default TrafficTracker;
