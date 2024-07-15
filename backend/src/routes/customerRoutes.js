import express from 'express';
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from '../controllers/customerController.js';
import { body, param } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      Customer:
 *        required:
 *          - name
 *          - email
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 */

// GET all customers
router.get('/customers', getCustomers);

// GET a customer by ID
router.get('/customers/:customerId', getCustomerById);

// POST a new customer
router.post('/customers', [
    body('name').notEmpty(),
    body('email').isEmail(),
], createCustomer);

// PUT update a customer by ID
router.put('/customers/:customerId', [
    param('customerId').notEmpty().isMongoId(),
    body('name').notEmpty(),
    body('email').isEmail(),
], updateCustomer);

// DELETE a customer by ID
router.delete('/customers/:customerId', deleteCustomer);

export default router;
