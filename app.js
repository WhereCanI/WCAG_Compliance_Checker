const port = 7005;
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const app = express();
const server = http.createServer(app);
const path = require('path');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const pa11y = require('pa11y');

app.use(helmet.hidePoweredBy({ setTo: 'WCAG Compliance Checker 1.0' }));
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

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

app.post("/runwcag", function(req, res) {
    try {
        let url = req.body.obj.url;
        if (url && url.length >= 1) {
            pa11y(url).then((results) => {
                res.send({
                    status: "Success",
                    message: "",
                    results: results
                });
            });
        } else {
          res.send({
            status: "Error", 
            message: "No url was sent with the form"
          });
        }
    } catch(err) {
        res.send({
          status: "Error", 
          message: "No url was sent with the form"
        });
    }
    
});

server.listen(port, () => console.log(`WCAG Compliance Checker - Running`));