const dotenv = require('dotenv');
dotenv.config();

// Module Imports
const cookieParser = require("cookie-parser");
const path = require('path'); 
const csrf = require("csurf");
const express = require("express");

// File Imports
const csrfMiddleware = csrf({ cookie: true });
const routes = require('./api/v0/routes');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'api', 'v0', 'views'));

app.engine("html", require("ejs").renderFile);
app.use(express.static("static"));

app.use(express.json());
app.use(cookieParser());
app.use(csrfMiddleware);

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

app.use('/v0/', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/v0/`);
});