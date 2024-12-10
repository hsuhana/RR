var configs = require("./configs/globals");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require("express-session");
var passport = require("passport");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//mongodb
var mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var membersRouter = require('./routes/members');
var reservationRouter = require('./routes/reservations');
var authRouter = require('./routes/auth');

var cors = require('cors');

var Member = require('./models/member');

var app = express();

app.use(logger('dev'));
// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "secretSession",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to `true` if using HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

//mongodb and login setting
app.use(passport.initialize());
app.use(passport.session());

passport.use(Member.createStrategy());
// Set passport to write/read user data to/from session object
passport.serializeUser(Member.serializeUser());
passport.deserializeUser(Member.deserializeUser());

app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/reservations', reservationRouter);
app.use('/auth', authRouter);


app.use(cors());

//Vercel change
// Serve React Static Files
app.use(express.static(path.join(__dirname, "../front/build")));

// Fallback Route for React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/build", "index.html"));
});

// Catch 404 and Forward to Error Handler
app.use(function (req, res, next) {
  next(createError(404));
});

//connect to mongodb
// mongoose.connect(configs.ConnectionStrings.MongoDB)
// .then(() => {console.log("Connected to MongoDB!");})
// .catch((error) => {console.error("Error connecting to MongoDB:", error);});

//Vercel change
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection failed:", err));


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
  res.send('error');
});

//module.exports = app;

//Vercel
module.exports = (req, res) => {
  app(req, res);  // Export as a serverless function for Vercel
};

