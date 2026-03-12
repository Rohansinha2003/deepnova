import React from 'react';
import { Lightbulb, Code2, Cpu, Rocket } from 'lucide-react';
import './Process.css';

const Process = () => {
  const steps = [
    {
      icon: <Lightbulb size={28} />,
      title: "1. Understand",
      desc: "Analyze your business problem and define clear AI objectives."
    },
    {
      icon: <Code2 size={28} />,
      title: "2. Design",
      desc: "Architect the AI solution, selecting the right models and data pipelines."
    },
    {
      icon: <Cpu size={28} />,
      title: "3. Train & Integrate",
      desc: "Develop, fine-tune models, and integrate them into your systems."
    },
    {
      icon: <Rocket size={28} />,
      title: "4. Deploy & Scale",
      desc: "Launch the scalable AI solution with ongoing monitoring and support."
    }
  ];

  return (
    <section id="process" className="process section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">Our <span className="gradient-text">Deployment Process</span></h2>
          <p className="section-subtitle">A proven workflow to take your AI initiatives from concept to production-ready scalable solutions.</p>
        </div>

        <div className="process-timeline">
          {steps.map((step, index) => (
            <div className={`process-step animate-on-scroll`} key={index} style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="step-icon">
                {step.icon}
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
