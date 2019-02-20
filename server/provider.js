const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

const todos = [];
let id = 0;

server.post('/api/todo', (req, res) => {
  id++;
  const newTodo = { ...req.body, id };
  todos.push(newTodo);
  res.status(201);
  res.set('Content-Type', 'application/json');
  res.json(newTodo);
});

module.exports = {
  server
};
