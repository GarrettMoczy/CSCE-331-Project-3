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

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,SET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
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

app.get('/ingredients', (req, res) => {
    pool
        .query('SELECT * FROM ingredients')
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

app.get('/drinks', (req, res) => {
    pool
        .query('SELECT * FROM drinks')
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

//---------------Creating Options---------------//

app.post('/new_menu_option', (req,res) => {
    const {name, price, ingredients} = req.body;
    console.log(req.body);
    pool
        .query("SELECT new_menu_option($1, $2, $3)",[name, parseFloat(price), ingredients])  
        .then(response => {
            res.status(200).send(response);
        })  
})

app.post('/new_add_on', (req,res) => {
    const {name, stock, price, minStock} = req.body;
    console.log(req.body);
    pool
        .query("SELECT new_ingredient($1, $2, $3, $4)",[name, Number(stock), parseFloat(price), Number(minStock)])  
        .then(response => {
            res.status(200).send(response);
        })  
})

app.post('/new_drink', (req,res) => {
    const {size, price} = req.body;
    console.log(req.body);
    pool
        .query("SELECT new_drink_size($1, $2)",[size, parseFloat(price)])  
        .then(response => {
            res.status(200).send(response);
        })  
})

app.post('/new_order', async (req, res) => {
    pool 

    const {cartItemNames, drinkItems, addOns } = req.body;


    let orderId;
    
    const orderIdQuery = "SELECT new_order(1)"
    try{
        const client = await pool.connect();
        const result = await client.query(orderIdQuery)
        orderId = result.rows[0].new_order
        const result2 = await client.query("SELECT complete_order($1, $2, $3, $4)", [orderId, cartItemNames, drinkItems, addOns]);
        res.json({orderId: orderId})
    }
    catch(error){
        console.error("Error creating new order", error)
        res.status(500).json({error: error.message})
    }
}); 

//order id string array menu items string array drink items string array add ons
//---------------Deleting Options---------------//

app.delete('/delete_drink', (req,res) => {
    const {name} = req.body;
    console.log(req.body);
    pool
        .query("SELECT delete_drink($1)",[name])  
        .then(response => {
            res.status(200).send(response);
        })  
})

app.delete('/delete_menu_item', (req,res) => {
    const {name} = req.body;
    console.log(req.body);
    pool
        .query("SELECT delete_menu_item($1)",[name])  
        .then(response => {
            res.status(200).send(response);
        })  
})

app.delete('/delete_ingredient', (req,res) => {
    const {name} = req.body;
    console.log(req.body);
    pool
        .query("SELECT delete_ingredient($1)",[name])  
        .then(response => {
            res.status(200).send(response);
        })  
})

//---------------Update Options---------------//
app.put('/change_stock', (req,res) => {
    const {name, stock} = req.body;
    console.log(req.body);
    pool
        .query("SELECT update_stock($1,$2)", [name, stock])
        .then(response => {
            res.status(200).send(response);
        })  
})

app.put('/change_price', (req,res) => {
    const {name, price} = req.body;
    console.log(req.body);
    pool
        .query("UPDATE menu_item SET price = ($2) WHERE name = ($1)", [name, price])
        .then(response => {
            res.status(200).send(response);
        })  
})



//---------------Temperature option---------------//
    
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
