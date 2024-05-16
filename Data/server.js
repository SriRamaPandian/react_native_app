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
  
    const query = "INSERT INTO Profiles (rollno,username,email,passwords,years,sem,dept_name) VALUES (?,?,?,?,?,?,?);";
    connection.query(query, [
      req.body.rollno,
      req.body.username,
      req.body.email,
      req.body.password,
      req.body.year,
      req.body.sem,
      req.body.dept], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json({ message: 'User registered successfully' });
      }
    });
  });

  app.get('/course', (req, res) => {    
               
    const query = "SELECT courses FROM Courses WHERE dept_name=(SELECT dept_name FROM Profiles WHERE rollno=?) AND sem=(SELECT sem FROM Profiles WHERE rollno=?);";
    connection.query(query, [req.query.rollno,req.query.rollno], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
      }
    });
  });

  app.post('/mulcourse', (req, res) => {
    const a = req.body.arr;
    const query = "UPDATE Profiles SET courses = JSON_ARRAY(?) WHERE rollno = ?;";
    connection.query(query, [
      req.body.arr,
      req.body.rollno,
      ], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        console.log(a);
        res.json({ message: 'successfully inserted' });
      }
    });
  });

  app.post('/uri', (req, res) => {
    const query = "INSERT INTO Videos (course_id,rollno,video_name,video_link,attachments,descriptions) VALUES (?,?,?,?,?,?)";
    connection.query(query, [  
      req.body.cname,
      req.body.roll,
      req.body.vname,
      req.body.viduri,
      req.body.imguri,
      req.body.description,
      ], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json({ message: 'Uri inserted successfully' });
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
