import React from 'react';

const branches = [
  { icon: 'fas fa-laptop-code', name: 'Computer Science', code: 'CSE', semesters: [
    { sem: 'Semester 1', subjects: ['Mathematics I', 'Physics', 'C Programming', 'Engineering Drawing'] },
    { sem: 'Semester 2', subjects: ['Mathematics II', 'Chemistry', 'Data Structures', 'Digital Electronics'] },
    { sem: 'Semester 3', subjects: ['Algorithms', 'DBMS', 'Computer Networks', 'Operating Systems'] },
    { sem: 'Semester 4', subjects: ['Software Engineering', 'Theory of Computation', 'Compiler Design', 'AI'] },
  ]},
  { icon: 'fas fa-bolt', name: 'Electrical Engineering', code: 'EE', semesters: [
    { sem: 'Semester 1', subjects: ['Mathematics I', 'Physics', 'Basic Electrical', 'Engineering Drawing'] },
    { sem: 'Semester 2', subjects: ['Mathematics II', 'Circuit Theory', 'Electronics', 'Signals & Systems'] },
    { sem: 'Semester 3', subjects: ['Electrical Machines', 'Power Systems', 'Control Systems', 'Microprocessors'] },
    { sem: 'Semester 4', subjects: ['Power Electronics', 'Instrumentation', 'High Voltage Engg', 'VLSI Design'] },
  ]},
  { icon: 'fas fa-cog', name: 'Mechanical Engineering', code: 'ME', semesters: [
    { sem: 'Semester 1', subjects: ['Mathematics I', 'Physics', 'Engineering Mechanics', 'Workshop'] },
    { sem: 'Semester 2', subjects: ['Mathematics II', 'Thermodynamics', 'Fluid Mechanics', 'Material Science'] },
    { sem: 'Semester 3', subjects: ['Heat Transfer', 'Machine Design', 'Manufacturing', 'Dynamics'] },
    { sem: 'Semester 4', subjects: ['CAD/CAM', 'Refrigeration', 'Industrial Engg', 'Robotics'] },
  ]},
];

export default function BtechNotes() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>BTech Notes</h1>
          <p>Semester-wise notes for all BTech branches</p>
        </div>
      </section>

      {branches.map((branch, bi) => (
        <section key={bi} className={`section ${bi % 2 === 1 ? 'section-light' : ''}`}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div className="card-icon" style={{ flexShrink: 0 }}>
                <i className={branch.icon}></i>
              </div>
              <h2 style={{ margin: 0 }}>{branch.name} ({branch.code})</h2>
            </div>
            <div className="grid-4">
              {branch.semesters.map((s, si) => (
                <div className="semester-card" key={si}>
                  <h3>{s.sem}</h3>
                  <ul className="subject-list">
                    {s.subjects.map((sub, i) => (
                      <li key={i}><a href="#">{sub}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
