import express from 'express';
import { getOrderDetails, getOrderDetailById, createOrderDetail, updateOrderDetail, deleteOrderDetail } from '../controllers/orderDetailController.js';
import { body, param } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      OrderDetail:
 *        required:
 *          - orderId
 *          - productId
 *          - quantity
 *        type: object
 *        properties:
 *          orderId:
 *            type: string
 *          productId:
 *            type: string
 *          quantity: 
 *            type: number
 */

// GET all order details
router.get('/order-details', getOrderDetails);

// GET an order detail by ID
router.get('/order-details/:orderDetailId', getOrderDetailById);

// POST create a new order detail
router.post('/order-details', [
    body('orderId').notEmpty().isMongoId(),
    body('productId').notEmpty().isMongoId(),
    body('quantity').isInt({ min: 1 }),
], createOrderDetail);

// PUT update an order detail by ID
router.put('/order-details/:orderDetailId', [
    param('orderDetailId').notEmpty().isMongoId(),
    body('orderId').optional().isMongoId(),
    body('productId').optional().isMongoId(),
    body('quantity').optional().isInt({ min: 1 }),
], updateOrderDetail);

// DELETE an order detail by ID
router.delete('/order-details/:orderDetailId', deleteOrderDetail);

export default router;
