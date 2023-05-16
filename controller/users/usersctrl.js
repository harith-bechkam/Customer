let User = require('../../model/orders_model')
const helper = require("../../utils/helper");
const APIResp = require("../../utils/APIResp");
const moment = require('moment')

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

            const token = createJwt(user._id)
            res.header('auth-token', token)

            res.status(200).json({
                success: true,
                message: 'Registered successfully',
                registeredUserId: user._id,
                accessToken: token
            })

        } catch (err) {
            res.status(400).send({ error: `${err}` });
        }
    }


    return {
        register,
    };
};
module.exports = usersController();
