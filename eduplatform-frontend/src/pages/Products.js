import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function Stars({ rating }) {
  return (
    <span className="stars">
      {[1,2,3,4,5].map(i => (
        <i key={i} className={i <= Math.floor(rating) ? 'fas fa-star' : i - 0.5 <= rating ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
      ))}
    </span>
  );
}

export default function Products() {
  const { addToCart, products: allProducts } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === '' || p.category === category) &&
    (priceRange === '' || p.priceRange === priceRange)
  );

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Educational Products</h1>
          <p>Discover our collection of 100+ educational products and resources</p>
        </div>
      </section>

      <section className="search-filter">
        <div className="container">
          <div className="search-bar">
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
            <button><i className="fas fa-search"></i></button>
          </div>
          <div className="filter-options">
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="books">Books</option>
              <option value="courses">Online Courses</option>
              <option value="software">Software</option>
              <option value="tools">Study Tools</option>
              <option value="test-series">Test Series</option>
            </select>
            <select value={priceRange} onChange={e => setPriceRange(e.target.value)}>
              <option value="">All Prices</option>
              <option value="free">Free</option>
              <option value="under-500">Under ₹500</option>
              <option value="500-1000">₹500 - ₹1000</option>
              <option value="above-1000">Above ₹1000</option>
            </select>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {filtered.map(p => (
              <div className="product-card" key={p.id}>
                <div className="product-image">
                  <img src={p.img} alt={p.name} onError={e => { e.target.src = 'https://via.placeholder.com/400x200?text=Product'; }} />
                  {p.badge && <span className={`product-badge ${p.badgeClass}`}>{p.badge}</span>}
                </div>
                <div className="product-content">
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{p.name}</h3>
                  <p style={{ color: '#666', fontSize: '0.875rem' }}>{p.desc}</p>
                  <div className="product-rating">
                    <Stars rating={p.rating} />
                    <span>({p.rating}) {p.reviews.toLocaleString()} reviews</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">{p.price}</span>
                    {p.original && <span className="original-price">{p.original}</span>}
                    {p.discount && <span className="discount">{p.discount}</span>}
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => addToCart({ id: p.id, name: p.name, price: p.price })}>
                    {p.price === 'Free' ? 'Download' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>No products found.</p>}
        </div>
      </section>
    </>
  );
}
