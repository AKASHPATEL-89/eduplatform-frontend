import React from 'react';

const team = [
  { name: 'Dr. Akash Singh', role: 'Founder & CEO', bio: 'PhD in Computer Science with 15+ years of experience in educational technology.', img: '/images/akash.jpg', social: ['fab fa-linkedin', 'fab fa-twitter'] },
  { name: 'Prof. Swati Patel', role: 'Chief Academic Officer', bio: 'Former professor at MIT with expertise in mathematics and engineering education.', img: '/images/Swati.webp', social: ['fab fa-linkedin', 'fab fa-twitter'] },
  { name: 'Dr. Abhay Patel', role: 'Head of Content', bio: "Master's in Education with specialization in curriculum development and instructional design.", img: '/images/Abhay.webp', social: ['fab fa-linkedin', 'fab fa-twitter'] },
  { name: 'Developer Akash Singh', role: 'Lead Developer', bio: 'Full-stack developer with expertise in building scalable educational platforms.', img: '/images/akash.jpg', social: ['fab fa-linkedin', 'fab fa-github'] },
];

const values = [
  { icon: 'fas fa-heart', title: 'Excellence', desc: 'We strive for excellence in everything we do, from content creation to user experience.' },
  { icon: 'fas fa-users', title: 'Accessibility', desc: 'Making quality education accessible to students from all backgrounds and locations.' },
  { icon: 'fas fa-lightbulb', title: 'Innovation', desc: 'Continuously innovating to provide cutting-edge learning solutions and technologies.' },
  { icon: 'fas fa-handshake', title: 'Integrity', desc: 'Maintaining the highest standards of integrity and transparency in all our operations.' },
];

const testimonials = [
  { text: '"EduPlatform has been instrumental in my GATE preparation. The comprehensive notes and practice tests helped me achieve a top rank."', name: 'Priya Sharma', role: 'GATE CS Topper 2024', img: '/images/Priya Sharma.webp' },
  { text: '"The video lectures are excellent and the study materials are well-organized. It made my BTech journey much easier."', name: 'Rahul Patel', role: 'BTech CSE Student', img: '/images/Rahul_Patel.webp' },
  { text: '"Amazing platform with quality content. The 24/7 support team is always ready to help with any queries."', name: 'Anita Singh', role: 'Engineering Student', img: '/images/Anita Singh.webp' },
];

const stats = [
  { value: '10,000+', label: 'Active Students' }, { value: '500+', label: 'Courses Available' },
  { value: '100+', label: 'Educational Products' }, { value: '50+', label: 'Partner Universities' },
  { value: '95%', label: 'Student Satisfaction' }, { value: '24/7', label: 'Support Available' },
];

export default function About() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>About EduPlatform</h1>
          <p>Empowering students with quality education and resources</p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: '1rem' }}>Our Mission</h2>
              <p style={{ color: '#666' }}>At EduPlatform, we believe that quality education should be accessible to everyone. Our mission is to provide comprehensive learning resources, expert guidance, and innovative tools that empower students to achieve their academic goals.</p>
              <p style={{ color: '#666' }}>We are committed to bridging the gap between traditional education and modern learning needs by offering a diverse range of study materials, interactive content, and personalized learning experiences.</p>
            </div>
            <div style={{ textAlign: 'center', fontSize: '10rem', color: '#667eea', opacity: 0.2 }}>
              <i className="fas fa-bullseye"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-light">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="grid-4">
            {values.map((v, i) => (
              <div className="value-card" key={i}>
                <div className="value-icon"><i className={v.icon}></i></div>
                <h3 style={{ marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="grid-4">
            {team.map((m, i) => (
              <div className="team-member" key={i}>
                <div className="member-image">
                  <img src={m.img} alt={m.name} onError={e => { e.target.src = 'https://via.placeholder.com/120'; }} />
                </div>
                <h3 style={{ marginBottom: '0.25rem' }}>{m.name}</h3>
                <p className="member-role">{m.role}</p>
                <p style={{ color: '#666', fontSize: '0.875rem' }}>{m.bio}</p>
                <div className="member-social">
                  {m.social.map((s, j) => <a href="#" key={j}><i className={s}></i></a>)}
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

      {/* Testimonials */}
      <section className="section section-light">
        <div className="container">
          <h2 className="section-title">What Our Students Say</h2>
          <div className="grid-3">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-content"><p>{t.text}</p></div>
                <div className="testimonial-author">
                  <img src={t.img} alt={t.name} onError={e => { e.target.src = 'https://via.placeholder.com/50'; }} />
                  <div className="author-info">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
