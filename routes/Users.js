const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + ' registered successfully!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

// users.post('/login', (req, res) => {
//   User.findOne({
//     email: req.body.email
//   })
//     .then(user => {
//       if (user) {
//         if (bcrypt.compareSync(req.body.password, user.password)) {
//           // Passwords match
//           const payload = {
//             _id: user._id,
//             first_name: user.first_name,
//             last_name: user.last_name,
//             email: user.email
//           }
//           let token = jwt.sign(payload, process.env.SECRET_KEY, {
//             expiresIn: 1440
//           })
//           res.send({"token":token})
//         } else {
//           // Passwords don't match
//           res.json({ error: 'User does not exist' })
//         }
//       } else {
//         res.json({ error: 'User does not exist' })
//       }
//     })
//     .catch(err => {
//       res.send('error: ' + err)
//     })
// })

// users.get('/profile', (req, res) => {
//   var decoded = jwt.verify(req.headers['Authorization'], process.env.SECRET_KEY)

//   User.findOne({
//     _id: decoded._id
//   })
//     .then(user => {
//       if (user) {
//         res.json(user)
//       } else {
//         res.send('User does not exist')
//       }
//     })
//     .catch(err => {
//       res.send('error: ' + err)
//     })
// })


// Handle user login requests
users.post('/login', async (req, res) => {
  try {
    // Extract the email and password from the request body
    const { email, password } = req.body;

    // Find the user with the given email
    const user = await User.findOne({ email });

    // If no user was found, return an error response
    if (!user) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return an error response
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Redirect to the appropriate page based on the user role
    if (user.role === 'admin') {
      return res.redirect('/admin');
    } else {
      return res.redirect('/student');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while processing your request' });
  }
});


module.exports = users
