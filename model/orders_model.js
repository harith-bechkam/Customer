// const { ObjectId } = require('mongodb')
const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
    {
        order_id: {
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

const orders = mongoose.model("orders", ordersSchema);

module.exports = orders