import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, Target, Eye, Rocket, ShieldCheck, Handshake, Lightbulb, Cog,
} from 'lucide-react';
import NeuralBackground from './NeuralBackground';
import './AboutIntro.css';

const HIGHLIGHTS = [
  { value: 'Weeks', label: 'not months, from concept to production' },
  { value: '100+', label: 'languages supported in our AI search' },
  { value: '5', label: 'AI modes: chat, summarize, translate, code, reasoning' },
  { value: '100%', label: 'custom-built around your workflow' },
];

const PILLARS = [
  {
    icon: <Target size={22} />,
    title: 'Our Mission',
    text: 'Bridge the gap between bleeding-edge AI research and practical business applications, so startups and enterprises can ship intelligent products without enterprise-sized budgets.',
  },
  {
    icon: <Eye size={22} />,
    title: 'Our Vision',
    text: 'A world where every team can put LLMs, RAG systems and automation to work on real problems, safely, reliably and at scale.',
  },
];

const VALUES = [
  { icon: <Lightbulb size={22} />, title: 'Practical first', text: 'We build AI that solves a concrete problem, not demos that look good and go nowhere.' },
  { icon: <Rocket size={22} />, title: 'Fast to production', text: 'Pre-built frameworks and robust pipelines get you live in weeks while keeping quality high.' },
  { icon: <Cog size={22} />, title: 'Tailored, not off-the-shelf', text: 'Every model and automation is shaped around your unique workflow and goals.' },
  { icon: <ShieldCheck size={22} />, title: 'Secure by design', text: 'Your data stays yours. We design retrieval and integrations with privacy in mind.' },
  { icon: <Handshake size={22} />, title: 'Partners, not vendors', text: 'Competitive pricing for growing companies, and we stay with you as you scale.' },
];

export default function AboutIntro() {
  return (
    <>
      <section id="home" className="about-hero">
        <NeuralBackground />
        <div className="about-hero-fade" />
        <div className="container about-hero-inner">
          <div className="about-eyebrow animate-on-scroll is-visible">
            <Sparkles size={14} /> Who We Are
          </div>
          <h1 className="about-title animate-on-scroll is-visible">
            We turn <span className="gradient-text">cutting-edge AI</span> into products people actually use.
          </h1>
          <p className="about-lead animate-on-scroll is-visible">
            DeepNova AI designs and deploys LLMs, chatbots, RAG systems and custom automation for
            startups and enterprises. Fast to build, tailored to your business, and ready to scale.
          </p>
          <div className="about-actions animate-on-scroll is-visible">
            <a href="#contact" className="btn btn-primary">Talk to us <ArrowRight size={18} style={{ marginLeft: 8 }} /></a>
            <a href="#services" className="btn btn-secondary">What we do</a>
          </div>
        </div>
      </section>

      <section className="about-stats container">
        <div className="about-stats-grid glass animate-on-scroll">
          {HIGHLIGHTS.map(h => (
            <div className="about-stat" key={h.value}>
              <div className="about-stat-value">{h.value}</div>
              <div className="about-stat-label">{h.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-story section">
        <div className="container about-story-grid">
          <div className="animate-on-scroll">
            <p className="about-kicker">Our story</p>
            <h2 className="section-title">Built for teams who want results, <span className="gradient-text">not hype</span></h2>
            <p className="about-text">
              AI is moving faster than most businesses can follow. We started DeepNova to close that
              distance: taking what is possible in research and turning it into reliable software that
              fits how your team already works.
            </p>
            <p className="about-text">
              From a customer-support agent to a secure document Q&amp;A system, we plug the right
              models into your stack, and handle the rate-limiting, caching, and fallback logic that keep
              it stable in production.
            </p>
            <Link to="/" className="about-link">Try our AI search <ArrowRight size={16} /></Link>
          </div>
          <div className="about-pillars">
            {PILLARS.map((p, i) => (
              <div className="about-pillar glass animate-on-scroll" key={p.title} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="about-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-values section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">What we <span className="gradient-text">stand for</span></h2>
            <p className="section-subtitle">The principles behind every project we take on.</p>
          </div>
          <div className="about-values-grid">
            {VALUES.map((v, i) => (
              <div className="about-value glass animate-on-scroll" key={v.title} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="about-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
