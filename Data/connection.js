const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'E_Learn_db'
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });

  app.post('/login', (req, res) => {
  
    const query = "INSERT INTO users (username,email) VALUES (?,?);";
    connection.query(query, [req.body.name,req.body.email], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json({ message: 'Data inserted successfully' });
      }
    });
  });

  /*app.post('/login', (req, res) => {               // use for all query just change /login!!!
  
    const query = "INSERT INTO users (username,email) VALUES (?,?);";
    connection.query(query, [req.body.name,req.body.email], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json({ message: 'Data inserted successfully' });
      }
    });
  });*/
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
