let Customers = require('../../model/customers_model')
let User = require('../../model/users_model')
const helper = require("../../utils/helper");
const APIResp = require("../../utils/APIResp");
const moment = require('moment')
require('dotenv').config()


const ordersController = () => {

    const createCustomers = async (req, res) => {
        try {
            const userInput = helper.getReqValues(req);

            let orders = await User.find({ email: userInput.user_email })
            if (orders.length == 0) {
                return APIResp.getErrorResult(`email - ${userInput.user_email} is not present`, res)
            }

            let data = await Customers.create({
                user_email: userInput.user_email,
                item_name: userInput.item_name,
                cost: userInput.cost,
                order_date: moment(userInput.order_date, 'YYYY/MM/DD').format(),
                delivery_date: moment(userInput.delivery_date, 'YYYY/MM/DD').format()
            });
            data.save();
            APIResp.getSuccessResult(data, "customers data inserted successfully", res);
        }
        catch (err) {
            console.log(err)
            APIResp.getINTERNALSERVERError(err, res);
        }
    }

    const updateCustomers = async (req, res) => {
        try {
            const userInput = helper.getReqValues(req);

            let orders = await Customers.find({ _id: userInput.customer_id })
            if (orders.length == 0) {
                return APIResp.getErrorResult(`customer_id - ${userInput.customer_id} is not present`, res)
            }

            let data = await Customers.updateMany({ _id: userInput.customer_id }, {
                $set: {
                    item_name: userInput.item_name,
                    cost: userInput.cost,
                    order_date: moment(userInput.order_date, 'YYYY/MM/DD').format(),
                    delivery_date: moment(userInput.delivery_date, 'YYYY/MM/DD').format()
                }
            })
            APIResp.getSuccessResult(data,
                `customer id - ${userInput.customer_id} updated successfully`, res);

        }
        catch (err) {
            console.log(err)
            APIResp.getINTERNALSERVERError(err, res);
        }

    }

    const listCustomers = async (req, res) => {
        try {
            const userInput = helper.getReqValues(req);

            let data = await Customers.find({ order_date: moment(userInput.order_date, 'YYYY/MM/DD').format() })
            var msg = ''
            msg = data.length ?
                `listed successfully based on order_date`
                : `no records are available based on order_date`
            APIResp.getSuccessResult(data, msg, res);
        }
        catch (err) {
            console.log(err)
            APIResp.getINTERNALSERVERError(err, res);
        }
    }

    const listCustomers1 = async (req, res) => {
        try {
            const userInput = helper.getReqValues(req);

            let data = await Customers.find({})
            var msg = ''
            msg = data.length ?
                `customer data listed successfully`
                : `no records are available in customers`
            APIResp.getSuccessResult(data, msg, res);
        }
        catch (err) {
            console.log(err)
            APIResp.getINTERNALSERVERError(err, res);
        }
    }


    const deleteSingleCustomer = async (req, res) => {
        try {
            const userInput = helper.getReqValues(req);

            let orders = await Customers.find({ _id: userInput.customer_id })

            if (orders.length == 0) {
                return APIResp.getErrorResult(`customer id - ${userInput.customer_id} is not present`, res)
            }

            let data = await Customers.deleteOne({ _id: userInput.customer_id })
            APIResp.getSuccessResult(data,
                `records deleted based on customer id - ${userInput.customer_id}`, res);

        }
        catch (err) {
            console.log(err)
            APIResp.getINTERNALSERVERError(err, res);
        }
    }

    const deleteMultipleCustomer = async (req, res) => {
        try {
            const userInput = helper.getReqValues(req);

            for (let val of userInput.customer_id) {
                let orders = await Customers.find({ _id: val })
                if (orders.length == 0) {
                    return APIResp.getErrorResult(`customer id - ${userInput.customer_id} is not present`, res)
                }
            }


            let data = await Customers.deleteMany({ _id: { $in: userInput.customer_id } })
            APIResp.getSuccessResult(data,
                `records deleted based on customer id - ${userInput.customer_id}`, res);

        }
        catch (err) {
            console.log(err)
            APIResp.getINTERNALSERVERError(err, res);
        }
    }

    return {
        createCustomers,
        updateCustomers,

        listCustomers,
        listCustomers1,

        deleteSingleCustomer,
        deleteMultipleCustomer
    };
};
module.exports = ordersController();
