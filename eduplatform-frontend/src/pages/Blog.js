import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const categories = ['all', 'study-tips', 'career-guidance', 'technology', 'exam-prep', 'student-life'];

export default function Blog() {
  const { blogs: posts } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = posts.filter(p =>
    (activeCategory === 'all' || p.category === activeCategory) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>EduPlatform Blog</h1>
          <p>Latest insights, tips, and updates from the world of education</p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section">
        <div className="container">
          <div className="featured-post-grid">
            <div className="featured-post-img">
              <img src="/images/10 Effective Study Techniques for GATE Preparation.jpg" alt="Featured" onError={e => { e.target.src = 'https://via.placeholder.com/600x400?text=Featured'; }} />
              <span className="featured-badge">Featured</span>
            </div>
            <div className="featured-post-text">
              <div className="post-meta">
                <span className="category-badge">Study Tips</span>
                <span className="date">December 15, 2024</span>
              </div>
              <h2 style={{ marginBottom: '1rem' }}>10 Effective Study Techniques for GATE Preparation</h2>
              <p style={{ color: '#666', marginBottom: '1.5rem' }}>Discover proven study techniques that can help you excel in your GATE preparation. From time management to effective note-taking, learn the strategies that top performers use.</p>
              <a href="https://www.youtube.com/live/xAiqAbGtxYw" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ color: 'white' }}>Read More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="section-light" style={{ padding: '30px 0' }}>
        <div className="container">
          <div className="search-bar" style={{ maxWidth: 500 }}>
            <input type="text" placeholder="Search blog posts..." value={search} onChange={e => setSearch(e.target.value)} />
            <button><i className="fas fa-search"></i></button>
          </div>
          <div className="category-tags">
            {categories.map(c => (
              <button key={c} className={`tag ${activeCategory === c ? 'active' : ''}`} onClick={() => setActiveCategory(c)}>
                {c === 'all' ? 'All' : c.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {filtered.map(p => (
              <div className="blog-card" key={p.id}>
                <div className="blog-image">
                  <img src={p.img} alt={p.title} onError={e => { e.target.src = 'https://via.placeholder.com/400x200?text=Blog'; }} />
                </div>
                <div className="blog-content">
                  <div className="post-meta">
                    <span className="category-badge">{p.categoryLabel}</span>
                    <span className="date">{p.date}</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{p.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.875rem' }}>{p.excerpt}</p>
                  <div className="blog-footer">
                    <div className="author">
                      <img src={p.authorImg} alt={p.author} onError={e => { e.target.src = 'https://via.placeholder.com/30'; }} />
                      <span>{p.author}</span>
                    </div>
                    <a href={p.url} target="_blank" rel="noreferrer" className="read-more">Read More <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>No posts found.</p>}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter to get the latest blog posts and educational insights.</p>
          <form className="newsletter-form" onSubmit={e => { e.preventDefault(); alert('Subscribed!'); }}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
