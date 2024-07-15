import express from 'express';
import { getOrdersByCustomer, placeOrder } from '../controllers/orderController.js';

const router = express.Router();

// /**
//  * @swagger
//  * /orders/customer/{customerId}:
//  *   get:
//  *     summary: Get all orders for a specific customer
//  *     parameters:
//  *       - in: path
//  *         name: customerId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: List of orders with order details
//  */
router.get('/orders/customer/:customerId', getOrdersByCustomer);

router.post('/plsce', placeOrder);


export default router;
