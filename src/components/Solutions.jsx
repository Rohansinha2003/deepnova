import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './Solutions.css';

const Solutions = () => {
  const features = [
    "Customer support automation",
    "Knowledge base AI assistants",
    "Internal productivity tools",
    "AI-powered analytics"
  ];

  return (
    <section id="solutions" className="solutions section">
      <div className="container solutions-container">
        <div className="solutions-content animate-on-scroll">
          <h2 className="section-title">Transforming How <br/><span className="gradient-text">Businesses Operate</span></h2>
          <p className="solutions-desc">
            DeepNova helps modern businesses leverage artificial intelligence to automate workflows, empower employees, and create delightful customer experiences. Our robust solutions integrate seamlessly into your daily operations.
          </p>
          
          <ul className="solutions-features">
            {features.map((feature, index) => (
              <li key={index} className="feature-item">
                <CheckCircle2 className="feature-icon" size={24} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <a href="#projects" className="btn btn-secondary mt-2">View our impact</a>
        </div>
        
        <div className="solutions-visual animate-on-scroll" style={{ animationDelay: '0.3s' }}>
          <div className="glass visual-card main-card">
            <div className="ai-pulse-ring"></div>
            <div className="visual-content">
              <h4>AI Utilization</h4>
              <div className="bar-graph">
                <div className="bar b1"></div>
                <div className="bar b2"></div>
                <div className="bar b3"></div>
                <div className="bar b4"></div>
              </div>
            </div>
          </div>
          <div className="glass visual-card floating-card">
            <div className="flex-row">
              <div className="circle-avatar"></div>
              <div>
                <h5>AI Assistant</h5>
                <small>Issue resolved in 2s</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
