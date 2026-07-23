import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: "DASUN SHANAKA",
      role: "ATHLETE",
      text: "THE ATMOSPHERE AT FORGEX IS UNMATCHED. THE ELITE COACHING AND STATE-OF-THE-ART EQUIPMENT HELPED ME REACH MY PEAK PERFORMANCE IN RECORD TIME.",
      rating: 5
    },
    {
      name: "SHENALI PERERA",
      role: "FITNESS ENTHUSIAST",
      text: "I'VE TRIED MANY GYMS, BUT FORGEX IS DIFFERENT. THE COMMUNITY AND THE PERSONALIZED ATTENTION FROM TRAINERS MAKE EVERY SESSION PRODUCTIVE.",
      rating: 5
    },
    {
      name: "KAVINDU DE SILVA",
      role: "BODYBUILDER",
      text: "THE RECOVERY ZONE AND NUTRITION CONSULTATION ARE GAME CHANGERS. FORGEX PROVIDES A COMPLETE ECOSYSTEM FOR ANYONE SERIOUS ABOUT THEIR BODY.",
      rating: 5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-dark w-full relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-[1800px] mx-auto px-4 md:px-10 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-[0.3em] text-[11px] uppercase">Success Stories</span>
            </div>
            <h2 className="text-light text-5xl md:text-7xl lg:text-8xl font-heading uppercase leading-none">
              REAL <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-primary)' }}>VOICES</span>
            </h2>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((item, index) => (
            <motion.div 
              key={item.name}
              variants={itemVariants}
              className="group relative bg-zinc-900/50 border border-white/5 p-12 backdrop-blur-sm hover:border-primary/20 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Quote Icon */}
              <div className="text-primary/20 text-6xl font-serif absolute top-8 right-12 group-hover:text-primary/40 transition-colors duration-500">
                &ldquo;
              </div>

              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-8">
                  {[...Array(item.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-white/80 text-lg leading-relaxed font-light tracking-wide mb-12 italic group-hover:text-white transition-colors duration-500 uppercase">
                  {item.text}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-[1px] bg-primary"></div>
                  <div>
                    <h4 className="text-light font-bold tracking-[0.2em] text-[13px] uppercase">{item.name}</h4>
                    <p className="text-primary text-[10px] font-bold tracking-[0.1em] uppercase">{item.role}</p>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-primary/0 group-hover:bg-primary transition-all duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
