const router = require('express').Router();
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

// Public — anyone can submit a contact message
router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: 'name, email and message are required' });
  const { lastInsertRowid } = db.prepare(
    'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)'
  ).run(name, email, subject, message);
  res.status(201).json({ id: lastInsertRowid, name, email, subject, message });
});

// Admin only — view all messages
router.get('/', authenticate, authorize('admin'), (req, res) => {
  res.json(db.prepare('SELECT * FROM contacts ORDER BY id DESC').all());
});

// Admin only — delete a message
router.delete('/:id', authenticate, authorize('admin'), (req, res) => {
  const info = db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Message not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
