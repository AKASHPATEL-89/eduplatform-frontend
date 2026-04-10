import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';

const features = [
  { icon: 'fas fa-file-alt', color: '#667eea', title: 'Comprehensive Notes', desc: 'Access detailed notes for all subjects, organized by topics and difficulty levels.' },
  { icon: 'fas fa-question-circle', color: '#51cf66', title: 'GATE PYQs', desc: 'Previous year questions with detailed solutions to help you prepare for competitive exams.' },
  { icon: 'fas fa-play-circle', color: '#339af0', title: 'Video Lectures', desc: 'High-quality video content from expert educators to enhance your learning experience.' },
  { icon: 'fas fa-graduation-cap', color: '#ffd43b', title: 'BTech Resources', desc: 'Complete semester-wise notes and materials for all BTech branches.' },
  { icon: 'fas fa-shopping-cart', color: '#ff6b6b', title: '100+ Products', desc: 'Wide range of educational products including books, courses, and study materials.' },
  { icon: 'fas fa-mobile-alt', color: '#868e96', title: 'Mobile Friendly', desc: 'Access your learning materials anytime, anywhere with our responsive design.' },
];

const stats = [
  { value: '10,000+', label: 'Students' },
  { value: '500+', label: 'Courses' },
  { value: '100+', label: 'Products' },
  { value: '50+', label: 'Universities' },
];

export default function Home() {
  return (
    <>
      <Carousel />

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <h1>Your Ultimate Learning Platform</h1>
              <p>Access comprehensive study materials, GATE PYQs, BTech notes, video lectures, and 100+ educational products all in one place.</p>
              <div className="hero-buttons">
                <Link to="/login" className="btn btn-primary" style={{ color: 'white' }}>Get Started</Link>
                <Link to="/about" className="btn-outline-white">Learn More</Link>
              </div>
            </div>
            <div className="hero-icon">
              <i className="fas fa-book-open"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section-light">
        <div className="container">
          <h2 className="section-title">Why Choose EduPlatform?</h2>
          <div className="grid-3">
            {features.map((f, i) => (
              <div className="card" key={i}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <div className="card-icon" style={{ background: f.color, margin: '0 auto 1.5rem' }}>
                    <i className={f.icon}></i>
                  </div>
                  <h3 style={{ marginBottom: '0.75rem' }}>{f.title}</h3>
                  <p style={{ color: '#666', margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-item" key={i}>
                <h2>{s.value}</h2>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of students who are already using EduPlatform to achieve their academic goals.</p>
          <Link to="/login" className="btn btn-primary" style={{ color: 'white', fontSize: '1.1rem', padding: '15px 40px' }}>Join Now</Link>
        </div>
      </section>
    </>
  );
}
