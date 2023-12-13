
const db = require('../dbClient');

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if (!user.username)
      return callback(new Error("Wrong user parameters"), null);
    
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
    };

    // Check if user already exists
    db.hgetall(user.username, (err, result) => {
      if (err) return callback(err, null);
      if (result) return callback(new Error("User already exists"), null);

      // Save to DB
      db.hmset(user.username, userObj, (err, res) => {
        if (err) return callback(err, null);
        callback(null, res); // Return callback
      });
    });
  },

  get: (username, callback) => {
    // Logic to get a user by username
    db.hgetall(username, (err, user) => {
      if (err) return callback(err);
      if (!user) return callback(new Error('User not found'));
      return callback(null, user);
    });
  },
  
};

