const express = require('express');
const router = express.Router();
const ordersController = require('../controller/customers/ordersctrl');


router.post('/create', ordersController.createOrders)
router.put('/update', ordersController.updateOrders)
router.get('/listOrders', ordersController.listOrders)
router.get('/listDelivery', ordersController.listDelivery)
router.get('/search', ordersController.search)
router.delete('/deleteOrders', ordersController.deleteOrders)



module.exports = router;
