import React from 'react';
import { Zap, ShieldCheck, Cog, ArrowUpRight } from 'lucide-react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: <Zap size={32} />,
      title: "Fast AI Deployment",
      desc: "Our pre-built frameworks and robust pipelines mean your AI solutions go from concept to production in weeks, not months."
    },
    {
      icon: <ArrowUpRight size={32} />,
      title: "Scalable Architecture",
      desc: "Built on modern cloud-native capabilities, our solutions are designed to scale seamlessly as your user base and data grow."
    },
    {
      icon: <Cog size={32} />,
      title: "Custom Solutions",
      desc: "We don't do off-the-shelf. Every model and automation is tailored specifically to your unique workflow and business goals."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Affordable AI Services for Startups",
      desc: "Enterprise-grade AI shouldn't break the bank. We offer competitive pricing models designed for growing companies."
    }
  ];

  return (
    <section id="why-us" className="features section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">Why Choose <span className="gradient-text">DeepNova</span></h2>
          <p className="section-subtitle">We bridge the gap between bleeding-edge AI research and practical business applications.</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-block animate-on-scroll" key={index} style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="feature-icon-container">
                {feature.icon}
              </div>
              <div>
                <h3 className="feature-block-title">{feature.title}</h3>
                <p className="feature-block-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
