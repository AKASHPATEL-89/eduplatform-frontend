import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const NAV = [
  { label: 'Dashboard',  icon: 'tachometer-alt' },
  { label: 'Students',   icon: 'users' },
  { label: 'Notes',      icon: 'file-alt' },
  { label: 'Products',   icon: 'shopping-cart' },
  { label: 'Blog Posts', icon: 'blog' },
  { label: 'Contacts',   icon: 'envelope' },
  { label: 'Analytics',  icon: 'chart-bar' },
  { label: 'Settings',   icon: 'cog' },
];

const STATUS_STYLE = (s) => ({
  background: s === 'Active' ? '#d4edda' : '#f8d7da',
  color: s === 'Active' ? '#155724' : '#721c24',
  padding: '3px 10px', borderRadius: 15, fontSize: '0.8rem',
});

const inputStyle = {
  width: '100%', padding: '9px 12px', border: '2px solid #e9ecef',
  borderRadius: 8, fontSize: '0.95rem', fontFamily: 'inherit', marginBottom: 10,
};

const EMPTY_STUDENT = { name: '', email: '', course: '', status: 'Active' };
const EMPTY_NOTE    = { icon: 'fas fa-file-alt', title: '', desc: '', subject: 'computer-science', level: 'beginner', pdf: '' };
const EMPTY_PRODUCT = { name: '', desc: '', img: '', badge: '', price: '', original: '', discount: '', rating: 0, reviews: 0, category: 'courses', priceRange: 'under-500' };
const EMPTY_BLOG    = { title: '', excerpt: '', img: '', category: 'technology', categoryLabel: 'Technology', date: '', author: '', authorImg: '', url: '' };

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: '2rem', width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#666' }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ActionBtn({ onClick, color, icon, label }) {
  return (
    <button onClick={onClick} style={{ background: color, color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: '0.8rem', marginRight: 6 }}>
      <i className={`fas fa-${icon}`} style={{ marginRight: 4 }}></i>{label}
    </button>
  );
}

// ── Dashboard ──────────────────────────────────────────────────
function Dashboard({ students, notes, products, blogs }) {
  const stats = [
    { label: 'Students',  value: students.length, icon: 'fas fa-users' },
    { label: 'Notes',     value: notes.length,    icon: 'fas fa-file-alt' },
    { label: 'Products',  value: products.length, icon: 'fas fa-shopping-cart' },
    { label: 'Blog Posts',value: blogs.length,    icon: 'fas fa-blog' },
  ];
  return (
    <>
      <div className="admin-stats">
        {stats.map((s, i) => (
          <div className="admin-stat-card" key={i}>
            <i className={s.icon} style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
            <h3>{s.value}</h3>
            <p style={{ opacity: 0.9, margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>
      <h3 style={{ marginBottom: '1rem' }}>Recent Students</h3>
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Course</th><th>Status</th></tr></thead>
          <tbody>
            {students.slice(0, 5).map((u, i) => (
              <tr key={i}>
                <td>{u.name}</td><td>{u.email}</td><td>{u.course}</td>
                <td><span style={STATUS_STYLE(u.status)}>{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ── Students Tab ───────────────────────────────────────────────
function StudentsTab() {
  const { students, addStudent, updateStudent, deleteStudent } = useApp();
  const [modal, setModal] = useState(null); // null | { mode:'add'|'edit', data }
  const [form, setForm] = useState(EMPTY_STUDENT);
  const [search, setSearch] = useState('');

  const open = (mode, data = EMPTY_STUDENT) => { setModal({ mode }); setForm(data); };
  const close = () => setModal(null);
  const save = () => {
    if (!form.name || !form.email) return;
    modal.mode === 'add' ? addStudent(form) : updateStudent(form.id, form);
    close();
  };
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <input placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, flex: 1, minWidth: 200, marginBottom: 0 }} />
        <button className="btn btn-primary" onClick={() => open('add')}>
          <i className="fas fa-plus" style={{ marginRight: 6 }}></i>Add Student
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Course</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td><td>{u.email}</td><td>{u.course}</td><td>{u.date}</td>
                <td><span style={STATUS_STYLE(u.status)}>{u.status}</span></td>
                <td>
                  <ActionBtn onClick={() => open('edit', u)} color="#667eea" icon="edit" label="Edit" />
                  <ActionBtn onClick={() => deleteStudent(u.id)} color="#dc3545" icon="trash" label="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add Student' : 'Edit Student'} onClose={close}>
          {['name','email','course'].map(f => (
            <input key={f} style={inputStyle} placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
              value={form[f] || ''} onChange={e => setForm({ ...form, [f]: e.target.value })} />
          ))}
          <select style={inputStyle} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option>Active</option><option>Inactive</option>
          </select>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={close}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Save</button>
          </div>
        </Modal>
      )}
    </>
  );
}

// ── Notes Tab ──────────────────────────────────────────────────
function NotesTab() {
  const { notes, addNote, updateNote, deleteNote } = useApp();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_NOTE);

  const open = (mode, data = EMPTY_NOTE) => { setModal({ mode }); setForm(data); };
  const close = () => setModal(null);
  const save = () => {
    if (!form.title) return;
    modal.mode === 'add' ? addNote(form) : updateNote(form.id, form);
    close();
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button className="btn btn-primary" onClick={() => open('add')}>
          <i className="fas fa-plus" style={{ marginRight: 6 }}></i>Add Note
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Subject</th><th>Level</th><th>PDF</th><th>Actions</th></tr></thead>
          <tbody>
            {notes.map(n => (
              <tr key={n.id}>
                <td>{n.title}</td><td>{n.subject}</td><td>{n.level}</td>
                <td>{n.pdf ? <a href={n.pdf} target="_blank" rel="noreferrer" style={{ color: '#667eea' }}>View</a> : '—'}</td>
                <td>
                  <ActionBtn onClick={() => open('edit', n)} color="#667eea" icon="edit" label="Edit" />
                  <ActionBtn onClick={() => deleteNote(n.id)} color="#dc3545" icon="trash" label="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add Note' : 'Edit Note'} onClose={close}>
          <input style={inputStyle} placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input style={inputStyle} placeholder="Description" value={form.desc || ''} onChange={e => setForm({ ...form, desc: e.target.value })} />
          <input style={inputStyle} placeholder="PDF path (e.g. /Resourses/file.pdf)" value={form.pdf || ''} onChange={e => setForm({ ...form, pdf: e.target.value })} />
          <select style={inputStyle} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
            {['computer-science','mathematics','physics','chemistry','electrical','mechanical'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select style={inputStyle} value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={close}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Save</button>
          </div>
        </Modal>
      )}
    </>
  );
}

// ── Products Tab ───────────────────────────────────────────────
function ProductsTab() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_PRODUCT);

  const open = (mode, data = EMPTY_PRODUCT) => { setModal({ mode }); setForm(data); };
  const close = () => setModal(null);
  const save = () => {
    if (!form.name) return;
    modal.mode === 'add' ? addProduct(form) : updateProduct(form.id, form);
    close();
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button className="btn btn-primary" onClick={() => open('add')}>
          <i className="fas fa-plus" style={{ marginRight: 6 }}></i>Add Product
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Rating</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td><td>{p.category}</td><td>{p.price}</td>
                <td><i className="fas fa-star" style={{ color: '#ffd43b', marginRight: 4 }}></i>{p.rating}</td>
                <td>
                  <ActionBtn onClick={() => open('edit', p)} color="#667eea" icon="edit" label="Edit" />
                  <ActionBtn onClick={() => deleteProduct(p.id)} color="#dc3545" icon="trash" label="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add Product' : 'Edit Product'} onClose={close}>
          {['name','desc','img','price','original','discount'].map(f => (
            <input key={f} style={inputStyle} placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
              value={form[f] || ''} onChange={e => setForm({ ...form, [f]: e.target.value })} />
          ))}
          <input style={inputStyle} placeholder="Badge (e.g. Bestseller)" value={form.badge || ''} onChange={e => setForm({ ...form, badge: e.target.value })} />
          <select style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {['courses','books','test-series','software','tools'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input style={inputStyle} type="number" placeholder="Rating (0-5)" value={form.rating || 0}
            onChange={e => setForm({ ...form, rating: parseFloat(e.target.value) })} />
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={close}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Save</button>
          </div>
        </Modal>
      )}
    </>
  );
}

// ── Blog Posts Tab ─────────────────────────────────────────────
function BlogsTab() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useApp();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_BLOG);

  const open = (mode, data = EMPTY_BLOG) => { setModal({ mode }); setForm(data); };
  const close = () => setModal(null);
  const save = () => {
    if (!form.title) return;
    modal.mode === 'add' ? addBlog(form) : updateBlog(form.id, form);
    close();
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button className="btn btn-primary" onClick={() => open('add')}>
          <i className="fas fa-plus" style={{ marginRight: 6 }}></i>Add Blog Post
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Category</th><th>Author</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {blogs.map(b => (
              <tr key={b.id}>
                <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</td>
                <td><span style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: 12, fontSize: '0.8rem' }}>{b.categoryLabel || b.category}</span></td>
                <td>{b.author}</td><td>{b.date}</td>
                <td>
                  <ActionBtn onClick={() => open('edit', b)} color="#667eea" icon="edit" label="Edit" />
                  <ActionBtn onClick={() => deleteBlog(b.id)} color="#dc3545" icon="trash" label="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add Blog Post' : 'Edit Blog Post'} onClose={close}>
          <input style={inputStyle} placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input style={inputStyle} placeholder="Excerpt" value={form.excerpt || ''} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
          <input style={inputStyle} placeholder="Image path" value={form.img || ''} onChange={e => setForm({ ...form, img: e.target.value })} />
          <input style={inputStyle} placeholder="Author" value={form.author || ''} onChange={e => setForm({ ...form, author: e.target.value })} />
          <input style={inputStyle} placeholder="Date (e.g. December 12, 2024)" value={form.date || ''} onChange={e => setForm({ ...form, date: e.target.value })} />
          <input style={inputStyle} placeholder="URL / Link" value={form.url || ''} onChange={e => setForm({ ...form, url: e.target.value })} />
          <select style={inputStyle} value={form.category} onChange={e => {
            const labels = { technology: 'Technology', 'study-tips': 'Study Tips', 'career-guidance': 'Career Guidance', 'exam-prep': 'Exam Prep', 'student-life': 'Student Life' };
            setForm({ ...form, category: e.target.value, categoryLabel: labels[e.target.value] || e.target.value });
          }}>
            {['technology','study-tips','career-guidance','exam-prep','student-life'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={close}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Save</button>
          </div>
        </Modal>
      )}
    </>
  );
}

// ── Contacts Tab ──────────────────────────────────────────────
function ContactsTab() {
  const { token } = useApp();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/contacts`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => { setContacts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  const remove = async (id) => {
    await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${token}` }
    });
    setContacts(prev => prev.filter(c => c.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  if (loading) return <p style={{ color: '#999' }}>Loading messages...</p>;
  if (!contacts.length) return (
    <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
      <i className="fas fa-inbox" style={{ fontSize: '3rem', opacity: 0.3, display: 'block', marginBottom: 12 }}></i>
      No contact messages yet.
    </div>
  );

  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.subject || '—'}</td>
                <td style={{ fontSize: '0.82rem', color: '#888' }}>{c.created_at?.slice(0, 16).replace('T', ' ')}</td>
                <td>
                  <ActionBtn onClick={() => setSelected(c)} color="#667eea" icon="eye" label="View" />
                  <ActionBtn onClick={() => remove(c.id)} color="#dc3545" icon="trash" label="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && (
        <Modal title={`Message from ${selected.name}`} onClose={() => setSelected(null)}>
          <p style={{ marginBottom: 6 }}><strong>Email:</strong> {selected.email}</p>
          <p style={{ marginBottom: 6 }}><strong>Subject:</strong> {selected.subject || '—'}</p>
          <p style={{ marginBottom: 6 }}><strong>Date:</strong> {selected.created_at?.slice(0, 16).replace('T', ' ')}</p>
          <div style={{ background: '#f8f9fa', borderRadius: 8, padding: '1rem', marginTop: 10, lineHeight: 1.7, color: '#444' }}>
            {selected.message}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
            <button className="btn btn-secondary" onClick={() => setSelected(null)}>Close</button>
            <button className="btn btn-primary" style={{ background: '#dc3545', border: 'none' }} onClick={() => remove(selected.id)}>Delete</button>
          </div>
        </Modal>
      )}
    </>
  );
}

// ── Analytics Tab ──────────────────────────────────────────────
function AnalyticsTab({ students, notes, products, blogs }) {
  const active   = students.filter(s => s.status === 'Active').length;
  const inactive = students.length - active;
  const cats     = products.reduce((acc, p) => { acc[p.category] = (acc[p.category] || 0) + 1; return acc; }, {});
  const blogCats = blogs.reduce((acc, b) => { acc[b.categoryLabel || b.category] = (acc[b.categoryLabel || b.category] || 0) + 1; return acc; }, {});

  const Bar = ({ label, value, max, color }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.9rem' }}>
        <span>{label}</span><span style={{ fontWeight: 600 }}>{value}</span>
      </div>
      <div style={{ background: '#e9ecef', borderRadius: 8, height: 10 }}>
        <div style={{ width: `${max ? (value / max) * 100 : 0}%`, background: color, height: '100%', borderRadius: 8, transition: 'width 0.5s' }} />
      </div>
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
      <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '1.5rem' }}>
        <h4 style={{ marginBottom: '1rem', color: '#333' }}>Student Status</h4>
        <Bar label="Active"   value={active}   max={students.length} color="#28a745" />
        <Bar label="Inactive" value={inactive} max={students.length} color="#dc3545" />
      </div>
      <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '1.5rem' }}>
        <h4 style={{ marginBottom: '1rem', color: '#333' }}>Products by Category</h4>
        {Object.entries(cats).map(([k, v]) => <Bar key={k} label={k} value={v} max={products.length} color="#667eea" />)}
      </div>
      <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '1.5rem' }}>
        <h4 style={{ marginBottom: '1rem', color: '#333' }}>Blog by Category</h4>
        {Object.entries(blogCats).map(([k, v]) => <Bar key={k} label={k} value={v} max={blogs.length} color="#764ba2" />)}
      </div>
      <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '1.5rem' }}>
        <h4 style={{ marginBottom: '1rem', color: '#333' }}>Content Overview</h4>
        <Bar label="Notes"    value={notes.length}    max={Math.max(notes.length, products.length, blogs.length, students.length)} color="#fd7e14" />
        <Bar label="Products" value={products.length} max={Math.max(notes.length, products.length, blogs.length, students.length)} color="#20c997" />
        <Bar label="Blogs"    value={blogs.length}    max={Math.max(notes.length, products.length, blogs.length, students.length)} color="#e83e8c" />
        <Bar label="Students" value={students.length} max={Math.max(notes.length, products.length, blogs.length, students.length)} color="#17a2b8" />
      </div>
    </div>
  );
}

// ── Settings Tab ───────────────────────────────────────────────
function SettingsTab() {
  const { user, logout } = useApp();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ siteName: 'EduPlatform', email: user?.email || '', notifications: true, maintenance: false });

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div style={{ maxWidth: 520 }}>
      <h4 style={{ marginBottom: '1rem' }}>Site Settings</h4>
      <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Site Name</label>
      <input style={inputStyle} value={form.siteName} onChange={e => setForm({ ...form, siteName: e.target.value })} />

      <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Admin Email</label>
      <input style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <input type="checkbox" id="notif" checked={form.notifications} onChange={e => setForm({ ...form, notifications: e.target.checked })} />
        <label htmlFor="notif">Email Notifications</label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <input type="checkbox" id="maint" checked={form.maintenance} onChange={e => setForm({ ...form, maintenance: e.target.checked })} />
        <label htmlFor="maint">Maintenance Mode</label>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={save}>
          <i className="fas fa-save" style={{ marginRight: 6 }}></i>Save Settings
        </button>
        <button className="btn btn-secondary" onClick={logout} style={{ borderColor: '#dc3545', color: '#dc3545' }}>
          <i className="fas fa-sign-out-alt" style={{ marginRight: 6 }}></i>Logout
        </button>
      </div>
      {saved && <p style={{ color: '#28a745', marginTop: 12 }}><i className="fas fa-check-circle" style={{ marginRight: 6 }}></i>Settings saved!</p>}
    </div>
  );
}

// ── Main Admin Component ───────────────────────────────────────
export default function Admin() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const { students, notes, products, blogs } = useApp();

  const renderTab = () => {
    switch (activeNav) {
      case 'Dashboard':  return <Dashboard students={students} notes={notes} products={products} blogs={blogs} />;
      case 'Students':   return <StudentsTab />;
      case 'Notes':      return <NotesTab />;
      case 'Products':   return <ProductsTab />;
      case 'Blog Posts': return <BlogsTab />;
      case 'Contacts':   return <ContactsTab />;
      case 'Analytics':  return <AnalyticsTab students={students} notes={notes} products={products} blogs={blogs} />;
      case 'Settings':   return <SettingsTab />;
      default:           return null;
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>
          <i className="fas fa-cog" style={{ color: '#dc3545', marginRight: 10 }}></i>Admin Panel
        </h1>
        <div className="admin-grid">
          <div className="admin-sidebar">
            <h3><i className="fas fa-graduation-cap"></i> EduPlatform</h3>
            <ul className="admin-nav">
              {NAV.map(({ label, icon }) => (
                <li key={label}>
                  <a className={activeNav === label ? 'active' : ''} onClick={() => setActiveNav(label)}>
                    <i className={`fas fa-${icon}`} style={{ marginRight: 8 }}></i>{label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="admin-content">
            <h2 style={{ marginBottom: '1.5rem' }}>{activeNav}</h2>
            {renderTab()}
          </div>
        </div>
      </div>
    </div>
  );
}
