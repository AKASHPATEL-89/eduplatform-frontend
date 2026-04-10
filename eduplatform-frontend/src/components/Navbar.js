import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const { cart, removeFromCart, clearCart, user, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const cartRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setCartOpen(false);
    setMenuOpen(false);
    setStudyOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) setCartOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const cartTotal = cart.reduce((sum, item) => {
    const p = parseFloat((item.price || '').replace(/[₹,]/g, '')) || 0;
    return sum + p;
  }, 0);

  const navLinks = [
    { to: '/', label: 'Home', icon: 'fas fa-home' },
    { to: '/videos', label: 'Videos', icon: 'fas fa-play-circle' },
    { to: '/products', label: 'Products', icon: 'fas fa-shopping-bag' },
    { to: '/about', label: 'About', icon: 'fas fa-info-circle' },
    { to: '/blog', label: 'Blog', icon: 'fas fa-blog' },
    { to: '/contact', label: 'Contact', icon: 'fas fa-envelope' },
  ];

  const studyLinks = [
    { to: '/notes', label: 'Notes', icon: 'fas fa-file-alt' },
    { to: '/gate-pyq', label: 'GATE PYQ', icon: 'fas fa-question-circle' },
    { to: '/btech-notes', label: 'BTech Notes', icon: 'fas fa-graduation-cap' },
  ];

  return (
    <>
      <nav style={{
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
        fontFamily: "'Poppins', sans-serif",
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>

          {/* ── Logo ── */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1.4rem', color: '#667eea', textDecoration: 'none' }}>
            <i className="fas fa-graduation-cap" style={{ fontSize: '1.6rem' }}></i>
            <span>EduPlatform</span>
          </Link>

          {/* ── Desktop Menu ── */}
          <ul style={{ display: 'flex', listStyle: 'none', alignItems: 'center', gap: '0', margin: 0, padding: 0 }} className="desktop-nav">
            {navLinks.map(l => (
              <li key={l.to}>
                <Link to={l.to} style={{
                  padding: '8px 12px', borderRadius: 8, fontWeight: 500, fontSize: '0.9rem',
                  color: isActive(l.to) ? '#667eea' : '#444',
                  background: isActive(l.to) ? 'rgba(102,126,234,0.1)' : 'transparent',
                  textDecoration: 'none', transition: 'all 0.2s', display: 'block',
                }}
                  onMouseEnter={e => { if (!isActive(l.to)) { e.currentTarget.style.color = '#667eea'; e.currentTarget.style.background = 'rgba(102,126,234,0.07)'; } }}
                  onMouseLeave={e => { if (!isActive(l.to)) { e.currentTarget.style.color = '#444'; e.currentTarget.style.background = 'transparent'; } }}
                >{l.label}</Link>
              </li>
            ))}

            {/* Study Materials Dropdown */}
            <li style={{ position: 'relative' }}
              onMouseEnter={e => e.currentTarget.querySelector('.study-drop').style.display = 'block'}
              onMouseLeave={e => e.currentTarget.querySelector('.study-drop').style.display = 'none'}
            >
              <span style={{ padding: '8px 12px', borderRadius: 8, fontWeight: 500, fontSize: '0.9rem', color: '#444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#667eea'; e.currentTarget.style.background = 'rgba(102,126,234,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#444'; e.currentTarget.style.background = 'transparent'; }}
              >
                Study Materials <i className="fas fa-chevron-down" style={{ fontSize: '0.7rem' }}></i>
              </span>
              <div className="study-drop" style={{ display: 'none', position: 'absolute', top: '100%', left: 0, background: 'white', borderRadius: 12, boxShadow: '0 10px 40px rgba(0,0,0,0.15)', minWidth: 200, padding: '0.5rem', zIndex: 1100, border: '1px solid #f0f0f0' }}>
                {studyLinks.map(s => (
                  <Link key={s.to} to={s.to} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, color: '#444', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(102,126,234,0.08)'; e.currentTarget.style.color = '#667eea'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#444'; }}
                  >
                    <i className={s.icon} style={{ color: '#667eea', width: 18 }}></i> {s.label}
                  </Link>
                ))}
              </div>
            </li>

          </ul>

          {/* ── Right Side: Cart + Auth + Hamburger ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>

            {/* Cart Button */}
            <div ref={cartRef} style={{ position: 'relative' }}>
              <button onClick={() => setCartOpen(!cartOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: 8, borderRadius: 10, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(102,126,234,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <i className="fas fa-shopping-cart" style={{ fontSize: '1.3rem', color: '#667eea' }}></i>
                {cart.length > 0 && (
                  <span style={{ position: 'absolute', top: 2, right: 2, background: 'linear-gradient(135deg,#667eea,#764ba2)', color: 'white', borderRadius: '50%', width: 18, height: 18, fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Cart Panel */}
              {cartOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, width: 340, background: 'white', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.18)', zIndex: 2000, overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                  <div style={{ background: 'linear-gradient(135deg,#667eea,#764ba2)', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>
                      <i className="fas fa-shopping-cart" style={{ marginRight: 8 }}></i>My Cart ({cart.length})
                    </span>
                    <button onClick={() => setCartOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: 26, height: 26, borderRadius: '50%', cursor: 'pointer', fontSize: '0.8rem' }}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>

                  <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {cart.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
                        <i className="fas fa-shopping-bag" style={{ fontSize: '2.5rem', opacity: 0.25, display: 'block', marginBottom: 10 }}></i>
                        <p style={{ margin: '0 0 8px' }}>Your cart is empty</p>
                        <Link to="/products" onClick={() => setCartOpen(false)} style={{ color: '#667eea', fontSize: '0.85rem' }}>Browse Products →</Link>
                      </div>
                    ) : cart.map((item, i) => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < cart.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {item.img
                            ? <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                            : null}
                          <i className="fas fa-book" style={{ color: 'white', fontSize: '0.9rem', display: item.img ? 'none' : 'flex' }}></i>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.82rem', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                          <p style={{ margin: 0, color: '#667eea', fontWeight: 700, fontSize: '0.82rem' }}>{item.price}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: '#fff0f0', border: 'none', color: '#dc3545', width: 28, height: 28, borderRadius: '50%', cursor: 'pointer', fontSize: '0.75rem', flexShrink: 0 }}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    ))}
                  </div>

                  {cart.length > 0 && (
                    <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0', background: '#fafafa' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span style={{ color: '#666', fontWeight: 500, fontSize: '0.9rem' }}>Total:</span>
                        <span style={{ fontWeight: 700, color: '#333' }}>{cartTotal > 0 ? `₹${cartTotal.toLocaleString()}` : 'Free'}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={clearCart} style={{ flex: 1, padding: '9px', border: '2px solid #e9ecef', background: 'white', borderRadius: 8, cursor: 'pointer', color: '#666', fontWeight: 500, fontSize: '0.82rem' }}>Clear All</button>
                        <button onClick={() => { setCartOpen(false); navigate('/cart'); }}
                          style={{ flex: 2, padding: '9px', border: 'none', background: 'linear-gradient(135deg,#667eea,#764ba2)', color: 'white', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>
                          <i className="fas fa-bolt" style={{ marginRight: 5 }}></i>Checkout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Auth — desktop only */}
            <div className="desktop-nav">
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.85rem', color: '#667eea', fontWeight: 600 }}>
                    <i className="fas fa-user-circle" style={{ marginRight: 4 }}></i>{user.name}
                  </span>
                  <button onClick={logout} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '7px 14px', borderRadius: 20, cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>Logout</button>
                </div>
              ) : (
                <Link to="/login" style={{ background: 'linear-gradient(135deg,#667eea,#764ba2)', color: 'white', padding: '8px 20px', borderRadius: 25, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>Login</Link>
              )}
            </div>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, display: 'none', flexDirection: 'column', gap: 5 }}>
              <span style={{ display: 'block', width: 24, height: 2.5, background: '#333', borderRadius: 2, transition: '0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
              <span style={{ display: 'block', width: 24, height: 2.5, background: '#333', borderRadius: 2, transition: '0.3s', opacity: menuOpen ? 0 : 1 }}></span>
              <span style={{ display: 'block', width: 24, height: 2.5, background: '#333', borderRadius: 2, transition: '0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Overlay ── */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1100, backdropFilter: 'blur(2px)' }} />
      )}

      {/* ── Mobile Drawer ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '100vh', width: 290,
        background: 'white', zIndex: 1200, overflowY: 'auto',
        transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: menuOpen ? '4px 0 30px rgba(0,0,0,0.15)' : 'none',
        fontFamily: "'Poppins', sans-serif",
      }}>
        {/* Drawer Header */}
        <div style={{ background: 'linear-gradient(135deg,#667eea,#764ba2)', padding: '20px 20px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'white', fontWeight: 700, fontSize: '1.2rem' }}>
              <i className="fas fa-graduation-cap"></i> EduPlatform
            </div>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-user" style={{ color: 'white' }}></i>
              </div>
              <div>
                <p style={{ color: 'white', fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>{user.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '0.75rem' }}>{user.email}</p>
              </div>
            </div>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} style={{ display: 'inline-block', background: 'white', color: '#667eea', padding: '8px 20px', borderRadius: 20, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
              <i className="fas fa-sign-in-alt" style={{ marginRight: 6 }}></i>Login / Register
            </Link>
          )}
        </div>

        {/* Drawer Links */}
        <div style={{ padding: '12px 0' }}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '13px 20px',
              color: isActive(l.to) ? '#667eea' : '#444',
              background: isActive(l.to) ? 'rgba(102,126,234,0.08)' : 'transparent',
              textDecoration: 'none', fontWeight: isActive(l.to) ? 600 : 500, fontSize: '0.95rem',
              borderLeft: isActive(l.to) ? '3px solid #667eea' : '3px solid transparent',
              transition: 'all 0.2s',
            }}>
              <i className={l.icon} style={{ width: 20, color: isActive(l.to) ? '#667eea' : '#888', textAlign: 'center' }}></i>
              {l.label}
            </Link>
          ))}

          {/* Study Materials Accordion */}
          <div>
            <button onClick={() => setStudyOpen(!studyOpen)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '13px 20px', background: 'none', border: 'none', cursor: 'pointer', color: '#444', fontWeight: 500, fontSize: '0.95rem', textAlign: 'left' }}>
              <i className="fas fa-book-open" style={{ width: 20, color: '#888', textAlign: 'center' }}></i>
              Study Materials
              <i className="fas fa-chevron-down" style={{ marginLeft: 'auto', fontSize: '0.75rem', transition: '0.3s', transform: studyOpen ? 'rotate(180deg)' : 'none' }}></i>
            </button>
            {studyOpen && (
              <div style={{ background: '#f8f9fa', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
                {studyLinks.map(s => (
                  <Link key={s.to} to={s.to} onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 20px 11px 54px', color: isActive(s.to) ? '#667eea' : '#555', textDecoration: 'none', fontSize: '0.9rem', fontWeight: isActive(s.to) ? 600 : 400 }}>
                    <i className={s.icon} style={{ color: '#667eea', width: 16 }}></i> {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#f0f0f0', margin: '8px 20px' }}></div>

          {/* Cart in drawer */}
          <Link to="/cart" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 20px', color: '#444', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>
            <i className="fas fa-shopping-cart" style={{ width: 20, color: '#888', textAlign: 'center' }}></i>
            Cart
            {cart.length > 0 && <span style={{ marginLeft: 'auto', background: 'linear-gradient(135deg,#667eea,#764ba2)', color: 'white', borderRadius: 12, padding: '2px 8px', fontSize: '0.75rem', fontWeight: 700 }}>{cart.length}</span>}
          </Link>

          {/* Logout in drawer */}
          {user && (
            <button onClick={() => { logout(); setMenuOpen(false); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '13px 20px', background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545', fontWeight: 600, fontSize: '0.95rem', textAlign: 'left' }}>
              <i className="fas fa-sign-out-alt" style={{ width: 20, textAlign: 'center' }}></i> Logout
            </button>
          )}
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .hamburger-btn { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}
