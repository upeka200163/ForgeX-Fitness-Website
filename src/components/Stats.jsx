import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { number: "500+", label: "ACTIVE MEMBERS" },
    { number: "10", label: "EXPERT TRAINERS" },
    { number: "3", label: "LOCATIONS" },
    { number: "98%", label: "SUCCESS RATE" },
    { number: "24/7", label: "ALWAYS OPEN" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full bg-black/40 border-b border-white/5 py-4 md:py-6 lg:py-8 flex justify-center backdrop-blur-md relative z-20">
      <div className="w-full max-w-[1600px] px-4 md:px-10 lg:px-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-y-12 gap-x-6 md:gap-x-12 lg:gap-0"
        >
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center justify-center min-w-[140px] md:min-w-0"
              >
                <span className="text-primary text-3xl md:text-4xl lg:text-5xl font-heading tracking-tighter mb-1 select-none">
                  {stat.number}
                </span>
                <span className="text-white/40 text-[8px] md:text-[9px] lg:text-[10px] font-bold tracking-[0.3em] uppercase text-center mt-1">
                  {stat.label}
                </span>
              </motion.div>
              {(index < stats.length - 1) && (
                <div className="hidden lg:block w-[1px] h-10 bg-white/5 self-center mx-4"></div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;
