import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    navigate: [
      { name: 'Home', href: '#' },
      { name: 'About', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Trainers', href: '#trainers' },
      { name: 'Expertise', href: '#testimonials' },
    ],
    services: [
      { name: 'Strength Training', href: '#services' },
      { name: 'Nutrition Plans', href: '#services' },
      { name: 'Combat Fitness', href: '#services' },
      { name: 'Hit & Cardio', href: '#services' },
      { name: 'Personal Training', href: '#services' },
    ],
    support: [
      { name: 'FAQ', href: '#' },
      { name: 'Contact', href: '#contact' },
      { name: 'Privacy Policies', href: '#' },
      { name: 'Terms & Conditions', href: '#' },
    ]
  };

  return (
    <footer className="w-full relative z-20">
      {/* Main Footer Content */}
      <div className="bg-[#2C2C2C]/50 py-20 md:py-28 px-4 md:px-10 lg:px-16 transition-colors duration-500">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
          
          {/* Logo & Slogan Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-8"
          >
            <div className="flex items-center gap-3 cursor-pointer group">
              <img 
                src="/img/logo.jpg" 
                alt="ForgeX Logo" 
                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border-2 border-primary shadow-[0_0_10px_rgba(211,165,35,0.3)] transition-transform group-hover:scale-105" 
              />
              <div className="text-light font-heading tracking-widest flex items-baseline ml-1 mt-1 transition-transform group-hover:scale-105">
                <span className="text-3xl md:text-4xl text-light">F</span>
                <span className="text-2xl md:text-3xl text-light">ORGE</span>
                <span className="text-primary text-3xl md:text-4xl">X</span>
              </div>
            </div>
            <p className="text-light/60 text-[15px] leading-relaxed font-light max-w-sm">
              Where strength is built, limits are broken, and your best self is forged.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[
                { name: 'Facebook', color: 'bg-[#1877F2]', icon: (
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                )},
                { name: 'Google', icon: (
                  <svg viewBox="0 0 48 48" className="w-5 h-5">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                )},
                { name: 'TikTok', color: 'bg-black', icon: (
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.34 6.34 0 01-2.22-2.23V14.5c0 3.33-1.88 6.55-5.18 7.6a7.28 7.28 0 01-9.66-4.32 7.28 7.28 0 014.34-9.66 7.25 7.25 0 013.92-.09c.14-.01.27.01.41.02V12.1c-.81-.24-1.72-.18-2.47.21-.75.39-1.29 1.1-1.48 1.94-.19.84-.03 1.74.45 2.45.48.71 1.25 1.18 2.09 1.3 2.11.3 4.25-1.07 4.25-3.51V.02z"/></svg>
                )},
                { name: 'Youtube', color: 'bg-[#FF0000]', icon: (
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                )}
              ].map((social, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`${social.color || 'bg-black/10 dark:bg-white/10'} w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors`}
                >
                  <span className="text-light">{social.icon}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-16">
            {[
              { title: 'Navigate', links: footerLinks.navigate },
              { title: 'Services', links: footerLinks.services },
              { title: 'Support', links: footerLinks.support }
            ].map((col, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                <h4 className="text-primary text-[11px] font-bold tracking-[0.2em] uppercase mb-10">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a href={link.href} className="text-light/50 text-[14px] font-light hover:text-primary transition-all duration-300 block hover:translate-x-1">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/5 dark:bg-black py-6 text-center border-t border-black/5 dark:border-white/5 transition-colors duration-500">
        <p className="text-light/30 text-[13px] font-light tracking-wide uppercase">
          © {new Date().getFullYear()} ForgeX Fitness. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
