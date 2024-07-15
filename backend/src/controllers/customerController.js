import Customer from '../models/sql/customer.js'; // Adjust path as needed
import { validationResult } from 'express-validator';

// GET all customers
export const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET a customer by ID
export const getCustomerById = async (req, res) => {
    const { customerId } = req.params;
    try {
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST create a new customer
export const createCustomer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;
    try {
        const newCustomer = await Customer.create({ name, email });
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT update a customer by ID
export const updateCustomer = async (req, res) => {
    const { customerId } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;
    try {
        const [updatedRowsCount, updatedCustomers] = await Customer.update(
            { name, email },
            { where: { id: customerId }, returning: true }
        );
        if (updatedRowsCount === 0 || !updatedCustomers[0]) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(updatedCustomers[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE a customer by ID
export const deleteCustomer = async (req, res) => {
    const { customerId } = req.params;
    try {
        const deletedRowCount = await Customer.destroy({ where: { id: customerId } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
