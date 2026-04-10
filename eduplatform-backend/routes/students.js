const router = require('express').Router();
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, authorize('admin'), (req, res) => {
  res.json(db.prepare('SELECT * FROM students').all());
});

router.post('/', authenticate, authorize('admin'), (req, res) => {
  const { name, email, course, status = 'Active' } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
  try {
    const { lastInsertRowid } = db.prepare(
      'INSERT INTO students (name, email, course, status) VALUES (?, ?, ?, ?)'
    ).run(name, email, course, status);
    res.status(201).json({ id: lastInsertRowid, name, email, course, status });
  } catch {
    res.status(409).json({ error: 'Email already exists' });
  }
});

router.put('/:id', authenticate, authorize('admin'), (req, res) => {
  const { name, email, course, status } = req.body;
  const info = db.prepare(
    'UPDATE students SET name=?, email=?, course=?, status=? WHERE id=?'
  ).run(name, email, course, status, req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Student not found' });
  res.json({ id: Number(req.params.id), name, email, course, status });
});

router.delete('/:id', authenticate, authorize('admin'), (req, res) => {
  const info = db.prepare('DELETE FROM students WHERE id = ?').run(req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Student not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
