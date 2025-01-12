const express = require('express');
const app = express();
const items = []; // Simple in-memory database
const users = [];

//Middleware
app.use(express.json());

//Define Port
const PORT = 3000;

// Create (Post)
app.post('/items', (req, res) => {
    const item = req.body;
    items.push(item);
    res.status(201).send('Item Created');
});

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send('User Created');
});

// Read (GET)
app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/users', (req, res) => {
    res.json(users);
});

// Update (PUT)
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    items[id] = updatedItem;
    res.send('Item updated');
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUser = req.body;
    users[id] = updatedUser;
    res.send('Users updated');
});

// Delete (DELETE)
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    items.splice(id, 1);
    res.send('Item deleted');
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users.splice(id, 1);
    res.send('User deleted');
});

// 
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});