import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { callAI } from '../lib/ai';
import {
  Send, Bot, User, Sparkles, Zap, Brain,
  MessageSquare, FileText, Languages, Code2, Cpu,
  ArrowRight, Globe,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './HomePage.css';

/* ── Search Modes ─────────────────────────────────────────── */
const SEARCH_MODES = [
  { id: 'normal',    label: 'Normal',     icon: <MessageSquare size={15} />, placeholder: "Ask me anything…",                                  color: '#a855f7' },
  { id: 'summarize', label: 'Summarize',  icon: <FileText size={15} />,     placeholder: 'Paste text or a topic to summarize…',              color: '#3b82f6' },
  { id: 'translate', label: 'Translate',  icon: <Languages size={15} />,    placeholder: 'Enter text and specify the target language…',       color: '#06b6d4' },
  { id: 'code',      label: 'Code',       icon: <Code2 size={15} />,        placeholder: 'Describe what you want to build or fix…',           color: '#22c55e' },
  { id: 'reasoning', label: 'Reasoning',  icon: <Cpu size={15} />,          placeholder: 'Give me a problem and I\'ll think it through…',     color: '#f59e0b' },
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
  const [messages, setMessages]       = useState([
    { role: 'assistant', text: "Hi! I'm DeepNova's AI. Choose a mode and ask me anything — I'm ready." },
  ]);
  // Raw conversation history sent to the API (no display labels)
  const [history, setHistory]   = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef  = useRef(null);
  const msgsRef    = useRef(null);
  const inputRef   = useRef(null);
  const mountedRef = useRef(true);

  // Track mounted state to prevent setState after unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = (text ?? searchQuery).trim();
    if (!userText || isLoading) return;

    // Add user message to display
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setSearchQuery('');
    setIsLoading(true);

    // Build API history
    const newHistory = [...history, { role: 'user', content: userText }];
    setHistory(newHistory);

    // AbortController so navigating away cancels the in-flight request
    const controller = new AbortController();

    try {
      const reply = await callAI(activeMode.id, newHistory, controller.signal);
      if (!mountedRef.current) return;
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      setHistory(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      if (!mountedRef.current || err.name === 'AbortError') return;
      const errMsg = err.message || 'Something went wrong. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', text: `⚠️ ${errMsg}` }]);
    } finally {
      if (mountedRef.current) setIsLoading(false);
    }
  };

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      <Navbar />
      <main className="hp-page">

        {/* ════ HERO ════════════════════════════════════════ */}
        <section className="hp-hero">
          {/* animated grid background */}
          <div className="hp-grid-bg" />
          {/* glow orbs */}
          <div className="hp-orb hp-orb-1" style={{ background: activeMode.color }} />
          <div className="hp-orb hp-orb-2" />

          <div className="container hp-hero-inner">
            {/* Left: copy + search */}
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
              <div className="hp-search-bar glass" style={{ '--mc': activeMode.color }}>
                <div className="hp-search-pill" style={{ background: activeMode.color + '22', borderColor: activeMode.color + '66', color: activeMode.color }}>
                  {activeMode.icon} {activeMode.label}
                </div>
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
                <div className="hp-stat glass"><Zap size={16} style={{ color: '#f59e0b' }} /><span>Low latency</span></div>
                <div className="hp-stat glass"><Brain size={16} style={{ color: '#a855f7' }} /><span>128k context</span></div>
                <div className="hp-stat glass"><Globe size={16} style={{ color: '#06b6d4' }} /><span>100+ languages</span></div>
              </div>
            </div>

            {/* Right: live chat panel */}
            <div className="hp-chat-panel glass animate-on-scroll">
              <div className="hp-chat-header">
                <Bot size={18} style={{ color: activeMode.color }} />
                <span>Live Demo — <em style={{ color: activeMode.color }}>{activeMode.label}</em></span>
                <span className="hp-live-dot">● Live</span>
              </div>
              <div className="hp-chat-msgs" ref={msgsRef}>
                {messages.map((m, i) => (
                  <div key={i} className={`hp-msg ${m.role}`}>
                    <div className="hp-avatar" style={m.role === 'assistant'
                      ? { color: activeMode.color, borderColor: activeMode.color + '55', background: activeMode.color + '18' }
                      : {}}>
                      {m.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                    </div>
                    <div className="hp-bubble">{m.text}</div>
                  </div>
                ))}
                {isLoading && (
                  <div className="hp-msg assistant">
                    <div className="hp-avatar" style={{ color: activeMode.color, borderColor: activeMode.color + '55', background: activeMode.color + '18' }}>
                      <Bot size={14} />
                    </div>
                    <div className="hp-bubble hp-typing"><span /><span /><span /></div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
              <div className="hp-chat-input-row">
                <textarea
                  rows={1}
                  className="hp-chat-input"
                  placeholder="Type a message…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={handleKey}
                  disabled={isLoading}
                />
                <button className="hp-chat-send" style={{ background: activeMode.color }}
                  onClick={() => sendMessage()} disabled={isLoading || !searchQuery.trim()}>
                  <Send size={15} />
                </button>
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
