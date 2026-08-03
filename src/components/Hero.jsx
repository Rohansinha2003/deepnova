import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero section">
      <div className="hero-background">
        <div className="glow-orb purple"></div>
        <div className="glow-orb blue"></div>
        <div className="grid-overlay"></div>
        <div className="code-lines" aria-hidden="true"></div>
      </div>
      
      <div className="container hero-content">
        <div className="badge animate-on-scroll is-visible" style={{ animationDelay: '0.1s' }}>
          <Sparkles size={16} className="badge-icon" />
          <span>Next-Generation AI Solutions</span>
          <div className="tech-icons" aria-hidden="true">
            {/* simple inline SVG tech icons */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="url(#g1)" strokeWidth="1.2" />
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0" stopColor="#9d00ff" />
                  <stop offset="1" stopColor="#00d2ff" />
                </linearGradient>
              </defs>
            </svg>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 3v18M3 12h18" stroke="#00d2ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M3 16c3-6 6-8 9-2 3-6 6-4 9 2" stroke="#9d00ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        
        <h1 className="hero-title animate-on-scroll is-visible" style={{ animationDelay: '0.2s' }}>
          Build Intelligent Products with <br />
          <span className="gradient-text">DeepNova AI</span>
        </h1>
        
        <p className="hero-subtitle animate-on-scroll is-visible" style={{ animationDelay: '0.3s' }}>
          We design and deploy powerful AI solutions including LLMs, chatbots, RAG systems, and custom AI automation for startups and enterprises.
        </p>
        
        <div className="hero-buttons animate-on-scroll is-visible" style={{ animationDelay: '0.4s' }}>
          <a href="#services" className="btn btn-primary btn-large">
            Get Started <ArrowRight size={20} className="ml-2" />
          </a>
          <a href="#contact" className="btn btn-secondary btn-large">
            Book a Consultation
          </a>
        </div>

        <div className="hero-image-container animate-on-scroll is-visible" style={{ animationDelay: '0.6s' }}>
          <div className="glass hero-dashboard-mockup">
            <div className="mockup-header">
              <div className="dots">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className="mockup-body">
              <div className="mockup-sidebar"></div>
              <div className="mockup-main">
                <div className="mockup-chart"></div>
                <div className="mockup-cards">
                  <div className="mc"></div>
                  <div className="mc"></div>
                  <div className="mc"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Lottie animation floating near the mockup */}
          <div className="lottie-holder" aria-hidden>
            <lottie-player
              src="https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
