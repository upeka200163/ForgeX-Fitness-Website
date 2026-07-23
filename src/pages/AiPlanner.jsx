import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Navbar from '../components/Navbar';
import { generateFitnessPlan } from '../services/geminiService';

const GOALS = [
  { id: 'Weight Loss', icon: '🔥', desc: 'Burn fat & get lean' },
  { id: 'Muscle Gain', icon: '💪', desc: 'Build size & strength' },
  { id: 'Endurance', icon: '⚡', desc: 'Boost cardio & stamina' },
  { id: 'Flexibility', icon: '🧘', desc: 'Improve mobility' },
  { id: 'General Health', icon: '❤️', desc: 'Stay fit & healthy' },
];
const TIMELINES = ['4 weeks', '8 weeks', '12 weeks', '6 months'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const DURATIONS = ['30 min', '45 min', '60 min', '90 min'];
const EQUIPMENT = ['Home Only', 'Full Gym', 'Both'];
const DIETS = ['Standard', 'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Mediterranean'];
const ALLERGIES = ['Gluten', 'Lactose', 'Nuts', 'Soy', 'Eggs', 'Shellfish'];
const MACRO_COLORS = ['#D3A523', '#F59E0B', '#FB923C'];
const STEPS = ['Personal Info', 'Your Goals', 'Training', 'Diet & Nutrition'];

const initForm = {
  name: '', age: '', gender: '', height: '', weight: '', bodyFat: '',
  goal: '', targetWeight: '', timeline: '',
  fitnessLevel: '', daysPerWeek: 4, sessionDuration: '', equipment: '',
  dietType: '', allergies: [], calorieTarget: '',
};

// Reusable card option selector
const CardGrid = ({ options, selected, onSelect, multi = false, cols = 3 }) => (
  <div className={`grid grid-cols-2 ${cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-3`}>
    {options.map((opt) => {
      const val = typeof opt === 'object' ? opt.id : opt;
      const label = typeof opt === 'object' ? opt.id : opt;
      const icon = typeof opt === 'object' ? opt.icon : null;
      const desc = typeof opt === 'object' ? opt.desc : null;
      const active = multi ? selected.includes(val) : selected === val;
      return (
        <motion.button
          key={val} type="button"
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => multi
            ? onSelect(active ? selected.filter(s => s !== val) : [...selected, val])
            : onSelect(val)
          }
          className={`p-4 rounded-xl border text-left transition-all duration-300 ${
            active ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:border-white/30'
          }`}
        >
          {icon && <div className="text-2xl mb-2">{icon}</div>}
          <div className={`font-bold text-sm tracking-wide ${active ? 'text-primary' : 'text-white/80'}`}>{label}</div>
          {desc && <div className="text-white/40 text-xs mt-0.5">{desc}</div>}
        </motion.button>
      );
    })}
  </div>
);

const Input = ({ label, placeholder, type = 'text', value, onChange, required, optional }) => (
  <div>
    <label className="block text-white/60 text-xs font-bold tracking-widest uppercase mb-2">
      {label} {optional && <span className="text-white/30 normal-case tracking-normal font-normal">(optional)</span>}
    </label>
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} required={required}
      className="w-full bg-white/5 border border-white/10 focus:border-primary focus:bg-white/8 rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none transition-all duration-300 text-sm"
    />
  </div>
);

export default function AiPlanner() {
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem('forgex_planner_step');
    return saved ? parseInt(saved) : 1;
  });
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('forgex_planner_form');
    return saved ? JSON.parse(saved) : initForm;
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(() => {
    const saved = localStorage.getItem('forgex_planner_plan');
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('workout');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('forgex_planner_step', step.toString());
  }, [step]);

  useEffect(() => {
    localStorage.setItem('forgex_planner_form', JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    if (plan) {
      localStorage.setItem('forgex_planner_plan', JSON.stringify(plan));
    } else {
      localStorage.removeItem('forgex_planner_plan');
    }
  }, [plan]);

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const handleStartOver = () => {
    setPlan(null);
    setForm(initForm);
    setStep(1);
    localStorage.removeItem('forgex_planner_plan');
    localStorage.removeItem('forgex_planner_form');
    localStorage.removeItem('forgex_planner_step');
  };

  const canNext = () => {
    if (step === 1) return form.name && form.age && form.gender && form.height && form.weight;
    if (step === 2) return form.goal && form.timeline;
    if (step === 3) return form.fitnessLevel && form.sessionDuration && form.equipment;
    if (step === 4) return form.dietType;
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await generateFitnessPlan(form);
      setPlan(result);
    } catch (e) {
      console.error('[AiPlanner] Error:', e);
      setError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  if (loading) return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 gap-8">
      <motion.div
        animate={{ scale: [1, 1.12, 1], boxShadow: ['0 0 20px rgba(211,165,35,0.3)', '0 0 60px rgba(211,165,35,0.8)', '0 0 20px rgba(211,165,35,0.3)'] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary"
      >
        <img src="/img/logo.jpg" alt="ForgeX" className="w-full h-full object-cover" />
      </motion.div>
      <div className="text-center">
        <h2 className="font-heading text-4xl text-white tracking-widest mb-2">FORGING YOUR PLAN</h2>
        <p className="text-white/40 text-sm tracking-widest">AI is crafting your personalized program...</p>
      </div>
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <motion.div key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
            className="w-2 h-2 rounded-full bg-primary"
          />
        ))}
      </div>
    </div>
  );

  if (plan) return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-3">
            YOUR <span className="text-primary">PLAN</span> IS READY
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-sm">{plan.summary}</p>
        </motion.div>

        {/* Macro summary pills */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
          className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { label: 'Calories', val: plan.macros.calories, unit: 'kcal', color: 'text-white' },
            { label: 'Protein', val: plan.macros.protein, unit: 'g', color: 'text-primary' },
            { label: 'Carbs', val: plan.macros.carbs, unit: 'g', color: 'text-amber-400' },
            { label: 'Fats', val: plan.macros.fats, unit: 'g', color: 'text-orange-400' },
          ].map(m => (
            <div key={m.label} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center">
              <div className={`font-heading text-3xl ${m.color}`}>{m.val}<span className="text-sm ml-1 opacity-60">{m.unit}</span></div>
              <div className="text-white/40 text-xs tracking-widest uppercase mt-0.5">{m.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-2xl border border-white/10">
          {['workout', 'nutrition', 'tips'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                activeTab === tab ? 'bg-primary text-black' : 'text-white/50 hover:text-white'
              }`}>
              {tab === 'workout' ? '🏋️ Workout' : tab === 'nutrition' ? '🥗 Nutrition' : '💡 Tips'}
            </button>
          ))}
        </div>

        {/* WORKOUT TAB */}
        {activeTab === 'workout' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {plan.weeklyWorkout.map((day, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl border p-5 ${day.isRest ? 'border-white/5 bg-white/3' : 'border-white/10 bg-white/5'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-heading text-xl text-primary">{day.day}</div>
                    <div className="text-white/50 text-xs mt-0.5">{day.focus}</div>
                  </div>
                  {day.isRest && <span className="bg-white/5 text-white/30 text-[10px] px-2 py-1 rounded-full tracking-widest">REST</span>}
                </div>
                {!day.isRest && (
                  <div className="space-y-2 mt-3">
                    {(day.exercises || []).map((ex, j) => (
                      <div key={j} className="border-t border-white/5 pt-2">
                        <div className="flex justify-between items-start">
                          <span className="text-white/80 text-xs font-medium">{ex.name}</span>
                          <span className="text-primary text-xs ml-2 shrink-0">{ex.sets}×{ex.reps}</span>
                        </div>
                        {ex.notes && <div className="text-white/30 text-[10px] mt-0.5">{ex.notes}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* NUTRITION TAB */}
        {activeTab === 'nutrition' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.mealPlan.map((meal, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-heading text-xl text-primary">{meal.meal}</div>
                      <div className="text-white/40 text-xs">{meal.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{meal.calories}</div>
                      <div className="text-white/40 text-[10px] uppercase tracking-widest">kcal</div>
                    </div>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {meal.foods.map((f, j) => (
                      <li key={j} className="text-white/60 text-xs flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3 pt-3 border-t border-white/5">
                    {[['P', meal.macros?.protein, 'text-primary'], ['C', meal.macros?.carbs, 'text-amber-400'], ['F', meal.macros?.fats, 'text-orange-400']].map(([l, v, c]) => (
                      <div key={l} className="text-center flex-1">
                        <div className={`font-bold text-sm ${c}`}>{v}g</div>
                        <div className="text-white/30 text-[10px]">{l === 'P' ? 'Protein' : l === 'C' ? 'Carbs' : 'Fats'}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Macro Chart */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-heading text-xl text-white mb-4 text-center tracking-widest">DAILY MACRO SPLIT</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={[
                    { name: 'Protein', value: plan.macros.protein },
                    { name: 'Carbs', value: plan.macros.carbs },
                    { name: 'Fats', value: plan.macros.fats },
                  ]} cx="50%" cy="50%" innerRadius={65} outerRadius={100} paddingAngle={4} dataKey="value">
                    {MACRO_COLORS.map((color, i) => <Cell key={i} fill={color} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v}g`, n]} contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '12px', color: '#fff' }} />
                  <Legend formatter={(v) => <span style={{ color: '#ffffff99', fontSize: 12 }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4">
            {(plan.tips || []).map((tip, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-sm">{i + 1}</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed pt-1">{tip}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
          <button onClick={() => window.print()}
            className="px-8 py-3 border border-primary text-primary rounded-full text-sm font-bold tracking-widest hover:bg-primary hover:text-black transition-all duration-300">
            🖨️ SAVE PLAN
          </button>
          <button onClick={handleStartOver}
            className="px-8 py-3 bg-white/5 border border-white/10 text-white/60 rounded-full text-sm font-bold tracking-widest hover:border-white/30 hover:text-white transition-all duration-300">
            ↩ START OVER
          </button>
        </div>
      </div>
    </div>
  );

  // ── FORM ──
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 md:px-8 pt-28 pb-20">

        {/* Page title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-3">
            FORGEX <span className="text-primary">AI</span> PLANNER
          </h1>
          <p className="text-white/40 text-sm tracking-wide">
            Answer 4 quick questions — get your personalized program instantly.
          </p>
        </motion.div>

        {/* Step Progress */}
        <div className="flex items-center mb-10">
          {STEPS.map((s, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <React.Fragment key={n}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                    done ? 'bg-primary border-primary text-black' :
                    active ? 'border-primary text-primary bg-primary/10' :
                    'border-white/20 text-white/30'
                  }`}>
                    {done ? '✓' : n}
                  </div>
                  <span className={`text-[9px] uppercase tracking-widest hidden sm:block ${active ? 'text-primary' : 'text-white/25'}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-[1px] mx-2 transition-all duration-500" style={{ background: step > n ? '#D3A523' : 'rgba(255,255,255,0.1)' }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div key={step} custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-white/3 border border-white/8 rounded-3xl p-6 md:p-8 space-y-6">

            {/* STEP 1 */}
            {step === 1 && <>
              <h2 className="font-heading text-2xl text-white tracking-widest">PERSONAL INFO</h2>
              <Input label="Full Name" placeholder="John Doe" value={form.name} onChange={set('name')} required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Age" type="number" placeholder="25" value={form.age} onChange={set('age')} required />
                <Input label="Body Fat %" type="number" placeholder="18" value={form.bodyFat} onChange={set('bodyFat')} optional />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-bold tracking-widest uppercase mb-2">Gender</label>
                <CardGrid options={['Male', 'Female', 'Other']} selected={form.gender} onSelect={set('gender')} cols={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Height (cm)" type="number" placeholder="175" value={form.height} onChange={set('height')} required />
                <Input label="Weight (kg)" type="number" placeholder="75" value={form.weight} onChange={set('weight')} required />
              </div>
            </>}

            {/* STEP 2 */}
            {step === 2 && <>
              <h2 className="font-heading text-2xl text-white tracking-widest">YOUR GOALS</h2>
              <div>
                <label className="block text-white/60 text-xs font-bold tracking-widest uppercase mb-2">Primary Goal</label>
                <CardGrid options={GOALS} selected={form.goal} onSelect={set('goal')} />
              </div>
              <Input label="Target Weight (kg)" type="number" placeholder="68" value={form.targetWeight} onChange={set('targetWeight')} optional />
              <div>
                <label className="block text-white/60 text-xs font-bold tracking-widest uppercase mb-2">Timeline</label>
                <CardGrid options={TIMELINES} selected={form.timeline} onSelect={set('timeline')} cols={4} />
              </div>
            </>}

            {/* STEP 3 */}
            {step === 3 && <>
              <h2 className="font-heading text-2xl text-white tracking-widest">TRAINING</h2>
              <div>
                <label className="block text-white/60 text-xs font-bold tracking-widest uppercase mb-2">Fitness Level</label>
                <CardGrid options={LEVELS} selected={form.fitnessLevel} onSelect={set('fitnessLevel')} cols={3} />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-bold tracking-widest uppercase mb-2">
                  Days Per Week — <span className="text-primary">{form.daysPerWeek} days</span>
                </label>
                <input type="range" min="1" max="7" value={form.daysPerWeek}
                  onChange={e => set('daysPerWeek')(Number(e.target.value))}
                  className="w-full accent-primary h-2 rounded-full" />
                <div className="flex justify-between text-white/30 text-xs mt-1">
                  {[1,2,3,4,5,6,7].map(d => <span key={d}>{d}</span>)}
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-xs font-bold tracking-widest uppercase mb-2">Session Duration</label>
                <CardGrid options={DURATIONS} selected={form.sessionDuration} onSelect={set('sessionDuration')} cols={4} />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-bold tracking-widest uppercase mb-2">Equipment Access</label>
                <CardGrid options={EQUIPMENT} selected={form.equipment} onSelect={set('equipment')} cols={3} />
              </div>
            </>}

            {/* STEP 4 */}
            {step === 4 && <>
              <h2 className="font-heading text-2xl text-white tracking-widest">DIET & NUTRITION</h2>
              <div>
                <label className="block text-white/60 text-xs font-bold tracking-widest uppercase mb-2">Diet Type</label>
                <CardGrid options={DIETS} selected={form.dietType} onSelect={set('dietType')} cols={3} />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-bold tracking-widest uppercase mb-2">
                  Allergies / Intolerances <span className="text-white/30 normal-case tracking-normal font-normal">(optional, multi-select)</span>
                </label>
                <CardGrid options={ALLERGIES} selected={form.allergies} onSelect={set('allergies')} multi cols={3} />
              </div>
              <Input label="Daily Calorie Target" type="number" placeholder="Auto-calculated" value={form.calorieTarget} onChange={set('calorieTarget')} optional />
              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 text-center space-y-3">
                  <div className="text-red-400 text-sm leading-relaxed">
                    <span className="font-bold block mb-1">⚠️ GENERATION FAILED</span>
                    {error}
                  </div>
                  <button onClick={handleGenerate} 
                    className="text-primary text-xs font-bold uppercase tracking-widest hover:text-white transition-colors duration-300">
                    ↻ Click here to retry generation
                  </button>
                </motion.div>
              )}
            </>}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button onClick={() => setStep(s => s - 1)} disabled={step === 1}
            className="px-6 py-3 rounded-full border border-white/10 text-white/50 text-sm font-bold tracking-widest hover:border-white/30 hover:text-white transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed">
            ← BACK
          </button>
          {step < 4 ? (
            <motion.button onClick={() => canNext() && setStep(s => s + 1)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest transition-all duration-300 ${
                canNext() ? 'bg-primary text-black hover:shadow-[0_0_25px_rgba(211,165,35,0.4)]' : 'bg-white/5 text-white/25 cursor-not-allowed'
              }`}>
              NEXT →
            </motion.button>
          ) : (
            <motion.button onClick={() => canNext() && handleGenerate()} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest transition-all duration-300 ${
                canNext() ? 'bg-primary text-black hover:shadow-[0_0_30px_rgba(211,165,35,0.5)]' : 'bg-white/5 text-white/25 cursor-not-allowed'
              }`}>
              ✦ FORGE MY PLAN
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
