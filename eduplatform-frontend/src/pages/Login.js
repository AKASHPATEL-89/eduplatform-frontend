import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, showToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const endpoint = isLogin ? 'login' : 'register';
    const body = isLogin ? { email: form.email, password: form.password }
                         : { name: form.name, email: form.email, password: form.password };
    try {
      const res = await fetch(`${API}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      login(data.user, data.token);
      showToast(`Welcome, ${data.user.name}!`);
      navigate(data.user.role === 'admin' ? '/admin' : '/');
    } catch {
      setError('Server unreachable. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-header">
          <div style={{ fontSize: '3rem', color: '#667eea', marginBottom: '0.5rem' }}>
            <i className="fas fa-graduation-cap"></i>
          </div>
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to continue your learning journey' : 'Join thousands of students on EduPlatform'}</p>
        </div>

        {error && (
          <div style={{ background: '#f8d7da', color: '#721c24', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: '0.9rem' }}>
            <i className="fas fa-exclamation-circle" style={{ marginRight: 8 }}></i>{error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
          )}
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <p>Don't have an account? <a href="#" onClick={e => { e.preventDefault(); setIsLogin(false); setError(''); }}>Sign Up</a></p>
          ) : (
            <p>Already have an account? <a href="#" onClick={e => { e.preventDefault(); setIsLogin(true); setError(''); }}>Sign In</a></p>
          )}
        </div>
      </div>
    </div>
  );
}
