import React, { useState, useMemo, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchServices } from '../services/api';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ServiceIcon = ({ type }) => {
  switch (type) {
    case 'strength': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M6 7.5L4.5 9M18 7.5L19.5 9M12 12V21M3 7.5H21M7 7.5V3H17V7.5M12 12L9 9M12 12L15 9" strokeLinecap="round" strokeJoin="round"/></svg>;
    case 'combat': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M12 2L9 4C8 5 7 7 7 9C7 11 8 13 9 15L12 17L15 15C16 13 17 11 17 9C17 7 16 5 15 4L12 2Z" strokeLinecap="round" strokeJoin="round"/></svg>;
    case 'hiit': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeJoin="round"/></svg>;
    case 'personal': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeJoin="round"/></svg>;
    case 'wellness': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636" strokeLinecap="round" strokeJoin="round"/></svg>;
    case 'nutrition': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l-2 4h4l-2 4" strokeLinecap="round" strokeJoin="round"/></svg>;
    default: return null;
  }
};

const ServiceCard = ({ title, category, description, icon, index }) => {
  return (
    <div className="relative w-full h-full bg-gray dark:bg-card-bg border border-black/5 dark:border-white/5 overflow-hidden group transition-colors duration-500">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
      <div className="absolute top-6 right-8 text-black/10 dark:text-white/5 text-6xl font-heading select-none group-hover:text-primary/20 transition-colors duration-700">
        {index}
      </div>
      <div className="pt-16 pb-10 px-8 md:pt-20 md:pb-12 md:px-10 h-full flex flex-col justify-between relative z-10">
        <div>
          <div className="flex flex-col gap-6 mb-8">
            <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">{category}</span>
            <div className="w-14 h-14 bg-black/5 dark:bg-white/5 flex items-center justify-center p-3 group-hover:bg-primary transition-all duration-700 rounded-sm">
              <span className="text-black dark:text-white group-hover:text-black transition-colors duration-500">
                <ServiceIcon type={icon} />
              </span>
            </div>
          </div>
          <h3 className="text-black dark:text-white text-3xl md:text-4xl font-heading mb-4 uppercase tracking-wider group-hover:text-primary transition-colors duration-500 line-height-tight">
            {title}
          </h3>
          <p className="text-black/60 dark:text-[#b0b0b0] text-sm md:text-[15px] font-light leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-4 group/btn cursor-pointer">
          <div className="w-8 h-[2px] bg-primary group-hover/btn:w-12 transition-all duration-500"></div>
          <span className="text-black dark:text-white text-[11px] font-bold tracking-[0.2em] uppercase">Explore</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700"></div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="w-full h-full bg-gray/50 dark:bg-white/5 border border-black/5 dark:border-white/5 animate-pulse p-12 flex flex-col justify-between">
    <div>
      <div className="w-20 h-3 bg-black/5 dark:bg-white/10 mb-6"></div>
      <div className="w-14 h-14 bg-black/5 dark:bg-white/10 mb-8 mt-2"></div>
      <div className="w-full h-10 bg-black/5 dark:bg-white/10 mb-4"></div>
      <div className="w-2/3 h-10 bg-black/5 dark:bg-white/10 mb-8"></div>
      <div className="space-y-3">
        <div className="w-full h-3 bg-black/5 dark:bg-white/10"></div>
        <div className="w-full h-3 bg-black/5 dark:bg-white/10"></div>
        <div className="w-1/2 h-3 bg-black/5 dark:bg-white/10"></div>
      </div>
    </div>
    <div className="w-24 h-4 bg-black/5 dark:bg-white/10"></div>
  </div>
);

const categories = ["ALL", "BODY BUILDING", "MARTIAL ARTS", "ENDURANCE", "ELITE COACHING", "WELLNESS", "DIET & HEALTH"];

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchServices();
        setServicesData(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const filteredServices = useMemo(() => {
    return servicesData.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'ALL' || service.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, servicesData]);

  return (
    <section id="services" className="pt-16 pb-24 md:pt-20 md:pb-32 bg-dark w-full overflow-hidden relative">
      <style>
        {`
          .services-swiper .swiper-pagination-bullet {
            width: 40px;
            height: 3px;
            border-radius: 0;
            background: currentColor;
            opacity: 0.1;
            transition: all 0.5s ease;
          }
          .services-swiper .swiper-pagination-bullet-active {
            opacity: 1;
            background: #D3A523;
            width: 60px;
          }
          .services-swiper .swiper-slide {
            opacity: 0.6;
            transition: all 0.5s ease;
          }
          .services-swiper .swiper-slide-active {
            opacity: 1;
            transform: scale(1.15) !important;
            z-index: 10;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
 
      <div className="max-w-[1800px] mx-auto px-4 md:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-5 mb-6">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-[0.3em] text-[11px] uppercase">Our Programs</span>
            </div>
            <h2 className="text-black dark:text-light text-5xl md:text-7xl lg:text-8xl font-heading uppercase leading-none mb-8">
              ELITE <span className="text-primary">SERVICES</span> <br/>
              FOR CHAMPIONS
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:max-w-[850px] flex flex-col gap-8"
          >
            {/* Search Input Container */}
            <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-6 py-5 group focus-within:border-primary transition-all duration-500 w-full md:w-[850px] shadow-2xl shadow-black/10">
              <div className="text-primary group-focus-within:scale-110 transition-transform duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="SEARCH SERVICES..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-black dark:text-white font-heading tracking-[0.2em] text-base md:text-lg lg:text-xl focus:outline-none placeholder:text-black/30 dark:placeholder:text-white/20"
              />
            </div>

            {/* Category Tabs Container */}
            <div className="flex flex-nowrap items-center gap-2 md:gap-3 w-full md:w-[850px] h-14 overflow-x-auto overflow-y-hidden scrollbar-hide select-none transition-all duration-500">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase transition-all duration-300 border border-transparent whitespace-nowrap ${
                    activeCategory === cat 
                      ? 'bg-primary text-black shadow-lg shadow-primary/20' 
                      : 'bg-black/5 dark:bg-white/5 text-black dark:text-white hover:border-primary/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} className="relative">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-[550px]"><SkeletonCard /></div>
                ))}
              </div>
            ) : filteredServices.length > 0 ? (
              <motion.div key={activeCategory + searchTerm} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.5 }}>
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={1}
                  loop={filteredServices.length >= 3}
                  slideToClickedSlide={true}
                  coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: false }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                  className="services-swiper !pb-24"
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 30 },
                    1024: { slidesPerView: 3, spaceBetween: 50 }
                  }}
                >
                  {filteredServices.map((service, idx) => (
                    <SwiperSlide key={service.id}>
                      <div className="w-full max-w-md h-[550px] transform transition-all duration-500">
                        <ServiceCard {...service} index={`0${idx + 1}`} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-40 text-center">
                <h3 className="text-black/30 dark:text-white/20 text-4xl font-heading mb-4 uppercase">No Services Found</h3>
                <button onClick={() => { setSearchTerm(''); setActiveCategory('ALL'); }} className="text-primary hover:text-black dark:hover:text-white transition-colors tracking-widest font-bold text-sm uppercase">Clear all filters</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
