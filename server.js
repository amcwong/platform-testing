const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/userAuth', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(200).send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).send('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).send('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });

    res.json({ accessToken: token });
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, 'SECRET_KEY', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Protected route
app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: "This is a protected route!" });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
