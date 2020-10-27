// This is simple sample how to serve static website and save form data to file with NodeJS
// Author: programming mentor
// Usage:
// 0. Initialize package.json
//    npm init -y
// 1. Install dependencies: 
//    npm i express body-parser
// 2. Run server:
//    node server.js
// код, що буде виконуватись на сервері
// це back-end нашої аплікації
const express = require('express'); 
// ф-ція require підключає модуль NodeJS - express
const bodyParser = require('body-parser'); 
// ф-ція require підключає модуль NodeJS - body-parser
const path = require('path'); 
// ф-ція require підключає модуль NodeJS - path
const app = express(); // ініціалізуєм, запускаєм цей процес

app.use(bodyParser.json()); // вик. для розбору запитів
app.use(express.static(path.resolve(__dirname, './'))); 
// показує на сервері весь процес(роботу) html, css, js

app.post('/login', (req, res) => { // аpp код який показує на сервері, коли з 
    // front-end приходить запит типу post на адресу login
  const fs = require('fs'); // з JS (function login(e) { e.preventDefault(); и т.д.), що 
  // буде повертати error чи ні
  fs.appendFile('./logins.txt', JSON.stringify(req.body) + '\n', function(err) {
    if (err) {
      res.status(500).send('Server error');
      return console.log(err);
    }
    console.log('Data saved: ' + JSON.stringify(req.body));
    res.send('Data saved');
  });
});

console.log(
  'Server is running on',
  process.env.PORT || 3000,
  process.env.IP || '0.0.0.0'
);

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');

// git status