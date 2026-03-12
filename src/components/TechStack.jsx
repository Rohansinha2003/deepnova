import React from 'react';
import './TechStack.css';

const TechStack = () => {
  const techCards = [
    { name: 'Python', color: '#3776AB' },
    { name: 'TensorFlow', color: '#FF6F00' },
    { name: 'PyTorch', color: '#EE4C2C' },
    { name: 'LangChain', color: '#121212' },
    { name: 'OpenAI API', color: '#412991' },
    { name: 'Vector DBs', color: '#00E5FF' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Next.js', color: '#000000' },
  ];

  return (
    <section className="tech-stack section pb-0">
      <div className="container">
        <h3 className="tech-title animate-on-scroll">Powered by Modern Technologies</h3>
        
        <div className="tech-grid animate-on-scroll" style={{ animationDelay: '0.2s' }}>
          {techCards.map((tech, index) => (
            <div className="tech-card glass" key={index}>
              <div className="tech-dot" style={{ background: tech.color, boxShadow: `0 0 10px ${tech.color}` }}></div>
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
