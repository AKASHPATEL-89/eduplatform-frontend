import React, { useState } from 'react';

const pyqs = [
  { id: 1, year: 2025, title: 'GATE CS 2025 Set-1', questions: 65, duration: '3 hrs', qPdf: '/gate PYQ/GATE-CS-2025-Set-1.pdf', aPdf: '/gate PYQ/GATE-CS-2025-Set-1-Answer-Key.pdf' },
  { id: 2, year: 2024, title: 'GATE CS 2024 Set-1', questions: 65, duration: '3 hrs', qPdf: '/gate PYQ/GATE-CS-2024 set 1.pdf', aPdf: '/gate PYQ/CS 2024 FinalAnswerKey.pdf' },
  { id: 3, year: 2023, title: 'GATE CS 2023', questions: 65, duration: '3 hrs', qPdf: '/gate PYQ/GATE-2023 CS.pdf', aPdf: '/gate PYQ/gate-2023-Answer-Key1.pdf' },
  { id: 4, year: 2022, title: 'GATE CS 2022', questions: 65, duration: '3 hrs', qPdf: '/gate PYQ/GATE-2022-part-1.pdf', aPdf: '/gate PYQ/GATE-2022-Answer key.pdf' },
  { id: 5, year: 2021, title: 'GATE CS 2021', questions: 65, duration: '3 hrs', qPdf: '/gate PYQ/GATE2021_QP_CS-1.pdf', aPdf: '/gate PYQ/2021-CS1-Answer-Keys.pdf' },
  { id: 6, year: 2020, title: 'GATE CS 2020', questions: 65, duration: '3 hrs', qPdf: '/gate PYQ/GATE-CS-2020-Original-Paper.pdf', aPdf: '/gate PYQ/GATE-CS-2020-Official-Keys.pdf' },
  { id: 7, year: 2019, title: 'GATE CS 2019', questions: 65, duration: '3 hrs', qPdf: '/gate PYQ/2019_CS_Paper1.pdf', aPdf: '/gate PYQ/2019-Keys1.pdf' },
  { id: 8, year: 2018, title: 'GATE CS 2018', questions: 65, duration: '3 hrs', qPdf: '/gate PYQ/GATE2018.pdf', aPdf: '/gate PYQ/Keys2018.pdf' },
  { id: 9, year: 2017, title: 'GATE CS 2017', questions: 65, duration: '3 hrs', qPdf: '/gate PYQ/GATE2017-Set-1_.pdf', aPdf: '/gate PYQ/GATE2017-AnswerKey.pdf' },
  { id: 10, year: 2016, title: 'GATE CS 2016', questions: 65, duration: '3 hrs', qPdf: '/gate PYQ/GATE2016-Set-1.pdf', aPdf: '/gate PYQ/2016CS-1_AnsKey.pdf' },
  { id: 11, year: 2015, title: 'GATE CS 2015', questions: 65, duration: '3 hrs', qPdf: '/gate PYQ/GATE2015-Set-1.pdf', aPdf: '/gate PYQ/2015CS_S05_AnswerKey.pdf' },
];

const ecePyqs = [
  { id: 12, year: 2023, title: 'ECE 2023', qPdf: '/ECE pyq/EC 2023 Ques.pdf', aPdf: '/ECE pyq/EC2023 AnswerKEY.pdf' },
  { id: 13, year: 2022, title: 'ECE 2022', qPdf: '/ECE pyq/ECE 2022QUES.pdf', aPdf: '/ECE pyq/2022 ANSWERKEY.pdf' },
  { id: 14, year: 2021, title: 'ECE 2021', qPdf: '/ECE pyq/2021 QUES.pdf', aPdf: '/ECE pyq/2021 ANWERKEY.pdf' },
  { id: 15, year: 2020, title: 'ECE 2020', qPdf: '/ECE pyq/2020 QUES.pdf', aPdf: '/ECE pyq/2020 ANSWER.pdf' },
  { id: 16, year: 2019, title: 'ECE 2019', qPdf: '/ECE pyq/2019 QUES.pdf', aPdf: '/ECE pyq/2019 ANSWER.pdf' },
];

export default function GatePYQ() {
  const [tab, setTab] = useState('cs');
  const list = tab === 'cs' ? pyqs : ecePyqs;

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>GATE Previous Year Questions</h1>
          <p>Practice with actual GATE exam papers and answer keys</p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <button className={`btn ${tab === 'cs' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('cs')}>GATE CS</button>
            <button className={`btn ${tab === 'ece' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('ece')}>GATE ECE</button>
          </div>
          <div className="grid-3">
            {list.map(p => (
              <div className="pyq-card" key={p.id}>
                <div className="pyq-header">
                  <h3>{p.title}</h3>
                  <span className="year-badge">{p.year}</span>
                </div>
                {p.questions && (
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    <i className="fas fa-question-circle" style={{ marginRight: 6 }}></i>{p.questions} Questions &nbsp;
                    <i className="fas fa-clock" style={{ marginRight: 6 }}></i>{p.duration}
                  </p>
                )}
                <div className="pyq-actions">
                  <a href={p.qPdf} target="_blank" rel="noreferrer" className="btn btn-primary">Question Paper</a>
                  <a href={p.aPdf} target="_blank" rel="noreferrer" className="btn btn-secondary">Answer Key</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
