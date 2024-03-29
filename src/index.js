const express = require('express')
const route = require('./routes/route')
const facebook = require("./routes/facebook")
const google = require("./routes/googleLogin")
const twitter = require("./routes/TwitterLogin")
const mongoose = require('mongoose')
const mysql = require("mysql")
const bodyParser = require('body-parser')
const app = express()
const cookieSession = require('cookie-session')
const cors = require('cors')
//app.options('*', cors())

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
}

//app.use(cors(corsOptions));
app.use(cors())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");
app.use(multer().any())

//const session = require('express-session');
// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;

// require('./routes/facebookRoutes');
// const config = require("../config/config")
// app.set('view engine', 'ejs')
// app.use(session({
//     resave: false,
//     saveUninitialized: true.valueOf,
//     secret: 'SECRET'
// }))
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, cb) {
//     cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//     cb(null, obj);
// });

// passport.use(new FacebookStrategy({
//     clientID: config.facebookAuth.clientID,
//     clientSecret: config.facebookAuth.clientSecret,
//     callbackURL: config.facebookAuth.callbackURL,
//     profile: ['id', 'displayName'],

// },
//     function (accessToken, refreshToken, profile, done) {
//         //Check the DB to find a User with the profile.id
//         return done(null, profile);
//     }
// ));


mongoose.connect("mongodb+srv://satyamRandawa:Loveyam@cluster0.tfry3tr.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true })

    .then(() => {
        console.log("MongoDb connected")
    }).catch((err) => {
        console.log(err.message)
    });

app.use('/', route);
app.use('/', facebook)
app.use('/', google)
app.use('/', twitter)




app.listen(process.env.Port || 3300, function () {
    console.log('App running on port ' + (process.env.PORT || 3300))
});


