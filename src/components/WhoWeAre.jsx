import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import Solutions from './Solutions';
import Process from './Process';
import TechStack from './TechStack';
import Portfolio from './Portfolio';
import Features from './Features';
import ContactCTA from './ContactCTA';
import Footer from './Footer';

function WhoWeAre() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Solutions />
        <Process />
        <TechStack />
        <Portfolio />
        <Features />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

export default WhoWeAre;
