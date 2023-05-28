require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const sqlite3 = require('sqlite3').verbose();

// Add body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const port = process.env.PORT || 9000;

// Create SQLite database connection
const db = new sqlite3.Database('./address_book.db'); // Replace with your desired database file name or path

// Create 'contacts' table
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, address TEXT)');
});

// List all contacts
app.get('/contacts', (req, res) => {
  const query = 'SELECT * FROM contacts';
  db.all(query, (error, rows) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
    res.json(rows);
  });
});

// Create a new contact
app.post('/create_contact', (req, res) => {
  const { name, phone, address } = req.body;
  const query = 'INSERT INTO contacts (name, phone, address) VALUES (?, ?, ?)';
  db.run(query, [name, phone, address], function (error) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
    const id = this.lastID;
    res.json({ id, name, phone, address });
  });
});

// Update a contact
app.put('/update_contact/:id', (req, res) => {
  const { id } = req.params;
  const { name, phone, address } = req.body;
  const query = 'UPDATE contacts SET name = ?, phone = ?, address = ? WHERE id = ?';
  db.run(query, [name, phone, address, id], function (error) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ id, name, phone, address });
  });
});

// Delete a contact
app.delete('/delete_contact/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM contacts WHERE id = ?';
  db.run(query, [id], function (error) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Address book app listening at http://localhost:${port}`);
});
