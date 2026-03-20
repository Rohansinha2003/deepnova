import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const close = () => setMobileMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo" onClick={close}>
          <Cpu className="logo-icon" size={28} />
          <span className="logo-text">DeepNova <span className="gradient-text">AI</span></span>
        </Link>

        <ul className={`nav-links ${mobileMenuOpen ? 'active glass' : ''}`}>
          <li>
            <Link to="/" className={isActive('/') ? 'nav-active' : ''} onClick={close}>Home</Link>
          </li>
          <li>
            <Link to="/who-we-are" className={isActive('/who-we-are') ? 'nav-active' : ''} onClick={close}>Who We Are</Link>
          </li>
          <li>
            <a href="/who-we-are#contact" className="btn btn-primary btn-nav" onClick={close}>Contact Us</a>
          </li>
        </ul>

        <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
