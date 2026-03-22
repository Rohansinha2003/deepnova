import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import './ContactCTA.css';

const ContactCTA = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!import.meta.env.VITE_SUPABASE_URL) {
        throw new Error("Supabase is not configured yet. Please enter your env variables.");
      }

      const { error: submitError } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message
        }]);

      if (submitError) {
        throw submitError;
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-cta section">
      <div className="cta-background">
        <div className="glow-orb purple small"></div>
      </div>
      <div className="container">
        <div className="cta-wrapper glass animate-on-scroll">
          <div className="cta-content">
            <h2 className="cta-title">Start building with AI <span className="gradient-text">today.</span></h2>
            <p className="cta-desc">
              Ready to transform your business? Request a free consultation and let's discuss how customized AI solutions can accelerate your growth.
            </p>
            <div className="cta-info">
              <div className="info-item">
                <span className="info-label">Email Us</span>
                <span className="info-value">ai.deepnova@gmail.com</span>
              </div>
              <div className="info-item">
                <span className="info-label">Call Us</span>
                <span className="info-value">+91 9709569770</span>
              </div>
            </div>
          </div>

          <div className="cta-form-container">
            {submitted ? (
              <div className="success-message">
                <h3>Message Received!</h3>
                <p>We've received your inquiry and will review your details shortly.</p>
                <button className="btn btn-secondary mt-2" onClick={() => setSubmitted(false)}>Send Another</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {error && <div style={{ color: '#ff4c4c', marginBottom: '1rem' }}>{error}</div>}
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Tell us about your project or AI needs..."
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                  {loading ? 'Submitting...' : 'Request AI Solution'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
