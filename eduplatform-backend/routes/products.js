const router = require('express').Router();
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM products').all());
});

router.post('/', authenticate, authorize('admin'), (req, res) => {
  const { name, desc, img, badge, badgeClass, price, original, discount, rating, reviews, category, priceRange } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const { lastInsertRowid } = db.prepare(
    'INSERT INTO products (name, desc, img, badge, badgeClass, price, original, discount, rating, reviews, category, priceRange) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
  ).run(name, desc, img, badge, badgeClass, price, original, discount, rating, reviews, category, priceRange);
  res.status(201).json({ id: lastInsertRowid, ...req.body });
});

router.put('/:id', authenticate, authorize('admin'), (req, res) => {
  const { name, desc, img, badge, badgeClass, price, original, discount, rating, reviews, category, priceRange } = req.body;
  const info = db.prepare(
    'UPDATE products SET name=?,desc=?,img=?,badge=?,badgeClass=?,price=?,original=?,discount=?,rating=?,reviews=?,category=?,priceRange=? WHERE id=?'
  ).run(name, desc, img, badge, badgeClass, price, original, discount, rating, reviews, category, priceRange, req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Product not found' });
  res.json({ id: Number(req.params.id), ...req.body });
});

router.delete('/:id', authenticate, authorize('admin'), (req, res) => {
  const info = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Product not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
