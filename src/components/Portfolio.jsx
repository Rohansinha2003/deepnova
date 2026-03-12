import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import './Portfolio.css';

const Portfolio = () => {
  const projects = [
    {
      title: "AI Customer Support",
      type: "Chatbot Development",
      desc: "An intelligent autonomous agent that reduced support ticket volume by 45% for an e-commerce giant.",
      tags: ["LLM", "NLP", "Node.js"]
    },
    {
      title: "Legal Doc QA Assistant",
      type: "RAG System",
      desc: "Secure document retrieval system allowing lawyers to instantly query thousands of case files securely.",
      tags: ["Vector DB", "LangChain", "Python"]
    },
    {
      title: "DeepCode Assistant",
      type: "AI Coding Assistant",
      desc: "Custom copilot integrated into the internal IDE of a major tech firm to boost developer productivity.",
      tags: ["Code Generation", "PyTorch"]
    },
    {
      title: "OpsFlow Automation",
      type: "Business AI",
      desc: "End-to-end AI automation identifying supply chain bottlenecks and predicting logistics failures.",
      tags: ["Machine Learning", "Analytics"]
    }
  ];

  return (
    <section id="projects" className="portfolio section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-subtitle">Real-world AI implementations that deliver measurable ROI and operational efficiency.</p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div className="portfolio-card glass animate-on-scroll" key={index} style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="project-content">
                <span className="project-type">{project.type}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="project-links">
                <a href="#" className="plink"><Github size={18} /> Source</a>
                <a href="#" className="plink"><ExternalLink size={18} /> View Case Study</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
