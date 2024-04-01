const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

// Create express app
const app = express();
const port = 3000;


// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

app.set("view engine", "ejs");

app.get('/menu_items', (req, res) => {
    pool
        .query('SELECT * FROM menu_item')
        .then((query_res) => {
            if (query_res.rows.length === 0) {
                res.status(404).json({ error: 'No menu items found' });
            } 
            else {
              res.json(query_res.rows);
            }
        })
        .catch((error) => {
            console.error('Error executing the SQL query:', error);
            res.status(500).json({ error: error.message });
        });
});
    
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});