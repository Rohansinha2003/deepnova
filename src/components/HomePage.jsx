import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { callAI } from '../lib/ai';
import {
  Send, Sparkles, Zap, Brain,
  MessageSquare, FileText, Languages, Code2, Cpu,
  ArrowRight, Globe,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './HomePage.css';

/* ── Search Modes ─────────────────────────────────────────── */
const SEARCH_MODES = [
  { id: 'normal',    label: 'Normal',     icon: <MessageSquare size={15} />, placeholder: "Ask me anything…",                                  color: '#f5f5f5' },
  { id: 'summarize', label: 'Summarize',  icon: <FileText size={15} />,     placeholder: 'Paste text or a topic to summarize…',              color: '#d4d4d8' },
  { id: 'translate', label: 'Translate',  icon: <Languages size={15} />,    placeholder: 'Enter text and specify the target language…',       color: '#e4e4e7' },
  { id: 'code',      label: 'Code',       icon: <Code2 size={15} />,        placeholder: 'Describe what you want to build or fix…',           color: '#f1f5f9' },
  { id: 'reasoning', label: 'Reasoning',  icon: <Cpu size={15} />,          placeholder: 'Give me a problem and I\'ll think it through…',     color: '#f8fafc' },
];

const MODE_SUGGESTIONS = {
  normal:    ['Explain transformer architecture', 'What is DeepNova AI?', 'How does RAG work?'],
  summarize: ['Summarize the GDPR in 5 points', 'TL;DR of a research paper', 'Key points from this article'],
  translate: ['Translate to French', 'Translate to Japanese', 'Translate to Hindi'],
  code:      ['Build a REST API in Express', 'Python quicksort', 'React custom hook example'],
  reasoning: ['Solve the trolley problem', 'Pros and cons of microservices', 'Best approach to scaling a startup?'],
};


export default function HomePage() {
  const [activeMode, setActiveMode]   = useState(SEARCH_MODES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory]         = useState([]);
  const [isLoading, setIsLoading]     = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [showResults, setShowResults] = useState(false);
  const inputRef                      = useRef(null);
  const heroRef                       = useRef(null);
  const vantaEffectRef                = useRef(null);

  useEffect(() => {
    if (!heroRef.current || typeof window === 'undefined' || !window.VANTA?.NET) return;

    const effect = window.VANTA.NET({
      el: heroRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xffffff,
      backgroundColor: 0x050505,
      points: 12.00,
      maxDistance: 18.00,
      spacing: 12.00,
    });

    vantaEffectRef.current = effect;
    return () => {
      vantaEffectRef.current?.destroy?.();
      vantaEffectRef.current = null;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sendMessage = async (text) => {
    const userText = (text ?? searchQuery).trim();
    if (!userText || isLoading) return;

    setSearchQuery('');
    setIsLoading(true);
    setStatusMessage('');
    setShowResults(true);

    const newHistory = [...history, { role: 'user', content: userText }];
    setHistory(newHistory);

    const controller = new AbortController();

    try {
      const reply = await callAI(activeMode.id, newHistory, controller.signal);
      setHistory(prev => [...prev, { role: 'assistant', content: reply }]);
      if (reply.toLowerCase().includes('ai search is not configured yet')) {
        setStatusMessage('Live AI response is currently unavailable. The UI is showing a fallback message.');
      } else {
        setStatusMessage('');
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error(err);
      setStatusMessage(err.message || 'The search request could not be completed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const latestAssistant = [...history].reverse().find(item => item.role === 'assistant');
  const latestUser = [...history].reverse().find(item => item.role === 'user');

  return (
    <>
      <Navbar />
      <main className="hp-page">

        {/* ════ HERO ════════════════════════════════════════ */}
        <section className="hp-hero" ref={heroRef}>
          <div className="hp-grid-bg" />
          <div className="hp-neural-scene" aria-hidden="true">
            <div className="hp-neural-core" />
            <div className="hp-neural-ring hp-neural-ring-a" />
            <div className="hp-neural-ring hp-neural-ring-b" />
            <div className="hp-neural-orbit hp-neural-orbit-a" />
            <div className="hp-neural-orbit hp-neural-orbit-b" />
            {Array.from({ length: 10 }).map((_, index) => {
              const left = 18 + (index % 5) * 16;
              const top = 18 + Math.floor(index / 5) * 22;
              const delay = index * 0.16;
              return (
                <span
                  key={index}
                  className={`hp-neural-node hp-neural-node-${index % 3}`}
                  style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }}
                />
              );
            })}
          </div>
          <div className="hp-orb hp-orb-1" style={{ background: activeMode.color }} />
          <div className="hp-orb hp-orb-2" />

          <div className="container hp-hero-inner">
            <div className="hp-hero-left animate-on-scroll">
              <div className="hp-badge">
                <Sparkles size={13} /> Powered by DeepNova AI
              </div>
              <h1 className="hp-headline">
                What's on <span className="gradient-text">your mind?</span>
              </h1>
              <p className="hp-subhead">
                The AI that writes, reasons, summarises, codes, and translates —
                all in one place. Pick a mode and start creating.
              </p>

              {/* Mode tabs */}
              <div className="hp-mode-tabs">
                {SEARCH_MODES.map(mode => (
                  <button
                    key={mode.id}
                    className={`hp-mode-tab ${activeMode.id === mode.id ? 'active' : ''}`}
                    style={activeMode.id === mode.id
                      ? { background: mode.color + '22', borderColor: mode.color + '88', color: mode.color }
                      : {}}
                    onClick={() => { setActiveMode(mode); setHistory([]); inputRef.current?.focus(); }}
                  >
                    {mode.icon} {mode.label}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div
                className="hp-search-bar glass"
                style={{ '--mc': activeMode.color }}
                onClick={() => {
                  inputRef.current?.focus();
                  setShowResults(true);
                }}
              >
                <div className="hp-search-pill" style={{ background: activeMode.color + '22', borderColor: activeMode.color + '66', color: activeMode.color }}>
                  {activeMode.icon} {activeMode.label}
                </div>
                <div className="hp-search-row">
                  <input
                    ref={inputRef}
                    className="hp-search-input"
                    type="text"
                    placeholder={activeMode.placeholder}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={handleKey}
                    disabled={isLoading}
                  />
                  <button
                    className="hp-search-send"
                    style={{ background: activeMode.color }}
                    onClick={() => sendMessage()}
                    disabled={isLoading || !searchQuery.trim()}
                  >
                    <Send size={17} />
                  </button>
                </div>
              </div>

              {statusMessage && (
                <div className="hp-status-message">
                  {statusMessage}
                </div>
              )}

              {showResults && (
                <div className="hp-answer-dropdown">
                  <div className="hp-answer-header">
                    <span>Answer preview</span>
                    <button type="button" className="hp-answer-close" onClick={() => setShowResults(false)}>Hide</button>
                  </div>
                  <div className="hp-answer-body">
                    {latestUser && (
                      <div className="hp-answer-prompt">
                        <strong>You asked:</strong> {latestUser.content}
                      </div>
                    )}
                    {latestAssistant ? (
                      <div className="hp-answer-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{latestAssistant.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <div className="hp-answer-empty">
                        Your answer will appear here as soon as you send a request.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              <div className="hp-suggestions">
                <span className="hp-suggest-label">Try:</span>
                {(MODE_SUGGESTIONS[activeMode.id] || []).map((s, i) => (
                  <button key={i} className="hp-chip" onClick={() => sendMessage(s)} disabled={isLoading}
                    style={{ '--mc': activeMode.color }}>
                    {s}
                  </button>
                ))}
              </div>

              {/* Stat row */}
              <div className="hp-stats">
                <div className="hp-stat glass"><Zap size={16} style={{ color: '#e5e7eb' }} /><span>Low latency</span></div>
                <div className="hp-stat glass"><Brain size={16} style={{ color: '#f3f4f6' }} /><span>128k context</span></div>
                <div className="hp-stat glass"><Globe size={16} style={{ color: '#d1d5db' }} /><span>100+ languages</span></div>
              </div>
            </div>

          </div>
        </section>


        {/* ════ CTA BANNER ═════════════════════════════════ */}
        <section className="hp-cta-banner container animate-on-scroll">
          <div className="hp-cta-inner glass">
            <div className="hp-cta-glow" />
            <h2>Ready to explore DeepNova?</h2>
            <p>Learn about our team, our mission, and the technology we're building.</p>
            <Link to="/who-we-are" className="btn btn-primary hp-cta-btn">
              Who We Are <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
