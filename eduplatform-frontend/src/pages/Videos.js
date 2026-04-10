import React from 'react';

const videos = [
  { id: 1, title: 'GATE CS 2025 Complete Preparation', channel: 'EduPlatform', duration: '2:30:00', views: '45K', thumb: '/images/How-to-prepare-for-GATE-CSIT-2025.webp', url: 'https://www.youtube.com/live/xAiqAbGtxYw' },
  { id: 2, title: 'Data Structures Full Course', channel: 'EduPlatform', duration: '4:15:00', views: '120K', thumb: '/images/DataStructureHandbook.jpg', url: 'https://youtu.be/JJjBPBWaeYU' },
  { id: 3, title: 'DBMS Complete Course', channel: 'EduPlatform', duration: '3:45:00', views: '89K', thumb: '/images/DBMS.jpg', url: 'https://youtu.be/owyESIkhNqA' },
  { id: 4, title: 'Operating Systems Concepts', channel: 'EduPlatform', duration: '5:00:00', views: '67K', thumb: '/images/operatingSystem.webp', url: 'https://youtu.be/RyKRcpRSQus' },
  { id: 5, title: 'Theory of Computation', channel: 'EduPlatform', duration: '3:20:00', views: '34K', thumb: '/images/TOC.jpg', url: 'https://www.youtube.com/live/4_ccH31PAHY' },
  { id: 6, title: 'Machine Learning Crash Course', channel: 'EduPlatform', duration: '6:00:00', views: '200K', thumb: '/images/AI Images.jpg', url: 'https://youtu.be/kJOqIaGwQ7Y' },
];

export default function Videos() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Video Lectures</h1>
          <p>High-quality video content from expert educators</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {videos.map(v => (
              <a href={v.url} target="_blank" rel="noreferrer" key={v.id} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={v.thumb}
                      alt={v.title}
                      className="card-img"
                      onError={e => { e.target.src = 'https://via.placeholder.com/400x200?text=Video'; }}
                    />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 60, height: 60, background: 'rgba(0,0,0,0.7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem' }}>
                      <i className="fas fa-play"></i>
                    </div>
                    <span style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.8)', color: 'white', padding: '3px 8px', borderRadius: 4, fontSize: '0.8rem' }}>{v.duration}</span>
                  </div>
                  <div className="card-body">
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#333' }}>{v.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>
                      <i className="fas fa-user" style={{ marginRight: 6 }}></i>{v.channel} &nbsp;
                      <i className="fas fa-eye" style={{ marginRight: 6 }}></i>{v.views} views
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
