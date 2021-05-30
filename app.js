require("dotenv").config();
const mongoose = require("mongoose");
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const hbs = require('hbs');
const fileUpload = require('express-fileupload');
var methodOverride = require('method-override');

var app = express();
var port = process.env.PORT || 3000;
// Mongo Db connection
mongoose.connect('mongodb+srv://saman:9939105936@cluster0.f3mwv.mongodb.net/monthninetest?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log("DB CONNECTED");
}).catch((err) => {
  console.log(`DB NOT CONNECTED :( `);
});

const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: 'sa3m6an9',
  api_key: '643338921389265',
  api_secret: 'yUlGjfn6VLm1w81VUGfdTUbtxaI'
})


var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(methodOverride('_method'))
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('*', cloudinaryConfig);
app.use(fileUpload({
  useTempFiles : true,
}));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials/');
hbs.registerHelper('isdefined', function (value) {
  return value === 'Login' || value === 'Signup' ;
});
hbs.registerHelper('isUser', function (value) {
  return value === 'User';
});
hbs.registerHelper('isCartContainProducts', function () {
  return value === 'User';
});

app.use('/auth', authRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
module.exports = app;
