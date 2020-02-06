const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, {message: 'Incorrect username'});
            }
            if(!user.validPassword(password)) {
                return done(null, false, {message: 'Incorrect password'});
            }
            return done(null, user);
        });
    }
));

app.post('/login',
    passport.authenticate('local',
    {successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true  })
);

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
function(username, password, done) {

}
));