import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const Hero = () => {
  const [trafficCount] = React.useState(() => {
    const saved = localStorage.getItem('forgex_live_traffic');
    return saved ? parseInt(saved) : 15;
  });

  const getStatusColor = (n) => {
    if (n <= 10) return 'text-green-500 bg-green-500/10 border-green-500/20';
    if (n <= 25) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    return 'text-red-500 bg-red-500/10 border-red-500/20';
  };

  const statusStyle = getStatusColor(trafficCount);

  return (
    <div className="relative h-screen w-full flex items-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/img/background.png" 
          alt="Premium Fitness Gym" 
          className="w-full h-full object-cover object-[center_15%]"
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.40) 50%, rgba(10,10,10,0.1) 100%)' }}
        ></div>
      </div>
      
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-10 lg:px-16 w-full pt-32 pb-20 md:pt-20 md:pb-0">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap items-center gap-4 mb-6 md:mb-8"
          >
            <div className="w-8 md:w-12 h-[2px] bg-primary"></div>
            <span className="text-primary font-bold tracking-[0.3em] text-[10px] md:text-[11px] uppercase">Elite Fitness Club</span>
            
            {/* Live Traffic Badge */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusStyle} backdrop-blur-md animate-pulse`}>
              <Users className="w-3 h-3" />
              <span className="text-[9px] font-bold tracking-widest uppercase">Live: {trafficCount} People Training</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading leading-[0.9] mb-8 md:mb-10 uppercase tracking-tighter"
          >
            FORGE <br/>
            <span className="text-primary">YOUR</span> <br/>
            <span 
              className="text-transparent" 
              style={{ WebkitTextStroke: '1.5px white' }}
            >
              BEST SELF.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/70 text-sm md:text-lg mb-10 md:mb-14 max-w-lg leading-relaxed font-light"
          >
            State-of-the-art equipment. Expert trainers. Real results. <br className="hidden sm:block" />
            Your transformation starts the moment you walk through <br className="hidden sm:block" />
            our doors.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="bg-primary text-black hover:bg-white hover:scale-105 hover:shadow-[0_0_25px_rgba(211,165,35,0.4)] transition-all duration-500 px-10 py-4 text-xs md:text-sm font-bold tracking-[0.2em] rounded-sm uppercase">
              JOIN NOW
            </button>
            <button className="bg-transparent text-white border border-white/20 hover:bg-white hover:text-black hover:border-white hover:scale-105 transition-all duration-500 px-10 py-4 text-xs md:text-sm font-bold tracking-[0.2em] rounded-sm uppercase">
              VIEW PLANS
            </button>
          </motion.div>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;
