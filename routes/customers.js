const express = require('express');
const router = express.Router();
const customersController = require('../controller/customers/customersctrl');
let verify = require('../utils/verifyToken')

router.post('/create', verify, customersController.createCustomers)
router.put('/update', verify, customersController.updateCustomers)


router.get('/listCustomers_orderdate', verify, customersController.listCustomers)
router.get('/listCustomers', verify, customersController.listCustomers1)

router.delete('/deleteSingleCustomer', verify, customersController.deleteSingleCustomer)
router.delete('/deleteMultipleCustomer', verify, customersController.deleteMultipleCustomer)


module.exports = router;
