import React from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const plans = [
    {
      name: "STARTER",
      price: "$29",
      period: "/month",
      features: [
        "Personalized Workout Plans",
        "Full Gym Access (Peak)",
        "Water & Towel Service",
        "Locker Room Access"
      ],
      isPopular: false
    },
    {
      name: "ELITE",
      price: "$49",
      period: "/month",
      features: [
        "24/7 Premium Access",
        "Unlimited Group Classes",
        "Monthly 1-on-1 Training",
        "Cryotherapy & Recovery",
        "Nutrition Consultation"
      ],
      isPopular: true
    },
    {
      name: "PREMIUM",
      price: "$89",
      period: "/month",
      features: [
        "Everything in Elite",
        "Private VIP Lounge",
        "Weekly PT Sessions",
        "Free Guest Pass Always",
        "Custom Performance Kit"
      ],
      isPopular: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section id="pricing" className="py-24 md:py-32 bg-dark w-full relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
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
              <span className="text-primary font-bold tracking-[0.3em] text-[11px] uppercase">Flexible Membership</span>
            </div>
            <h2 className="text-light text-5xl md:text-7xl lg:text-8xl font-heading uppercase leading-none">
              CHOOSE YOUR <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-primary)' }}>LEGACY</span>
            </h2>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              variants={itemVariants}
              className={`relative group bg-zinc-900/40 border border-white/5 p-10 backdrop-blur-md transition-all duration-500 hover:border-primary/30 flex flex-col justify-between h-full ${plan.isPopular ? 'border-primary/20 shadow-2xl shadow-primary/5 scale-105 z-10' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black font-bold text-[10px] tracking-widest uppercase px-6 py-2 rounded-sm shadow-xl shadow-primary/20">
                  Most Popular
                </div>
              )}
              
              <div>
                <div className="mb-10 flex justify-between items-start">
                  <div>
                    <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase block mb-3">{plan.name}</span>
                    <div className="flex items-baseline">
                      <span className="text-light text-6xl font-heading tracking-tighter">{plan.price}</span>
                      <span className="text-white/40 text-sm ml-2 font-light uppercase tracking-widest">{plan.period}</span>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-5 mb-12">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/70 group-hover:text-white/100 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></div>
                      <span className="text-[15px] font-light tracking-wide">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                className={`w-full py-5 px-6 font-bold tracking-[0.2em] text-[11px] uppercase transition-all duration-500 rounded-sm border ${plan.isPopular 
                  ? 'bg-primary text-black border-primary hover:bg-light hover:border-light hover:text-black' 
                  : 'bg-transparent text-white border-white/20 hover:bg-white hover:text-black hover:border-white'}`}
              >
                START YOUR STORY
              </button>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Pricing;
