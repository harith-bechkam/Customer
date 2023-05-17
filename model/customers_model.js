// const { ObjectId } = require('mongodb')
const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema(
    {
        user_email: {
            type: String,
            required: true
        },
        item_name: {
            type: String,   
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        },
        order_date: {
            type: String,
            required: true,
            // default: Date.now
        },
        delivery_date: {
            type: String,
            required: true,
            // default: Date.now
        },
    },
    { timestamps: true }
);

const customer = mongoose.model("customers", customersSchema);

module.exports = customer