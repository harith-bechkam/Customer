const express = require('express');
const router = express.Router();
const usersController = require('../controller/users/usersctrl');
const {
    validateUserSignUpfields,
    validateUserLoginfields,
    validateUserForgotPasswordFields,
    validateUserResetPasswordFields
} = require('../utils/validation');

router.post('/register', validateUserSignUpfields, usersController.register)
router.post('/login', validateUserLoginfields, usersController.login)
router.post('/generate-access-token', usersController.refreshToken)



module.exports = router;
