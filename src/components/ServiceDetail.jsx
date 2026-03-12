import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { servicesData } from '../data/ServiceData';
import Navbar from './Navbar';
import Footer from './Footer';
import './ServiceDetail.css';

const ServiceDetail = () => {
  const { id } = useParams();
  
  // Find the matching service from the database
  const service = servicesData.find(s => s.id === id);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // If ID doesn't exist, redirect to home
  if (!service) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <main className="service-detail-page">
        {/* Service Hero Banner */}
        <section 
          className="service-hero" 
          style={{ 
            '--theme-color': service.color,
            background: `linear-gradient(to bottom, rgba(0,0,0,0.8), var(--bg-color)), radial-gradient(circle at top right, ${service.color}33, transparent 50%)`
          }}
        >
          <div className="container">
            <Link to="/#services" className="back-link">
              <ArrowLeft size={18} /> Back to Services
            </Link>
            
            <div className="service-hero-content animate-on-scroll">
              <div className="sd-icon-wrapper" style={{ color: service.color, boxShadow: `0 0 30px ${service.color}66` }}>
                {React.cloneElement(service.icon, { size: 48 })}
              </div>
              <h1 className="sd-title">{service.title}</h1>
              <p className="sd-subtitle">{service.shortDesc}</p>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="sd-details container">
          <div className="sd-main-content animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <div className="sd-text-block glass">
              <h2>Overview</h2>
              <p>{service.fullDesc}</p>
            </div>
            
            <div className="sd-features-block animate-on-scroll" style={{ animationDelay: '0.4s' }}>
              <h2>Key Capabilities</h2>
              <div className="sd-features-grid">
                {service.features.map((feature, idx) => (
                  <div className="sd-feature-item glass" key={idx}>
                    <CheckCircle2 color={service.color} size={24} className="feature-check" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick CTA panel positioned alongside or below */}
          <aside className="sd-cta-panel glass animate-on-scroll" style={{ animationDelay: '0.6s' }}>
            <h3 style={{ color: service.color }}>Ready to build?</h3>
            <p>Our engineering team can evaluate your use-case and architect a custom {service.title} implementation plan.</p>
            <Link to="/#contact" className="btn btn-primary w-100" style={{ backgroundImage: `linear-gradient(135deg, ${service.color}, var(--neon-blue))` }}>
              Get a Free Estimate
            </Link>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetail;
