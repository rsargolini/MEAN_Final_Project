var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const leaguesRouter = require('./routes/leagues');
const filterTeamsRouter = require('./routes/filterteams');
const teamsRouter = require('./routes/teams');
const detailsTeamRouter = require('./routes/detailsteam');
const newTeamRouter = require('./routes/newteam');
const newPlayerRouter = require('./routes/newplayer');
const editProfileRouter = require('./routes/editprofile');
const adminRouter = require('./routes/admin');

var app = express();

// Register HBS Partials
hbs.registerPartials(__dirname + '/views/partials');

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// HBS Partial Helper
hbs.registerHelper('getCurrentYear', () =>
{
    return new Date().getFullYear();
});

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "rjs7",
  resave: "true",
  saveUninitialized: "true"
}));

// http://localhost:3000
app.use('/', indexRouter);
// http://localhost:3000/users
app.use('/users', usersRouter);
// http://localhost:3000/leagues
app.use('/leagues', leaguesRouter);
// http://localhost:3000/filterteams
app.use('/filterteams', filterTeamsRouter);
// http://localhost:3000/teams
app.use('/teams', teamsRouter);
// http://localhost:3000/detailsteam
app.use('/detailsteam', detailsTeamRouter);
// http://localhost:3000/newteam
app.use('/newteam', newTeamRouter);
// http://localhost:3000/newplayer
app.use('/newplayer', newPlayerRouter);
// http://localhost:3000/editprofile
app.use('/editprofile', editProfileRouter);
// http://localhost:3000/admin
app.use('/admin', adminRouter);

// Catch 404 and forward to Error Handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render Error Page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
