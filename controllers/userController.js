const User = require('../model/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to generate JWT token
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' })
};

module.exports.createNewUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ msg: 'Incomplete/invalid field values received! Please provide all the field values' });
  } else {
    try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the hashed password
      let user = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      // Generate JWT token and send it in the response
      const token = signToken(user.id);
      res.status(201).json({ user, token });
    } catch (err) {
      return res.status(400).json({
        message: 'Error creating new user',
        data: err,
      });
    }
  }
};

module.exports.logInUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Email doesn't exist"
        });
      }

      // Compare the provided password to the hashed password in the database
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(401).json({
              message: "Invalid Password!"
            });
          }

          // If passwords match, create JWT token and send back in the response
          const token = signToken(user.id);
          res.status(200).json({
            token,
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
          });
        })
        .catch(error => {
          console.log("Error comparing password", error);
          res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log("Error logging in user", err);
      res.sendStatus(500);
    });
};
