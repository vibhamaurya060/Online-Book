import Order from '../models/sql/order.js';
import Customer from '../models/sql/customer.js';




const getOrdersByCustomer = async (req, res) => {
  const { customerId } = req.params;
  try {
    const orders = await Order.findAll({
      where: { CustomerId: customerId },
      include: [{ model: Customer }],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const placeOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, status: 'Pending' });
    // Emit event for order placed
    req.app.get('io').emit('orderPlaced', order);
    // Send email confirmation
    sendOrderConfirmationEmail(order);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.update({ status }, { where: { id: orderId } });
    req.app.get('io').emit('orderStatusChange', { orderId, status });
    res.status(200).json({ message: 'Order status updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getOrdersByCustomer, placeOrder, updateOrderStatus };

   