import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Notes() {
  const { notes } = useApp();
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) &&
    (subject === '' || n.subject === subject) &&
    (level === '' || n.level === level)
  );

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Study Notes</h1>
          <p>Comprehensive notes for all subjects and courses</p>
        </div>
      </section>

      <section className="search-filter">
        <div className="container">
          <div className="search-bar">
            <input type="text" placeholder="Search notes..." value={search} onChange={e => setSearch(e.target.value)} />
            <button><i className="fas fa-search"></i></button>
          </div>
          <div className="filter-options">
            <select value={subject} onChange={e => setSubject(e.target.value)}>
              <option value="">All Subjects</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="computer-science">Computer Science</option>
              <option value="electrical">Electrical Engineering</option>
              <option value="mechanical">Mechanical Engineering</option>
            </select>
            <select value={level} onChange={e => setLevel(e.target.value)}>
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {filtered.map(n => (
              <div className="note-card" key={n.id}>
                <div className="card-icon" style={{ marginBottom: '1rem' }}>
                  <i className={n.icon}></i>
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>{n.title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>{n.desc}</p>
                <div className="note-meta">
                  <span>{n.subject.replace('-', ' ')}</span>
                  <span>{n.level}</span>
                </div>
                <div className="note-actions">
                  <a href={n.pdf} download className="btn btn-primary">Download PDF</a>
                  <a href={n.pdf} target="_blank" rel="noreferrer" className="btn btn-secondary">Preview</a>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>No notes found.</p>}
        </div>
      </section>
    </>
  );
}
