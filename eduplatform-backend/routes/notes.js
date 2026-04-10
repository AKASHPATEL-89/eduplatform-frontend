const router = require('express').Router();
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM notes').all());
});

router.post('/', authenticate, authorize('admin'), (req, res) => {
  const { icon, title, desc, subject, level, pdf } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const { lastInsertRowid } = db.prepare(
    'INSERT INTO notes (icon, title, desc, subject, level, pdf) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(icon, title, desc, subject, level, pdf);
  res.status(201).json({ id: lastInsertRowid, icon, title, desc, subject, level, pdf });
});

router.put('/:id', authenticate, authorize('admin'), (req, res) => {
  const { icon, title, desc, subject, level, pdf } = req.body;
  const info = db.prepare(
    'UPDATE notes SET icon=?, title=?, desc=?, subject=?, level=?, pdf=? WHERE id=?'
  ).run(icon, title, desc, subject, level, pdf, req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Note not found' });
  res.json({ id: Number(req.params.id), icon, title, desc, subject, level, pdf });
});

router.delete('/:id', authenticate, authorize('admin'), (req, res) => {
  const info = db.prepare('DELETE FROM notes WHERE id = ?').run(req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Note not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
