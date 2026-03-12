import React from 'react';
import { Cpu, Github, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer section">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo">
            <Cpu className="logo-icon" size={28} />
            <span className="logo-text">DeepNova <span className="gradient-text">AI</span></span>
          </div>
          <p className="footer-desc">
            We design and deploy powerful AI solutions including LLMs, chatbots, RAG systems, and custom AI automation.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon"><Twitter size={20} /></a>
            <a href="#" className="social-icon"><Linkedin size={20} /></a>
            <a href="#" className="social-icon"><Github size={20} /></a>
          </div>
        </div>
        
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">AI Chatbot Development</a></li>
            <li><a href="#services">LLM Application Development</a></li>
            <li><a href="#services">RAG Systems</a></li>
            <li><a href="#services">AI Automation</a></li>
          </ul>
        </div>
        
        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for the latest AI insights.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn btn-primary"><ArrowRight size={20} /></button>
          </form>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} DeepNova AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
