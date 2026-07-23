import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { User, Mail, Lock, CreditCard, CheckCircle2 } from 'lucide-react';

const PLANS = [
  { id: 'Basic', price: '29', features: ['Gym Access', 'Standard Locker', '1 Trainer Session'] },
  { id: 'Pro', price: '49', features: ['24/7 Access', 'Private Locker', 'Personal Trainer', 'Diet Plan'] },
  { id: 'Elite', price: '79', features: ['All Pro Features', 'Massage & Spa', 'Guest Passes', 'Priority Support'] },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    plan: 'Pro'
  });
  const [error, setError] = useState('');
  const { register, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill all fields');
      return;
    }

    try {
      await register(formData);
      // If registration is successful, navigation will happen via AuthContext state change 
      // or we can manually navigate here.
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-5xl md:text-6xl text-white mb-4 uppercase tracking-tighter">
              JOIN THE <span className="text-primary">FORGE</span>
            </h1>
            <p className="text-white/40 max-w-lg mx-auto text-sm tracking-widest uppercase">
              Start your transformation journey today with elite training and nutrition.
            </p>
          </motion.div>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold tracking-widest text-center uppercase overflow-hidden"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Steps Indicator */}
            <div className="md:col-span-1 space-y-4">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    step >= s ? 'bg-primary border-primary text-black font-bold' : 'border-white/10 text-white/20'
                  }`}>
                    {s}
                  </div>
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${step >= s ? 'text-white' : 'text-white/20'}`}>
                    {s === 1 ? 'Details' : 'Plan'}
                  </span>
                </div>
              ))}
            </div>

            {/* Form Area */}
            <div className="md:col-span-4">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.form 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl space-y-6"
                    onSubmit={(e) => { e.preventDefault(); setStep(2); }}
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 ml-1">Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                          <input 
                            type="text" 
                            placeholder="Enter your name"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-sm"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 ml-1">Email Address</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                          <input 
                            type="email" 
                            placeholder="your@email.com"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-sm"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 ml-1">Password</label>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                          <input 
                            type="password" 
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-sm"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-primary text-black font-bold py-4 rounded-2xl tracking-widest uppercase text-xs hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(211,165,35,0.3)] hover:shadow-none"
                    >
                      Next Step
                    </button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                      <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-[#050505] px-4 text-white/20 font-bold">Or</span></div>
                    </div>

                    <button 
                      type="button"
                      onClick={() => { loginAsGuest(); navigate('/dashboard'); }}
                      className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 rounded-2xl tracking-widest uppercase text-xs hover:bg-white/10 transition-all"
                    >
                      Continue as Guest
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-3 gap-4">
                      {PLANS.map((p) => (
                        <div 
                          key={p.id}
                          onClick={() => setFormData({...formData, plan: p.id})}
                          className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                            formData.plan === p.id 
                            ? 'bg-primary border-primary text-black' 
                            : 'bg-white/5 border-white/10 text-white hover:border-white/30'
                          }`}
                        >
                          <div className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${formData.plan === p.id ? 'text-black/60' : 'text-white/40'}`}>
                            {p.id}
                          </div>
                          <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-3xl font-heading tracking-tighter">${p.price}</span>
                            <span className={`text-xs ${formData.plan === p.id ? 'text-black/60' : 'text-white/40'}`}>/mo</span>
                          </div>
                          <div className="space-y-2">
                            {p.features.slice(0, 3).map((f) => (
                              <div key={f} className="flex items-center gap-2">
                                <CheckCircle2 className={`w-3 h-3 ${formData.plan === p.id ? 'text-black' : 'text-primary'}`} />
                                <span className="text-[10px] font-medium opacity-80">{f}</span>
                              </div>
                            ))}
                          </div>
                          {formData.plan === p.id && (
                            <motion.div layoutId="activePlan" className="absolute top-4 right-4 w-2 h-2 bg-black rounded-full" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase text-white/40">
                        <span>Total to pay</span>
                        <span className="text-white text-lg font-heading">${PLANS.find(p => p.id === formData.plan).price}.00</span>
                      </div>
                      <button 
                        onClick={handleRegister}
                        className="w-full bg-primary text-black font-bold py-4 rounded-2xl tracking-widest uppercase text-xs hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(211,165,35,0.3)] hover:shadow-none flex items-center justify-center gap-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        Complete Registration
                      </button>
                      <button 
                        onClick={() => setStep(1)}
                        className="w-full bg-transparent text-white/40 font-bold py-2 rounded-2xl tracking-widest uppercase text-[10px] hover:text-white transition-all"
                      >
                        Back to details
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
