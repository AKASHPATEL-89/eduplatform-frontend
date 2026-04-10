import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <i className="fas fa-graduation-cap"></i>
              <span>EduPlatform</span>
            </div>
            <p>Your ultimate learning companion for academic success.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/notes">Notes</Link></li>
              <li><Link to="/gate-pyq">GATE PYQ</Link></li>
              <li><Link to="/btech-notes">BTech Notes</Link></li>
              <li><Link to="/videos">Videos</Link></li>
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3>Contact Info</h3>
            <p><i className="fas fa-envelope" style={{ color: '#667eea', marginRight: 8 }}></i> info@eduplatform.com</p>
            <p style={{ marginTop: 8 }}><i className="fas fa-phone" style={{ color: '#667eea', marginRight: 8 }}></i> +91 (555) 123-4567</p>
            <p style={{ marginTop: 8 }}><i className="fas fa-map-marker-alt" style={{ color: '#667eea', marginRight: 8 }}></i> 117/K/87, Sarvodaya Nagar, Kanpur, UP 208005</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 EduPlatform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
