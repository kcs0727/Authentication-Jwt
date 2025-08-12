const router = require('express').Router();
const jwt = require('jsonwebtoken');
const joi = require('joi');
const bcrypt = require('bcrypt');
const users = require('../Models/users.js');


router.post("/", loginvalidation, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(409).json({
                message: "user doesn't exist, please signup", success: false
            })
        }

        const ismatched = await bcrypt.compare(password, user.password);
        if (!ismatched) {
            return res.status(403).json({
                message: "password not matched", success: false
            })
        }

        const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        )
        res.status(200).json({
            message: "Login successfull",
            success: true,
            jwtToken: token,
            name: user.name
        })

    }
    catch {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})


function loginvalidation(req, res, next) {
    const Schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(20).required()
    })

    const { error } = Schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Input details should match requirements", success: false, error
        });
    }
    next();
}

module.exports = router;