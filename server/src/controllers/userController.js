//src/controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const { validationResult } = require('express-validator');

require('dotenv').config();

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ username });

        if (user) {
            console.log("User already exists");
            return res.status(409).json({ msg: "User already exists" });
            
        }

        // Create new user
        user = new User({ username, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();
        user.password="";
        console.log({ message: 'User registered successfully', user });

        // Generate JWT token
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '365d' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).send("Server Error");
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { username, password } = req.body;

    try {

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({msg: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid Credentials"});
        }
        user.password = "";
        const payload = { user: {id: user.id} };
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({token});
        });

        console.log({ message: 'User logged in successfully', user });
    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).send("Server Error");
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        // Extract user ID from JWT token
        const userId = req.user.id;

        // Fetch user profile from the database
        const user = await User.findById(userId).select('-password'); // Exclude the password from the response

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.log(err)
        console.error('Server Error:', err);
        res.status(500).send('Server Error');
    }
};