import React from 'react';
import { motion } from 'framer-motion';
import { 
  Apple, Beef, Fish, Droplets, Moon, Zap, 
  Dumbbell, ShieldAlert, CheckCircle2, XCircle,
  Lightbulb, Info, ArrowRight, TrendingUp, Flame
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const KNOWLEDGE_CATEGORIES = [
  { 
    id: 'nutrition', 
    name: 'Nutrition', 
    icon: Apple, 
    color: 'text-green-400',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200'
  },
  { 
    id: 'training', 
    name: 'Training', 
    icon: Dumbbell, 
    color: 'text-primary',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200'
  },
  { 
    id: 'recovery', 
    name: 'Recovery', 
    icon: Moon, 
    color: 'text-blue-400',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200'
  },
  { 
    id: 'lifestyle', 
    name: 'Lifestyle', 
    icon: Zap, 
    color: 'text-amber-400',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200'
  },
];

const NUTRITION_DOS = [
  { name: 'Lean Protein', desc: 'Chicken breast, turkey, egg whites, fish.', icon: Beef },
  { name: 'Complex Carbs', desc: 'Oats, brown rice, sweet potatoes, quinoa.', icon: Zap },
  { name: 'Healthy Fats', desc: 'Avocados, nuts, seeds, olive oil.', icon: Droplets },
  { name: 'Hydration', desc: 'At least 3-4L of water daily for recovery.', icon: Droplets },
];

const NUTRITION_DONTS = [
  { name: 'Liquid Sugar', desc: 'Sodas, energy drinks, and fruit juices.', icon: XCircle },
  { name: 'Processed Snacks', desc: 'Trans-fat heavy chips, cookies, and candy.', icon: ShieldAlert },
  { name: 'Excessive Alcohol', desc: 'Dehydrates muscles and halts protein synthesis.', icon: ShieldAlert },
  { name: 'Missed Meals', desc: 'Consistency is key for metabolism and growth.', icon: XCircle },
];

const PRO_TIPS = [
  { title: 'Form Over Weight', text: 'Never sacrifice technique for heavy lifting. It leads to injury and poor muscle engagement.', icon: ShieldAlert },
  { title: 'Progressive Overload', text: 'Increase weight, reps, or sets every week to keep challenging your muscles.', icon: TrendingUp },
  { title: 'Sleep is Growth', text: 'Muscles grow while you sleep, not in the gym. Aim for 7-9 hours of quality rest.', icon: Moon },
  { title: 'Warm-up First', text: 'A 5-10 min dynamic warm-up prevents tears and improves performance.', icon: Flame },
];

const SectionHeader = ({ title, subtitle, icon: Icon }) => (
  <div className="flex flex-col mb-10">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h2 className="font-heading text-3xl uppercase tracking-tight text-white">{title}</h2>
    </div>
    <p className="text-white/40 text-sm tracking-widest uppercase font-bold ml-13">{subtitle}</p>
  </div>
);

export default function FitnessKnowledge() {
  const [activeCategory, setActiveCategory] = React.useState('nutrition');

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-black pb-32">
      <Navbar />
      <Sidebar />

      <div className="pt-28 md:pt-36 px-4 md:px-8 lg:ml-64 lg:px-12 xl:px-20">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Header */}
          <div className="flex flex-col gap-4 mb-16 border-b border-white/10 pb-12">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/50">Elite Fitness Intelligence</span>
              </div>
              <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-white uppercase tracking-tighter leading-none mb-6">
                PRO <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200">KNOWLEDGE</span>
              </h1>
              <p className="text-white/60 max-w-2xl text-lg font-light leading-relaxed">
                Unlock the science behind the strength. Your transformation is 30% training and 70% what you do outside the forge.
              </p>
            </motion.div>
          </div>

          {/* Auto-Sliding Hero Slideshow */}
          <div className="relative w-full h-[450px] md:h-[550px] rounded-[3rem] overflow-hidden mb-16 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5">
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: '.custom-pagination' }}
              onSlideChange={(swiper) => setActiveCategory(KNOWLEDGE_CATEGORIES[swiper.realIndex].id)}
              className="w-full h-full"
            >
              {KNOWLEDGE_CATEGORIES.map((cat) => (
                <SwiperSlide key={cat.id}>
                  <div className="relative w-full h-full group">
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-12 left-12 right-12 z-10">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-2xl bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30`}>
                            <cat.icon className="w-6 h-6 text-primary" />
                          </div>
                          <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">Forge Intelligence</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-heading text-white uppercase tracking-tighter leading-none mb-4">
                          {cat.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200">MASTERY</span>
                        </h2>
                        <p className="text-white/60 max-w-xl text-sm md:text-base font-light leading-relaxed mb-6">
                          Expert protocols designed to maximize your {cat.id} performance and biological potential.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Pagination Style */}
            <div className="custom-pagination absolute bottom-8 right-12 z-20 flex gap-2" />
            <style jsx global>{`
              .custom-pagination .swiper-pagination-bullet {
                width: 30px;
                height: 3px;
                border-radius: 0;
                background: white;
                opacity: 0.2;
                transition: all 0.5s ease;
              }
              .custom-pagination .swiper-pagination-bullet-active {
                opacity: 1;
                background: #d3a523;
                width: 50px;
              }
            `}</style>
          </div>

          {/* Category Tabs (Sync with Swiper) */}
          <div className="flex overflow-x-auto gap-4 mb-16 pb-4 scrollbar-hide">
            {KNOWLEDGE_CATEGORIES.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  // Find the swiper instance and slide to it if needed
                  const swiper = document.querySelector('.swiper').swiper;
                  swiper.slideTo(idx);
                }}
                className={`flex items-center gap-4 px-8 py-5 rounded-[2rem] border transition-all duration-500 whitespace-nowrap ${
                  activeCategory === cat.id 
                    ? 'bg-primary/10 border-primary/30 text-white shadow-[0_0_40px_rgba(211,165,35,0.1)] scale-105' 
                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white'
                }`}
              >
                <cat.icon className={`w-6 h-6 ${activeCategory === cat.id ? 'text-primary' : ''}`} />
                <span className="text-sm font-bold uppercase tracking-widest">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* CONTENT SECTIONS */}
          <div className="space-y-24">
            
            {/* NUTRITION SECTION */}
            {(activeCategory === 'nutrition' || activeCategory === 'all') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                <SectionHeader title="Fuel Your Forge" subtitle="The Nutrition Protocol" icon={Apple} />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* WHAT TO EAT */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-green-400 bg-green-400/5 border border-green-400/10 px-6 py-4 rounded-2xl w-fit">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-bold uppercase tracking-widest">Consume Regularly</span>
                    </div>
                    <div className="grid gap-4">
                      {NUTRITION_DOS.map((item, i) => (
                        <motion.div 
                          key={i}
                          whileHover={{ x: 10 }}
                          className="bg-white/[0.03] border border-white/10 p-6 rounded-[2rem] flex gap-6 items-center group transition-all hover:bg-white/5 hover:border-green-400/30"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-green-400/20 group-hover:text-green-400 transition-all">
                            <item.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-white font-heading text-lg uppercase tracking-wide group-hover:text-green-400 transition-all">{item.name}</h4>
                            <p className="text-white/40 text-sm mt-1">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* WHAT TO AVOID */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-red-400 bg-red-400/5 border border-red-400/10 px-6 py-4 rounded-2xl w-fit">
                      <XCircle className="w-5 h-5" />
                      <span className="text-sm font-bold uppercase tracking-widest">Avoid or Limit</span>
                    </div>
                    <div className="grid gap-4">
                      {NUTRITION_DONTS.map((item, i) => (
                        <motion.div 
                          key={i}
                          whileHover={{ x: 10 }}
                          className="bg-white/[0.03] border border-white/10 p-6 rounded-[2rem] flex gap-6 items-center group transition-all hover:bg-white/5 hover:border-red-400/30"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-red-400/20 group-hover:text-red-400 transition-all">
                            <item.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-white font-heading text-lg uppercase tracking-wide group-hover:text-red-400 transition-all">{item.name}</h4>
                            <p className="text-white/40 text-sm mt-1">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TRAINING TIPS SECTION */}
            {(activeCategory === 'training' || activeCategory === 'all') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <SectionHeader title="Pro Training Insights" subtitle="Efficiency & Form" icon={Dumbbell} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PRO_TIPS.map((tip, i) => (
                    <div key={i} className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-10 rounded-[3rem] overflow-hidden backdrop-blur-xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/20 transition-all" />
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-all">
                          <tip.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-heading text-2xl text-white uppercase tracking-tight mb-4">{tip.title}</h3>
                        <p className="text-white/60 leading-relaxed font-light">{tip.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* QUICK KNOWLEDGE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-tr from-amber-500/20 to-transparent border border-amber-500/20 p-8 rounded-[2.5rem] relative group">
                <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Info className="w-6 h-6 text-amber-500" />
                </div>
                <h4 className="font-heading text-xl text-white mb-4 uppercase">Supplementation</h4>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Whey protein and Creatine Monohydrate are the most researched and effective supplements for growth.
                </p>
                <div className="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                  View Guide <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-gradient-to-tr from-blue-500/20 to-transparent border border-blue-500/20 p-8 rounded-[2.5rem] relative group">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Moon className="w-6 h-6 text-blue-500" />
                </div>
                <h4 className="font-heading text-xl text-white mb-4 uppercase">Recovery Tech</h4>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Foam rolling and cold exposure can significantly reduce DOMS and improve circulatory health.
                </p>
                <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest flex items-center gap-2">
                  Learn More <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-gradient-to-tr from-primary/20 to-transparent border border-primary/20 p-8 rounded-[2.5rem] relative group">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading text-xl text-white mb-4 uppercase">Mind-Muscle</h4>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Focusing on the muscle contracting rather than the weight moving increases hypertrophy by up to 20%.
                </p>
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  Read Article <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
