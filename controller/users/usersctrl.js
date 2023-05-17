let User = require('../../model/users_model')
const helper = require("../../utils/helper");
const APIResp = require("../../utils/APIResp");
const moment = require('moment')
const { validationResult } = require('express-validator');
let bcrypt = require('bcrypt');
let { createJwt, refreshTokens } = require('../../utils/createjwt')
require('dotenv').config()
let jwt = require('jsonwebtoken')

const usersController = () => {

    const register = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors.array()
            return res.status(400).json({
                success: false,
                error: err[0].msg
            });
        }

        const emailExist = await User.findOne({ email: req.body.email })
        if (emailExist) return res.status(400).json({ error: 'Email already exists!' })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        try {
            const savedUser = await user.save()

            // const token = createJwt(user._id)
            // res.header('auth-token', token)

            res.status(200).json({
                success: true,
                message: 'Registered successfully',
                registeredUserId: user._id,
                // accessToken: token
            })

        } catch (err) {
            res.status(400).send({ error: `${err}` });
        }
    }

    const login = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const err = errors.array()
                return res.status(400).json({
                    success: false,
                    error: err[0].msg
                });
            }

            const user = await User.findOne({ email: req.body.email })
            if (!user) return res.status(400).json({ error: 'Email does not exists!/ Email or password is wrong!/ Email is not found!' })

            const validPass = await bcrypt.compare(req.body.password, user.password)
            if (!validPass) return res.status(400).json({ error: 'Invalid Password' })

            const token = createJwt(user._id)
            const refreshToken = await jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' })
            refreshTokens.push(refreshToken);
console.log(refreshTokens)
            res.header('auth-token', token)

            res.json({
                success: true,
                message: 'Logged in successfully',
                loginUserId: user._id,
                accessToken: token,
                refreshToken: refreshToken
            })
        }
        catch (err) {
            console.log(err)
            res.status(400).send({ error: `${err}` });
        }
    }

    const refreshToken = async (req, res) => {
       
        const refreshToken = req.body.refreshToken
console.log(refreshTokens,"---")
        if (!refreshToken) {
           return res.status(401).json({
                errors: [
                    {
                        msg: "Token not found",
                    },
                ],
            });
        }


        if (!refreshTokens.includes(refreshToken)) {
           return res.status(403).json({
                errors: [
                    {
                        msg: "Invalid refresh token",
                    },
                ],
            });
        }

        try {

            const userDetails = await jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );
            console.log(userDetails, "--")
            const accessToken = await jwt.sign(
                { userDetails },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30s" }
            );

            res.json({ accessToken });

        } catch (error) {
            console.log(error)
            res.status(403).json({
                errors: [
                    {
                        msg: "Invalid token",
                    },
                ],
            });
        }

    }

    return {
        register,
        login,
        refreshToken
    };
};
module.exports = usersController();
