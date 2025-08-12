const router = require('express').Router();
const joi = require('joi');
const bcrypt = require('bcrypt');
const users = require('../Models/users.js');


router.post("/", signupvalidation, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await users.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "user already exist, you can login", success: false
            })
        }

        const hashed = await bcrypt.hash(password, 10);
        await users.create({ name, email, password: hashed });
        res.status(201).json({
            message: "signup successfully",
            success: true
        })
    }
    catch {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }

})


function signupvalidation(req, res, next) {
    const Schema = joi.object({
        name: joi.string().min(3).max(40).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(20).required()
    })

    const { error } = Schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false, error
        });
    }
    next();
}

module.exports = router;