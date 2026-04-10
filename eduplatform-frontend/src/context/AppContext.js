import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const AppContext = createContext();

const authHeader = (token) => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });

  const [products, setProducts] = useState([]);
  const [notes, setNotes] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [students, setStudents] = useState([]);
  const [orders, setOrders] = useState([]);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // ── Fetch public data on mount ──
  useEffect(() => {
    fetch(`${API}/notes`).then(r => r.json()).then(setNotes).catch(() => {});
    fetch(`${API}/products`).then(r => r.json()).then(setProducts).catch(() => {});
    fetch(`${API}/blogs`).then(r => r.json()).then(setBlogs).catch(() => {});
  }, []);

  // ── Fetch students when admin logs in ──
  useEffect(() => {
    if (user?.role === 'admin' && token) {
      fetch(`${API}/students`, { headers: authHeader(token) })
        .then(r => r.json()).then(setStudents).catch(() => {});
    }
  }, [user, token]);

  // ── Auth ──
  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null); setToken(null); setCart([]);
    localStorage.removeItem('token'); localStorage.removeItem('user');
  };

  // ── Cart ──
  const addToCart = (product) => {
    setCart(prev => {
      if (prev.find(i => i.id === product.id)) { showToast('Already in cart!', 'info'); return prev; }
      showToast(`"${product.name}" added to cart!`);
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const removeFromCart = (id) => { setCart(prev => prev.filter(i => i.id !== id)); showToast('Item removed', 'info'); };
  const clearCart = () => { setCart([]); showToast('Cart cleared!', 'info'); };
  const placeOrder = (order) => { setOrders(prev => [...prev, { ...order, date: new Date().toISOString() }]); showToast('Order placed!'); };

  // ── Generic CRUD factory ──
  const crud = (resource, setter) => ({
    add: async (body) => {
      const r = await fetch(`${API}/${resource}`, { method: 'POST', headers: authHeader(token), body: JSON.stringify(body) });
      const data = await r.json();
      if (!r.ok) return showToast(data.error, 'error');
      setter(prev => [...prev, data]); showToast('Added!');
    },
    update: async (id, body) => {
      const r = await fetch(`${API}/${resource}/${id}`, { method: 'PUT', headers: authHeader(token), body: JSON.stringify(body) });
      const data = await r.json();
      if (!r.ok) return showToast(data.error, 'error');
      setter(prev => prev.map(x => x.id === id ? data : x)); showToast('Updated!');
    },
    remove: async (id) => {
      const r = await fetch(`${API}/${resource}/${id}`, { method: 'DELETE', headers: authHeader(token) });
      if (!r.ok) return showToast('Delete failed', 'error');
      setter(prev => prev.filter(x => x.id !== id)); showToast('Deleted!', 'info');
    },
  });

  const notesCrud    = crud('notes', setNotes);
  const productsCrud = crud('products', setProducts);
  const blogsCrud    = crud('blogs', setBlogs);
  const studentsCrud = crud('students', setStudents);

  const toastColors = { success: '#28a745', info: '#667eea', error: '#dc3545' };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, clearCart,
      user, token, login, logout,
      products,
      addProduct: productsCrud.add, updateProduct: productsCrud.update, deleteProduct: productsCrud.remove,
      notes,
      addNote: notesCrud.add, updateNote: notesCrud.update, deleteNote: notesCrud.remove,
      blogs,
      addBlog: blogsCrud.add, updateBlog: blogsCrud.update, deleteBlog: blogsCrud.remove,
      students,
      addStudent: studentsCrud.add, updateStudent: studentsCrud.update, deleteStudent: studentsCrud.remove,
      orders, placeOrder,
      showToast,
    }}>
      {children}
      {toast && (
        <div className="toast" style={{ background: toastColors[toast.type] || '#333' }}>
          <i className={`fas fa-${toast.type === 'success' ? 'check-circle' : 'info-circle'}`} style={{ marginRight: 8 }}></i>
          {toast.msg}
        </div>
      )}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
