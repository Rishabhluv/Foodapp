const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtsecret = "MynameisEndtoEndYoutubeChnel$#";

router.post("/createuser",
    body('email').isEmail(),
    body('name', 'invalid name').isLength({ min: 5 }),
    body('password', 'invalid password').isLength({ min: 5 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        const secpassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                password: secpassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })


router.post("/loginuser",
    body('email').isEmail(),
    body('password', 'invalid password').isLength({ min: 5 })
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try Logging with correct crednetial" });
            }
             const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "aTry Logging with correct crednetial" });
            }
            const data = {
                user: {
                    id:userData.id
                }
            }
            const authtoken = jwt.sign(data, jwtsecret)
            return res.json({ success: true, authtoken: authtoken })
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })


module.exports = router;