import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { User, Bell, Shield, CreditCard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-black text-white font-sans pb-32">
      <Navbar />
      <Sidebar />
      
      <div className="pt-28 md:pt-36 px-4 md:px-8 lg:ml-64 lg:px-12 xl:px-20">
        <div className="max-w-4xl mx-auto">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-white/10 pb-8">
            <h1 className="font-heading text-5xl md:text-6xl text-white uppercase tracking-tighter leading-none mb-4">
              Account <span className="text-primary">Settings</span>
            </h1>
            <p className="text-white/50 text-sm font-bold tracking-widest uppercase">Manage your profile and preferences</p>
          </motion.div>

          <div className="space-y-8">
            
            {/* Profile Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="font-heading text-2xl uppercase tracking-widest">Personal Info</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-white/50">Full Name</label>
                  <input type="text" defaultValue={user?.name || ''} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-white/50">Email Address</label>
                  <input type="email" defaultValue={user?.email || ''} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" />
                </div>
              </div>
              <button className="mt-6 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors">Save Changes</button>
            </motion.div>

            {/* Notifications */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <Bell className="w-6 h-6" />
                </div>
                <h2 className="font-heading text-2xl uppercase tracking-widest">Notifications</h2>
              </div>
              
              <div className="space-y-6">
                {[
                  { title: 'Workout Reminders', desc: 'Get notified 1 hour before scheduled class' },
                  { title: 'Weekly Reports', desc: 'Summary of your progress and achievements' },
                  { title: 'Special Offers', desc: 'Discounts on supplements and gear' },
                ].map((notif, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-white mb-1">{notif.title}</div>
                      <div className="text-[10px] text-white/50 tracking-widest">{notif.desc}</div>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-red-500/5 border border-red-500/20 rounded-[2rem] p-8 backdrop-blur-xl">
              <h2 className="font-heading text-2xl uppercase tracking-widest text-red-500 mb-6">Danger Zone</h2>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-white mb-1">Log Out of All Devices</div>
                  <div className="text-[10px] text-white/50 tracking-widest">End all active sessions on other devices.</div>
                </div>
                <button onClick={handleLogout} className="px-6 py-3 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
