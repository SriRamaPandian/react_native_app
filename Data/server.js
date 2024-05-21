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
    const query = "UPDATE Profiles SET courses = JSON_ARRAY(?) WHERE rollno = ?;";
    connection.query(query, [
      req.body.arr,
      req.body.rollno,
      ], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
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

  app.get('/uploadedvideos', (req, res) => {    
               
    const query = "SELECT video_name,video_link,views,likes FROM videos WHERE rollno = ?;";
    connection.query(query, [req.query.rollno], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/main1', (req, res) => {    
               
    const query = "SELECT c.courses,v.video_name,v.video_link,v.video_id from courses c,profiles p,Videos v where JSON_CONTAINS(p.courses,CONCAT('\"',c.courses,'\"')) <> \"NULL\" AND p.rollno=? AND c.sem=(SELECT sem FROM profiles WHERE rollno = ?) AND c.dept_name=(SELECT dept_name FROM profiles WHERE rollno = ?) AND v.course_id=c.course_id;";
    connection.query(query, [req.query.rollno,req.query.rollno,req.query.rollno], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/main2', (req, res) => {    
               
    const query = "SELECT c.courses,v.video_name,v.video_link,v.video_id from courses c,profiles p,Videos v where JSON_CONTAINS(p.courses,CONCAT('\"',c.courses,'\"')) = \"NULL\" AND p.rollno=? AND c.sem=(SELECT sem FROM profiles WHERE rollno = ?) AND c.dept_name=(SELECT dept_name FROM profiles WHERE rollno = ?) AND v.course_id=c.course_id;";
    connection.query(query, [req.query.rollno,req.query.rollno,req.query.rollno], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/search', (req, res) => {    
    const searchterm = req.query.search;         
    const query = "SELECT v.video_id,v.video_name,v.video_link FROM Videos v JOIN Courses c ON v.course_id=c.course_id WHERE v.video_link LIKE ? OR c.courses LIKE ? ORDER BY v.video_name;";
    const searchpattern = '%' + searchterm + '%';
    connection.query(query, [searchpattern,searchpattern], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/profile', (req, res) => {               
    const query = "SELECT SUBSTRING(username, 1, 1) AS first_letter, username, email,dept_name,years,courses FROM Profiles WHERE rollno = ?;";
    connection.query(query, [req.query.rollno], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/display1', (req, res) => {    
               
    const query = "SELECT video_link,video_name,attachments,descriptions,views,likes FROM Videos WHERE video_id = ?;";
    connection.query(query, [req.query.id], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/display2', (req, res) => {    
               
    const query = "SELECT video_link,video_name,video_id FROM Videos WHERE video_id <> ? AND course_id IN (SELECT c.course_id FROM Courses c,Profiles p WHERE p.dept_name = c.dept_name AND p.rollno=?);";
    connection.query(query, [req.query.id,req.query.rollno], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/final', (req, res) => {               
    const query = "SELECT username FROM Profiles WHERE rollno=?;";
    connection.query(query, [req.query.rollno], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
      }
    });
  });

  app.post('/liked', (req, res) => {
    const query = "UPDATE Videos SET likes = liked(?) WHERE video_id = ?";
    connection.query(query, [
      req.body.id,
      req.body.id,
      ], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json({ message: 'liked' });
      }
    });
  });

  app.post('/notliked', (req, res) => {
    const query = "UPDATE Videos SET likes = notliked(?) WHERE video_id = ?";
    connection.query(query, [
      req.body.id,
      req.body.id,
      ], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json({ message: 'notliked' });
      }
    });
  });

  app.post('/views', (req, res) => {
    const query = "UPDATE Videos SET views = views(?) WHERE video_id = ?";
    connection.query(query, [
      req.body.id,
      req.body.id,
      ], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json({ message: 'views' });
      }
    });
  });

  app.post('/watchlater', (req, res) => {
    const query = "CALL watchlater(?,?);";
    connection.query(query, [
      req.body.id,
      req.body.roll,
      ], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json({ message: 'successfully added in watchlater' });
      }
    });
  });

  app.post('/feedback', (req, res) => {
    const query = "CALL feedback(?,?,?);";
    connection.query(query, [
      req.body.id,
      req.body.roll,
      req.body.FeedBack,
      ], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json({ message: 'successfully added feedback' });
      }
    });
  });

  app.get('/drawer/watchlater', (req, res) => {            
    const query = "SELECT v.video_id,v.video_name,v.video_link FROM Videos v JOIN WatchLater w ON v.video_id=w.video_id WHERE w.rollno = ? ORDER BY v.video_name;";
    connection.query(query, [req.query.rollno], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
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
