const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretkey= process.env.SECRET_KEY;
const userModel = require('../models/user')
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

router.post('/forgot-password', async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: 'User not found', success: false });
    }

    const token = jwt.sign({ id: user._id }, secretkey, { expiresIn: '1h' });
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const transporter = nodemailer.createTransport({ 
      service: 'gmail', 
      auth: {
        user: "abhi9161shukla@gmail.com", 
        pass: "ugry xkqo enim mxiz" 
      }

     });
    await transporter.sendMail({
      from: 'abhi9161shukla@.com',
      to: user.email,
      subject: 'Password Reset',
      text: `Click this link to reset your password: ${resetLink}`
    });

    res.status(200).send({ message: 'Password reset email sent', success: true });
  } catch (error) {
    res.status(500).send({ message: `Error: ${error.message}`, success: false });
  }
});

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, secretkey);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(400).send({ message: 'Invalid token', success: false });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ message: 'Password reset successful', success: true });
  } catch (error) {
    res.status(500).send({ message: 'Error resetting password', success: false });
  }
});

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