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
      </div>
      
      <div className="container hero-content">
        <div className="badge animate-on-scroll is-visible" style={{ animationDelay: '0.1s' }}>
          <Sparkles size={16} className="badge-icon" />
          <span>Next-Generation AI Solutions</span>
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
