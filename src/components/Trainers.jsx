import React from 'react';
import { motion } from 'framer-motion';

const Trainers = () => {
  const trainers = [
    {
      name: "LAHIRU MADUSHAN",
      role: "HEAD COACH",
      specialty: "Crossfit & Strength",
      image: "/img/trainer1.jpg",
      position: "object-center"
    },
    {
      name: "NADEESHA SILVA",
      role: "SENIOR TRAINER",
      specialty: "HIIT & Flexibility",
      image: "/img/trainer2.jpg",
      position: "object-top"
    },
    {
      name: "KAMAL PERERA",
      role: "NUTRITIONIST",
      specialty: "Bodybuilding & Diet",
      image: "/img/gym man.png",
      position: "object-center"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="trainers" className="py-24 md:py-32 bg-dark/95 w-full relative overflow-hidden">
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
              <span className="text-primary font-bold tracking-[0.3em] text-[11px] uppercase">Elite Coaching</span>
            </div>
            <h2 className="text-light text-5xl md:text-7xl lg:text-8xl font-heading uppercase leading-none">
              BEYOND <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-primary)' }}>EXPERTISE</span>
            </h2>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {trainers.map((trainer, index) => (
            <motion.div 
              key={trainer.name}
              variants={itemVariants}
              className="group relative h-[450px] lg:h-[500px] overflow-hidden bg-zinc-900 border border-white/5"
            >
              {/* Image with Grayscale to Color Transition */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className={`w-full h-full object-cover ${trainer.position || 'object-center'} grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100`}
                />
              </div>

              {/* Dynamic Overlays */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute inset-0 border-[0px] border-primary/40 group-hover:border-[8px] transition-all duration-500 pointer-events-none"></div>

              {/* Info Container */}
              <div className="absolute bottom-0 left-0 w-full p-10 translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div className="w-6 h-[1px] bg-primary"></div>
                  <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">{trainer.role}</span>
                </div>
                
                <h3 className="text-light text-4xl lg:text-5xl font-heading uppercase tracking-wider mb-4 group-hover:text-primary transition-colors duration-500">
                  {trainer.name}
                </h3>
                
                <p className="text-white/50 text-sm font-light tracking-wide mb-8 max-w-[280px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  {trainer.specialty}. Dedicated to pushing your limits beyond the expected.
                </p>

                {/* Social Links with Hover Logic */}
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                  {[
                    { id: 'FB', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg>},
                    { id: 'TW', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>},
                    { id: 'IG', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>}
                  ].map((social) => (
                    <div 
                      key={social.id}
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-black transition-all cursor-pointer"
                    >
                      {social.icon}
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-700 delay-100"></div>
                <div className="absolute top-0 right-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-700 delay-100"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Trainers;
