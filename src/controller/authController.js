const bcrypt = require('bcrypt');
const User = require('../model/userModel.js');
const generateToken = require('../utils/generateToken.js');


// Signup
const signup = async (req, res) => {
    try {

      const { email,password,role } = req.body;

      console.log('email', email)
      console.log('password', password)
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({ email, password: hashedPassword, role });
      await newUser.save();
  
      res.status(201).json({ message: 'Signup successful.' });
    } catch (error) {
      console.error('error', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
  
  // Login
  const login = async (req, res) => {
    try {
        console.log(req.body)
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      const role = user.role;
      console.log("ssssss", user)
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      // Check the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
      const token = generateToken(user);
  
      res.status(200).json({ message: 'Login successful.',token, role, userId: user._id});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };


module.exports = { signup, login };