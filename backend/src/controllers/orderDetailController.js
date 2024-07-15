import OrderDetail from '../models/sql/orderDetail.js';
import { validationResult } from 'express-validator';

// GET all order details
export const getOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetail.find({});
        res.json(orderDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET an order detail by ID
export const getOrderDetailById = async (req, res) => {
    const { orderDetailId } = req.params;
    try {
        const orderDetail = await OrderDetail.findById(orderDetailId);
        if (!orderDetail) {
            return res.status(404).json({ error: 'Order detail not found' });
        }
        res.json(orderDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST create a new order detail
export const createOrderDetail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { orderId, productId, quantity } = req.body;
    try {
        const newOrderDetail = await OrderDetail.create({ orderId, productId, quantity });
        res.status(201).json(newOrderDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT update an order detail by ID
export const updateOrderDetail = async (req, res) => {
    const { orderDetailId } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { orderId, productId, quantity } = req.body;
    try {
        const updatedOrderDetail = await OrderDetail.findByIdAndUpdate(
            orderDetailId,
            { orderId, productId, quantity },
            { new: true, runValidators: true }
        );
        if (!updatedOrderDetail) {
            return res.status(404).json({ error: 'Order detail not found' });
        }
        res.json(updatedOrderDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE an order detail by ID
export const deleteOrderDetail = async (req, res) => {
    const { orderDetailId } = req.params;
    try {
        const deletedOrderDetail = await OrderDetail.findByIdAndDelete(orderDetailId);
        if (!deletedOrderDetail) {
            return res.status(404).json({ error: 'Order detail not found' });
        }
        res.json({ message: 'Order detail deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
