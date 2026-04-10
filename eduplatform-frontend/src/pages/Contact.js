import React, { useState } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch(`${API}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    } catch {
      setError('Server unreachable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our team for any queries or support</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Send us a Message</h2>
              {sent && <div style={{ background: '#d4edda', color: '#155724', padding: '1rem', borderRadius: 8, marginBottom: '1rem' }}><i className="fas fa-check-circle" style={{ marginRight: 8 }}></i>Message sent successfully! We'll get back to you soon.</div>}
              {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: 8, marginBottom: '1rem' }}><i className="fas fa-exclamation-circle" style={{ marginRight: 8 }}></i>{error}</div>}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="John" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required>
                    <option value="">Select a subject</option>
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Course Information</option>
                    <option>Billing</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows="5" placeholder="Your message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px' }} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Contact Information</h2>
              <div className="contact-info-item">
                <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div>
                  <h4>Address</h4>
                  <p style={{ color: '#666' }}>117/K/87, Sarvodaya Nagar Road, Sarvodaya Nagar, Kanpur, Uttar Pradesh 208005</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon"><i className="fas fa-phone"></i></div>
                <div>
                  <h4>Phone</h4>
                  <p style={{ color: '#666' }}>+91 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                <div>
                  <h4>Email</h4>
                  <p style={{ color: '#666' }}>info@eduplatform.com</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon"><i className="fas fa-clock"></i></div>
                <div>
                  <h4>Support Hours</h4>
                  <p style={{ color: '#666' }}>24/7 Online Support Available</p>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Follow Us</h4>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {['fab fa-facebook', 'fab fa-twitter', 'fab fa-instagram', 'fab fa-linkedin', 'fab fa-youtube'].map((icon, i) => (
                    <a key={i} href="#" style={{ width: 45, height: 45, background: '#f8f9fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#667eea', fontSize: '1.1rem', transition: 'all 0.3s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#667eea'; e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#f8f9fa'; e.currentTarget.style.color = '#667eea'; }}>
                      <i className={icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
