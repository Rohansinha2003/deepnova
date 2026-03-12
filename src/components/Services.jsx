import React from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/ServiceData';
import './Services.css';

const Services = () => {
  return (
    <section id="services" className="services section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">Our <span className="gradient-text">Services</span></h2>
          <p className="section-subtitle">
            Comprehensive AI engineering to transform your business operations and product offerings. Click any service to learn more.
          </p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <Link 
              to={`/services/${service.id}`}
              className="service-card glass animate-on-scroll" 
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="service-icon-wrapper" style={{ color: service.color }}>
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.shortDesc}</p>
              <div className="card-click-indicator">
                <span style={{ color: service.color }}>Explore Details →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
