const port = 7005;
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const app = express();
const server = http.createServer(app);
const path = require('path');

app.use(helmet.hidePoweredBy({ setTo: 'WCAG Compliance Checker 1.0' }));
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(express.static(path.join(__dirname, './public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
});

app.get("/", function(req, res) {
    res.render("index.html");
});

server.listen(port, () => console.log(`WCAG Compliance Checker - Running`));