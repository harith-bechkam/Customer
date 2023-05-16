const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024
        },
        date: {
            type: Date,
            default: Date.now
        },
        resetPasswordToken: String,
        resetPasswordExpire: String
    },
    { timestamps: true }
);

const users = mongoose.model("users", usersSchema);

module.exports = users