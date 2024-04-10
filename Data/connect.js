const fs = require('fs');
const pool = require('./pool');

// Read the SQL file
const sql = fs.readFileSync('sam.sql').toString();

// Execute the SQL query to create the users table
pool.query(sql, (error, results) => {
  if (error) {
    console.error('Error executing query: ', error);
    return;
  }
  console.log('Users table created successfully');
});