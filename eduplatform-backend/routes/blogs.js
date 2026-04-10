const router = require('express').Router();
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM blogs').all());
});

router.post('/', authenticate, authorize('admin'), (req, res) => {
  const { title, excerpt, img, category, categoryLabel, date, author, authorImg, url } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const { lastInsertRowid } = db.prepare(
    'INSERT INTO blogs (title, excerpt, img, category, categoryLabel, date, author, authorImg, url) VALUES (?,?,?,?,?,?,?,?,?)'
  ).run(title, excerpt, img, category, categoryLabel, date, author, authorImg, url);
  res.status(201).json({ id: lastInsertRowid, ...req.body });
});

router.put('/:id', authenticate, authorize('admin'), (req, res) => {
  const { title, excerpt, img, category, categoryLabel, date, author, authorImg, url } = req.body;
  const info = db.prepare(
    'UPDATE blogs SET title=?,excerpt=?,img=?,category=?,categoryLabel=?,date=?,author=?,authorImg=?,url=? WHERE id=?'
  ).run(title, excerpt, img, category, categoryLabel, date, author, authorImg, url, req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Blog not found' });
  res.json({ id: Number(req.params.id), ...req.body });
});

router.delete('/:id', authenticate, authorize('admin'), (req, res) => {
  const info = db.prepare('DELETE FROM blogs WHERE id = ?').run(req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Blog not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
