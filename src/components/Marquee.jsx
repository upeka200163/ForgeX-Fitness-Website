import React from 'react';
import { motion } from 'framer-motion';

const Marquee = () => {
  const items = [
    "PERSONAL TRAINING",
    "BOXING & MMA",
    "NUTRITION COACHING",
    "RECOVERY STUDIO",
    "STRENGTH TRAINING",
    "HIIT CLASSES",
    "OPEN 24/7"
  ];

  const content = items.map((item, index) => (
    <div key={index} className="flex items-center">
      <span className="text-black text-sm md:text-base font-heading tracking-[0.2em] px-6 md:px-10">
        {item}
      </span>
      <span className="text-black text-[8px] md:text-[10px] opacity-40">♦</span>
    </div>
  ));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full bg-primary py-3 overflow-hidden border-b border-black/10 flex flex-nowrap shrink-0 z-20 relative"
    >
      <div className="flex whitespace-nowrap animate-marquee shrink-0">
        {content}
      </div>
      <div className="flex whitespace-nowrap animate-marquee shrink-0" aria-hidden="true">
        {content}
      </div>
      <div className="flex whitespace-nowrap animate-marquee shrink-0" aria-hidden="true">
        {content}
      </div>
    </motion.div>
  );
};

export default Marquee;
