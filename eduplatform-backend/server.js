require('dotenv').config({ override: true });
const express = require('express');
const cors = require('cors');
const { getDb } = require('./db');

async function start() {
  await getDb(); // ensure DB is ready before handling requests

  const app = express();
  app.use(cors({ origin: 'http://localhost:3000' }));
  app.use(express.json());

  app.use('/api/auth',     require('./routes/auth'));
  app.use('/api/notes',    require('./routes/notes'));
  app.use('/api/products', require('./routes/products'));
  app.use('/api/blogs',    require('./routes/blogs'));
  app.use('/api/students', require('./routes/students'));
  app.use('/api/contacts', require('./routes/contacts'));

  app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start().catch(err => { console.error('Failed to start:', err); process.exit(1); });
