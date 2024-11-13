const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretkey= process.env.SECRET_KEY;
const userModel = require('../models/user')
const bcrypt = require("bcryptjs");
router.post('/createuser', async (req, res) => {
    try {
      const exisitingUser = await userModel.findOne({ email: req.body.email });
      if (exisitingUser) {
        return res
          .status(200)
          .send({ message: "User Already Exist", success: false });
      }
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
     
      const newUser = new userModel(req.body);
      await newUser.save();
      res.status(201).send({ message: "Registered", success: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: `Register Controller ${error.message}`,
      });
    }
  });
  router.post('/login', async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send({ message: 'User not found', success: false });
      }
  
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: 'Invalid email or password', success: false });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, secretkey, {
        expiresIn: '24h', 
      });
  
      // Send the token back to the client
      res.status(200).send({ message: 'Login successful', success: true, token });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: `Error in login: ${error.message}` });
    }
  });
  
module.exports = router;