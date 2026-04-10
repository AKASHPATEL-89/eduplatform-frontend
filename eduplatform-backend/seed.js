require('dotenv').config({ override: true });
const bcrypt = require('bcryptjs');
const { getDb, prepare } = require('./db');

async function seed() {
  await getDb();

  // Admin user
  const adminExists = prepare('SELECT id FROM users WHERE email = ?').get('admin@eduplatform.com');
  if (!adminExists) {
    const hash = await bcrypt.hash('admin123', 10);
    prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run('Admin', 'admin@eduplatform.com', hash, 'admin');
    console.log('✅ Admin created: admin@eduplatform.com / admin123');
  }

  // Notes
  if (prepare('SELECT COUNT(*) as c FROM notes').get().c === 0) {
    const notes = [
      ['fas fa-calculator', 'Calculus Fundamentals', 'Complete notes on differential and integral calculus.', 'mathematics', 'intermediate', '/Resourses/Calculus.pdf'],
      ['fas fa-atom', 'Mechanics Basics', 'Introduction to classical mechanics, motion, and forces.', 'physics', 'beginner', '/Resourses/Mechanics Basics.pdf'],
      ['fas fa-flask', 'Organic Chemistry', 'Comprehensive guide to organic compounds and reactions.', 'chemistry', 'intermediate', '/Resourses/Organic chemistry.pdf'],
      ['fas fa-code', 'Data Structures & Algorithms', 'Advanced DSA with complexity analysis.', 'computer-science', 'advanced', '/Resourses/Data Structure.pdf'],
      ['fas fa-bolt', 'Circuit Analysis', "Electrical circuits, Kirchhoff's laws, and network theorems.", 'electrical', 'intermediate', '/Resourses/Circuit Analysis.pdf'],
      ['fas fa-code', 'Python Complete Notes', 'Advanced Python programming.', 'computer-science', 'advanced', '/Resourses/PYTHON PROGRAMMING NOTES.pdf'],
      ['fas fa-code', 'JAVA Complete Notes', 'Advanced Java with Applet, AWT, JDBC and Swings.', 'computer-science', 'advanced', '/Resourses/Java Programming.pdf'],
      ['fas fa-database', 'MySQL Complete Notes', 'MySQL advanced concepts including stored procedures.', 'computer-science', 'advanced', '/Resourses/mySql notes.pdf'],
      ['fas fa-database', 'DBMS Complete Notes', 'Advanced DBMS covering Normalization and Transactions.', 'computer-science', 'advanced', '/Resourses/DBMS series part-1.pdf'],
      ['fas fa-code', 'C++ Complete Notes', 'Advanced C++ covering OOPs and STL.', 'computer-science', 'advanced', '/Resourses/C++ PW.pdf'],
      ['fas fa-paint-brush', 'CSS Complete Notes', 'Advanced CSS covering Flexbox, Grid, and Animations.', 'computer-science', 'advanced', '/Resourses/CSS Notes.pdf'],
      ['fas fa-robot', 'Artificial Intelligence (AI)', 'Advanced AI covering ML, Deep Learning, NLP.', 'computer-science', 'advanced', '/Resourses/AI.pdf'],
      ['fas fa-brain', 'Machine Learning (ML)', 'Advanced ML covering Neural Networks.', 'computer-science', 'advanced', '/Resourses/Machine_Learning.pdf'],
      ['fas fa-code', 'HTML Complete Notes', 'Advanced HTML covering Semantic Tags and APIs.', 'computer-science', 'beginner', '/Resourses/HTML.pdf'],
      ['fas fa-cog', 'Thermodynamics Basics', 'Introduction to thermodynamic principles.', 'mechanical', 'beginner', '/Resourses/Thermodynamics Basics.pdf'],
    ];
    const stmt = prepare('INSERT INTO notes (icon, title, desc, subject, level, pdf) VALUES (?, ?, ?, ?, ?, ?)');
    notes.forEach(n => stmt.run(...n));
    console.log(`✅ ${notes.length} notes seeded`);
  }

  // Products
  if (prepare('SELECT COUNT(*) as c FROM products').get().c === 0) {
    const products = [
      ['Complete GATE CS Preparation Course', 'Comprehensive course covering all GATE CS topics.', '/images/How-to-prepare-for-GATE-CSIT-2025.webp', 'Bestseller', '', '₹499', '₹999', '50% OFF', 4.8, 1234, 'courses', 'under-500'],
      ['Data Structures & Algorithms Handbook', 'Complete reference book with practice problems.', '/images/DataStructureHandbook.jpg', 'New', 'new', '₹399', '₹599', '33% OFF', 4.2, 567, 'books', 'under-500'],
      ['GATE Mock Test Series 2024', '50+ mock tests with detailed analysis.', '/images/GATE-Mock-Test-.gif', 'Popular', 'popular', '₹799', '₹1,299', '38% OFF', 4.9, 2345, 'test-series', '500-1000'],
      ['Mathematics for Engineers', 'Comprehensive mathematics textbook.', '/images/maths.jpg', '', '', '₹450', '', '', 4.1, 234, 'books', 'under-500'],
      ['Scientific Calculator Pro', 'Advanced calculator app.', '/images/scientific.webp', '', '', 'Free', '', '', 4.7, 1567, 'software', 'free'],
      ['Machine Learning Fundamentals', 'Learn ML with hands-on projects.', '/images/The Future of AI in Education.jpg', '', '', '₹699', '₹999', '30% OFF', 4.3, 789, 'courses', '500-1000'],
    ];
    const stmt = prepare('INSERT INTO products (name, desc, img, badge, badgeClass, price, original, discount, rating, reviews, category, priceRange) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
    products.forEach(p => stmt.run(...p));
    console.log(`✅ ${products.length} products seeded`);
  }

  // Blogs
  if (prepare('SELECT COUNT(*) as c FROM blogs').get().c === 0) {
    const blogs = [
      ['Top Career Opportunities After BTech', 'Explore diverse career paths for CS graduates.', '/images/Career_Opportunities_after_BTech.jpg', 'career-guidance', 'Career Guidance', 'December 12, 2024', 'Dr. Sarah Johnson', '/images/Dr. Sarah Johnson.webp', 'https://youtu.be/JJjBPBWaeYU'],
      ['How to Create an Effective Study Schedule', 'Plan your study time efficiently.', '/images/How to Create an Effective Study Schedule.webp', 'study-tips', 'Study Tips', 'December 10, 2024', 'Prof. Michael Chen', '/images/Prof. Michael Chen.webp', 'https://youtu.be/owyESIkhNqA'],
      ['The Future of AI in Education', 'How AI is transforming education.', '/images/The Future of AI in Education.jpg', 'technology', 'Technology', 'December 8, 2024', 'Emily Rodriguez', '/images/Emily Rodriguez.webp', 'https://youtu.be/RyKRcpRSQus'],
    ];
    const stmt = prepare('INSERT INTO blogs (title, excerpt, img, category, categoryLabel, date, author, authorImg, url) VALUES (?,?,?,?,?,?,?,?,?)');
    blogs.forEach(b => stmt.run(...b));
    console.log(`✅ ${blogs.length} blogs seeded`);
  }

  // Students
  if (prepare('SELECT COUNT(*) as c FROM students').get().c === 0) {
    const students = [
      ['Priya Sharma', 'priya@example.com', 'GATE CS', 'Active'],
      ['Rahul Patel', 'rahul@example.com', 'BTech CSE', 'Active'],
      ['Anita Singh', 'anita@example.com', 'GATE ECE', 'Inactive'],
      ['Vikram Kumar', 'vikram@example.com', 'JEE Prep', 'Active'],
      ['Sneha Gupta', 'sneha@example.com', 'GATE CS', 'Active'],
    ];
    const stmt = prepare('INSERT INTO students (name, email, course, status) VALUES (?, ?, ?, ?)');
    students.forEach(s => stmt.run(...s));
    console.log(`✅ ${students.length} students seeded`);
  }

  console.log('🎉 Seed complete!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
