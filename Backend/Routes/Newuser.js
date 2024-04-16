const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files
const User = require('../user');

router.post('/newuser',  [
    // Validation middleware
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid Password').isLength({ min: 6 }),
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('username', 'Enter a valid username').isLength({ min: 3 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        await User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        res.json({ success: true });
    } catch (error) {
        console.log("there is an error", error);
        res.json({ success: false });
    }
});

router.post('/newuser/upload', upload.single('img'), [
    body('location', 'Enter a valid Location').isLength({ min: 1 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username } = req.body; // Extracting username from the request body

    try {
        const imgPath = req.file.path; 
        const imgURL = `/uploads/${req.file.filename}`; 

        // Updating user with the provided username
        await User.updateOne({ username: username }, {
            $set: {
                img: imgURL,
                location: req.body.location
            }
        });

        res.json({ success: true });
    } catch (error) {
        console.error("there is an error", error); // Using console.error for clarity
        res.json({ success: false });
    }
});

router.get('/verify/:username/', async (req, res) => {
    const username = req.params.username;
    console.log("Fetching data for username:", username);
    try {
        const user = await User.findOne({ username: username });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;
