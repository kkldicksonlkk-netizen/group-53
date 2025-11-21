// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const User = require('./models/user');

// Route imports
const authRoutes = require('./routes/auth');
const crudRoutes = require('./routes/crud');
const apiRoutes = require('./routes/api');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

// Session and Passport configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to pass current user to all templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Use routes
app.use(authRoutes);
app.use('/dashboard', crudRoutes); // CRUD routes will be prefixed with /dashboard
app.use('/api', apiRoutes);       // API routes will be prefixed with /api

// Home route
app.get('/', (req, res) => {
    res.render('home'); // You'll need to create a home.ejs
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
