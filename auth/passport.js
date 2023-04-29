const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Hard-coded user data
const users = [
  { id: 1, username: 'anil', password: 'password1' },
  { id: 2, username: 'om', password: 'password2' },
  { id: 3, username: 'navin', password: 'password3' },
  { id: 3, username: 'david', password: 'password4' },
];

// Configure Passport to use local strategy for authentication
passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = users.find(user => user.username === username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));

// Serialize and deserialize user data for sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(user => user.id === id);
  done(null, user);
});

module.exports = passport;
