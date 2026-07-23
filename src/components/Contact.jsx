import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

const ContactItem = ({ icon, label, value }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-start gap-5 mb-8 group"
    >
      <div className="w-12 h-12 border border-black/10 dark:border-white/10 flex items-center justify-center p-3 group-hover:border-primary transition-colors duration-500 bg-black/5 dark:bg-white/5">
        {icon}
      </div>
      <div>
        <p className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-1">{label}</p>
        <p className="text-light/70 text-[13px] md:text-[14px] leading-relaxed font-light">{value}</p>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      interest: '',
      message: ''
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    console.log("Form Data:", data);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  return (
    <section id="contact" className="py-24 md:py-40 bg-dark w-full overflow-hidden relative border-t border-black/5 dark:border-white/5">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10 lg:px-16 w-full relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-32">
          
          {/* Left Side: Info */}
          <div className="w-full lg:w-[40%]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-[0.3em] text-[11px] uppercase">Get In Touch</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-light text-6xl md:text-[90px] font-heading mb-8 uppercase leading-[0.85] tracking-tight"
            >
              READY TO <span className="text-primary">START?</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-light/50 text-[15px] md:text-[16px] leading-relaxed font-light mb-16 max-w-md"
            >
              We'd love to hear from you. Whether you're ready to join or just have questions — our team is here to help.
            </motion.p>
            
            <div className="space-y-2">
              <ContactItem 
                label="LOCATION"
                value="No.42/A, Kirillawala, Kadawatha."
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 21s-7-7.5-7-11.5a7 7 0 1114 0c0 4-7 11.5-7 11.5z" strokeLinecap="round" strokeJoin="round" />
                    <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeJoin="round" />
                  </svg>
                }
              />
              <ContactItem 
                label="CALL US"
                value="077 1234 345"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeJoin="round" />
                  </svg>
                }
              />
              <ContactItem 
                label="EMAIL"
                value="forgexfitness@gmail.com"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeJoin="round" />
                    <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeJoin="round" />
                  </svg>
                }
              />
              <ContactItem 
                label="HOURS"
                value="Mon–Fri: 5AM–11PM | Sat–Sun: 6AM–10PM"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeJoin="round" />
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeJoin="round" />
                  </svg>
                }
              />
            </div>
          </div>
          
          {/* Right Side: Form */}
          <div className="w-full lg:w-[60%] relative">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-16 md:p-24 text-center flex flex-col items-center justify-center min-h-[500px]"
                >
                  <div className="relative mb-10">
                    <div className="w-20 h-20 border border-primary/30 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-primary" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeJoin="round" />
                      </svg>
                    </div>
                    <div className="absolute -inset-2 border border-primary/10 rounded-full animate-ping-slow"></div>
                  </div>

                  <div className="max-w-sm space-y-6">
                    <h3 className="text-light text-4xl md:text-5xl font-heading uppercase tracking-[0.1em] leading-tight">
                      MESSAGE <span className="text-primary">RECEIVED</span>
                    </h3>
                    <div className="w-12 h-[1px] bg-primary/40 mx-auto"></div>
                    <p className="text-light/50 text-sm md:text-base font-light leading-relaxed">
                      Thank you for choosing ForgeX. Our elite team of advisors will review your request and get back to you within one business day.
                    </p>
                  </div>

                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-14 group flex items-center gap-3 text-light/40 hover:text-primary transition-all duration-500"
                  >
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Send Another Inquiry</span>
                    <div className="w-8 h-[1px] bg-light/20 group-hover:bg-primary group-hover:w-12 transition-all duration-500"></div>
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  onSubmit={handleSubmit(onSubmit)} 
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Full Name *</label>
                      {errors.name && <span className="text-red-500 text-[9px] uppercase tracking-wider">{errors.name.message}</span>}
                    </div>
                    <input 
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Kasun Wijethunga"
                      className={`w-full bg-black/5 dark:bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-black/10 dark:border-white/10'} px-6 py-4 text-light placeholder:text-light/20 focus:outline-none focus:border-primary transition-all rounded-sm`}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Email Address *</label>
                        {errors.email && <span className="text-red-500 text-[9px] uppercase tracking-wider">{errors.email.message}</span>}
                      </div>
                      <input 
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Email is invalid'
                          }
                        })}
                        type="email" 
                        placeholder="kasunwije@gmail.com"
                        className={`w-full bg-black/5 dark:bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-black/10 dark:border-white/10'} px-6 py-4 text-light placeholder:text-light/20 focus:outline-none focus:border-primary transition-all rounded-sm`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Phone Number</label>
                      <input 
                        {...register('phone')}
                        type="tel" 
                        placeholder="071 405 4057"
                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-6 py-4 text-light placeholder:text-light/20 focus:outline-none focus:border-primary transition-colors rounded-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">I'm Interested In</label>
                    <div className="relative">
                      <select 
                        {...register('interest')}
                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-6 py-4 text-light focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer rounded-sm"
                      >
                        <option value="" className="bg-dark">Select a fitness program...</option>
                        <option value="strength" className="bg-dark">Strength Training</option>
                        <option value="combat" className="bg-dark">Combat Fitness</option>
                        <option value="hiit" className="bg-dark">HIIT & Cardio</option>
                        <option value="personal" className="bg-dark">Personal Training</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeJoin="round"/></svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Your Message *</label>
                      {errors.message && <span className="text-red-500 text-[9px] uppercase tracking-wider">{errors.message.message}</span>}
                    </div>
                    <textarea 
                      {...register('message', { required: 'Message is required' })}
                      rows="5"
                      placeholder="Tell us about your fitness issues and goals..."
                      className={`w-full bg-black/5 dark:bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-black/10 dark:border-white/10'} px-6 py-4 text-light placeholder:text-light/20 focus:outline-none focus:border-primary transition-all resize-none rounded-sm`}
                    ></textarea>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${isSubmitting ? 'bg-black/10 dark:bg-white/10 text-light/30 cursor-not-allowed' : 'bg-primary hover:bg-light hover:text-dark'} transition-all duration-500 py-6 font-bold tracking-[0.3em] rounded-sm flex items-center justify-center gap-4 text-[13px] uppercase shadow-2xl shadow-primary/20 group`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        SENDING...
                      </div>
                    ) : (
                      <>
                        Send Message
                        <span className="text-xl transition-transform duration-500 group-hover:translate-x-2">→</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
