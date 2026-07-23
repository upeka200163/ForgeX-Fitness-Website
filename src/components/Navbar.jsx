import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAiPage = location.pathname === '/ai-planner';
  const isRegisterPage = location.pathname === '/register';
  const isDashboardPage = location.pathname === '/dashboard';
  const appPages = ['/dashboard', '/classes', '/workouts', '/progress', '/settings', '/ai-planner'];
  const isAppPage = appPages.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#services' },
    { name: 'PRICING', href: '#pricing' },
    { name: 'TRAINERS', href: '#trainers' },
    { name: 'TESTIMONIALS', href: '#testimonials' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleSectionLink = (e, href) => {
    e.preventDefault();
    if (isAppPage || isRegisterPage) {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const ThemeIcon = () =>
    isDarkMode ? (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 dark:bg-black/60 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 shadow-lg py-1.5 md:py-2'
          : 'bg-white/20 dark:bg-black/20 backdrop-blur-md border-b border-white/10 dark:border-white/5 py-2.5 md:py-3'
      }`}
    >
      <div className="max-w-[1700px] w-full mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex justify-between items-center h-10 md:h-12">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group relative z-[60]">
            <img
              src="/img/logo.jpg"
              alt="ForgeX Logo"
              className="h-7 w-7 md:h-9 md:w-9 rounded-full object-cover border-2 border-primary shadow-[0_0_15px_rgba(211,165,35,0.3)] transition-transform group-hover:scale-105"
            />
            <div className="text-black dark:text-white font-heading tracking-widest flex items-baseline ml-1 mt-1 transition-transform group-hover:scale-105">
              <span className="text-xl md:text-2xl">F</span>
              <span className="text-lg md:text-xl">ORGE</span>
              <span className="text-primary text-xl md:text-2xl">X</span>
            </div>
          </Link>

          {/* Desktop Links */}
          {(!isAppPage) && (
            <div className="hidden lg:flex space-x-4 xl:space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSectionLink(e, item.href)}
                  className="text-black/70 dark:text-light/80 hover:text-primary transition-all duration-300 text-[12px] xl:text-[13px] font-bold tracking-[0.2em] relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full" />
                </a>
              ))}
            </div>
          )}

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500 text-black dark:text-white relative group"
              aria-label="Toggle Theme"
            >
              <ThemeIcon />
            </button>

            {/* AI PLANNER Button */}
            <Link
              to="/ai-planner"
              className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.2em] transition-all duration-300 border ${
                isAiPage
                  ? 'bg-primary text-black border-primary'
                  : 'border-primary text-primary hover:bg-primary hover:text-black hover:shadow-[0_0_20px_rgba(211,165,35,0.35)]'
              }`}
            >
              ✦ AI PLANNER
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-6 py-2 rounded-full text-[11px] font-bold tracking-[0.2em] transition-all duration-300 ${
                    isDashboardPage 
                      ? 'bg-primary text-black' 
                      : 'bg-white/5 border border-white/10 text-white hover:border-primary/50'
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  DASHBOARD
                </Link>
              </div>
            ) : (
              <Link 
                to="/register"
                className="bg-primary text-black hover:bg-light hover:text-black hover:scale-105 hover:shadow-[0_0_25px_rgba(211,165,35,0.4)] transition-all duration-500 px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.2em]"
              >
                JOIN THE CLUB
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4 relative z-[60]">
            <button onClick={toggleTheme} className="p-2 rounded-full text-black dark:text-white">
              <ThemeIcon />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black dark:text-light hover:text-primary transition-colors focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[50] lg:hidden bg-light dark:bg-black p-10 flex flex-col justify-center gap-12"
          >
            <div className="flex flex-col gap-8">
              {(!isAppPage) && menuItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  href={item.href}
                  onClick={(e) => handleSectionLink(e, item.href)}
                  className="text-black dark:text-white font-heading text-5xl md:text-6xl tracking-tighter hover:text-primary transition-colors uppercase leading-none"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Link
                  to="/ai-planner"
                  onClick={() => setIsOpen(false)}
                  className="text-primary font-heading text-5xl md:text-6xl tracking-tighter hover:text-primary/80 transition-colors uppercase leading-none"
                >
                  ✦ AI PLANNER
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-6"
            >
              {user ? (
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-primary text-black py-4 font-bold tracking-[0.2em] text-sm rounded-sm text-center"
                >
                  GO TO DASHBOARD
                </Link>
              ) : (
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-primary text-black py-4 font-bold tracking-[0.2em] text-sm rounded-sm text-center"
                >
                  JOIN THE CLUB
                </Link>
              )}
              <div className="flex justify-center gap-8 text-black/40 dark:text-white/30 text-[10px] font-bold tracking-widest">
                <span>FB</span>
                <span>TW</span>
                <span>IG</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

