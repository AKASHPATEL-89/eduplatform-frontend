import React, { useState, useEffect } from 'react';

const slides = [
  {
    img: '/images/Teach.jpg',
    title: 'Effective Study Techniques for GATE Preparation',
    desc: 'To effectively prepare for GATE 2026, start early, create a structured study plan, and focus on understanding the syllabus and exam pattern.',
  },
  {
    img: '/images/AI-in-Education.webp',
    title: 'The Future of AI in Education',
    desc: 'AI is set to revolutionize education by enabling personalized learning experiences and automating administrative tasks.',
  },
  {
    img: '/images/teacher.jpg',
    title: 'Last Minute Preparation Tips for GATE ECE',
    desc: 'During the last few days before GATE ECE, do proper revision, go through high weightage topics and solve previous year papers.',
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel" style={{ marginTop: 80 }}>
      <div className="carousel-inner" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((s, i) => (
          <div className="carousel-item" key={i}>
            <img src={s.img} alt={s.title} onError={e => { e.target.src = 'https://via.placeholder.com/1200x500?text=EduPlatform'; }} />
            <div className="carousel-caption">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-btn carousel-prev" onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="carousel-btn carousel-next" onClick={() => setCurrent(c => (c + 1) % slides.length)}>
        <i className="fas fa-chevron-right"></i>
      </button>
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button key={i} className={`carousel-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
        ))}
      </div>
    </div>
  );
}
