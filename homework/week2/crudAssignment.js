// Build a mini-project: Create a RESTful API with at least three resources and routes for each CRUD operation.
const express = require('express');
const app = express();
const users = [];
const passwords = [];
const items = [];
//make a server and endpoint, test with postman
app.use(express.json());

const PORT = 3000;

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send('User Created');
});

app.post('/passwords', (req, res) => {
    const password = req.body;
    passwords.push(password);
    res.status(201).send('Password Created');
});

app.post('/items', (req, res) => {
    const item = req.body;
    items.push(item);
    res.status(201).send('Item Created');
});


app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/passwords', (req, res) => {
    res.json(passwords);
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users.splice(id, 1);
    res.send('User deleted');
});

app.delete('/passwords/:id', (req, res) => {
    const id = parseInt(req.params.id);
    passwords.splice(id, 1);
    res.send('Password deleted');
});

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    items.splice(id, 1);
    res.send('Item deleted');
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUser = req.body;
    users[id] = updatedUser;
    res.send('Users updated');
});

app.put('/passwords/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedPassword = req.body;
    passwords[id] = updatedPassword;
    res.send('Password Updated');
});

app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    items[id] = updatedItem;
    res.send('Item Updated');
});

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});