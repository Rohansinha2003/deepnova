import React from 'react';
import { MessageSquare, Cpu, Database, Briefcase, Network, Settings } from 'lucide-react';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: <MessageSquare size={32} />,
      title: "AI Chatbot Development",
      description: "Intelligent conversational agents that handle customer support, lead generation, and workflow automation 24/7."
    },
    {
      icon: <Cpu size={32} />,
      title: "LLM Application Development",
      description: "Custom applications powered by Large Language Models tailored to your specific business logic and domain."
    },
    {
      icon: <Database size={32} />,
      title: "RAG Systems",
      description: "Retrieval Augmented Generation to give AI direct access to your company's proprietary knowledge base."
    },
    {
      icon: <Briefcase size={32} />,
      title: "AI Automation for Businesses",
      description: "Streamline operations with AI-driven workflows that eliminate repetitive tasks and increase efficiency."
    },
    {
      icon: <Network size={32} />,
      title: "Custom Machine Learning Models",
      description: "Proprietary models trained on your data to uncover insights, predict trends, and optimize decisions."
    },
    {
      icon: <Settings size={32} />,
      title: "AI API Integration",
      description: "Seamlessly connect modern AI capabilities like OpenAI or Anthropic into your existing software stack."
    }
  ];

  return (
    <section id="services" className="services section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">Our <span className="gradient-text">Services</span></h2>
          <p className="section-subtitle">
            Comprehensive AI engineering to transform your business operations and product offerings.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              className="service-card glass animate-on-scroll" 
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
