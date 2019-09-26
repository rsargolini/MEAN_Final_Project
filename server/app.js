var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const leaguesRouter = require('./routes/leagues');
const teamsRouter = require('./routes/teams');

var app = express();

// enable CORS
app.use(function (req, res, next)
{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const cors = require('cors');

app.use(cors({
  origin: [
  "http://localhost:4200"
  ],
  credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: "rjs7",
  resave: "true",
  saveUninitialized: "true"
}));

// http://localhost:3000/users
app.use('/users', usersRouter);
// http://localhost:3000/leagues
app.use('/leagues', leaguesRouter);
// http://localhost:3000/teams
app.use('/teams', teamsRouter);

// Catch 404 and forward to Error Handler
app.use(function (req, res, next)
{
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next)
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render Error Page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
