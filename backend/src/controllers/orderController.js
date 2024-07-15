import Order from '../models/sql/order.js';
import OrderDetail from '../models/sql/orderDetail.js';
import Customer from '../models/sql/customer.js';
import Book from '../models/nosql/book.js';

const getOrdersByCustomer = async (req, res) => {
    const { customerId } = req.params;
    try {
        const orders = await Order.findAll({
            where: { customerId },
            include: [
                {
                    model: OrderDetail,
                    include: [
                        {
                            model: Book,
                            as: 'bookDetails',
                        },
                    ],
                },
                {
                    model: Customer,
                },
            ],
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getOrdersByCustomer };
