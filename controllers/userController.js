const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const getUsers = (req, res) => {
     User.find({})
     .then(users => res.json(users))
     .catch(() => res.sendStatus(500));
}

const registerUser = (req, res) => {

     User.findOne({email: req.body.email})
     .then(user => {
          if(user)
          return res.status(409).json("Email already exists");

          if(req.body.password.length < 8)
          return res.status(409).json("Password must contain atleast a minimum of 8 characters");

          user = new User({
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               email: req.body.email,
               password: bcrypt.hashSync(req.body.password, 10),
               mobileNo: req.body.mobileNo
          })
     
          user.save()
          .then(newUser => res.json(newUser))
          .catch(err => res.status(400).json(err.message));

     })
     .catch(() => res.sendStatus(500));

     
}

const loginUser = (req, res) => {
     User.findOne({email: req.body.email})
     .then(user => {
          if(!user)
          return res.status(400).json("User not found")

          bcrypt.compare(req.body.password, user.password)
          .then(isPasswordCorrect => {
               if(!isPasswordCorrect)
               return res.status(400).json("Invalid password");

               const dataPayload = {
                    _id: user._id,
                    email: user.email,
                    isAdmin: user.isAdmin
               }

               const encodedToken = jwt.sign(dataPayload, process.env.JWT_SECRET);
               res.json(encodedToken);
          })
          .catch(err => res.status(500).json(err.message));
     })
     .catch(() => res.sendStatus(500));
}

const setAdmin = (req, res) => {
     User.findById(req.params.id)
     .then(user => {
          if(!user) return res.status(400).json('user not found')
          user.isAdmin = true;
          user.save()
          .then(updatedUser => res.json('User has been set as Admin'))
          .catch(() => res.sendStatus(500));
     })
     .catch(() => res.sendStatus(500));
}


module.exports = {
     getUsers,
     registerUser,
     loginUser,
     setAdmin

}