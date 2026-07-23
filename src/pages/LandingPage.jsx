import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import Trainers from '../components/Trainers';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark text-black dark:text-light transition-colors duration-500">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Marquee />
      <Services />
      <Pricing />
      <Trainers />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
