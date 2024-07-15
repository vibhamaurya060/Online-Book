import Order from '../models/sql/order.js';
import OrderDetail from '../models/sql/orderDetail.js';
import Customer from '../models/sql/customer.js';
import Book from '../models/nosql/book.js';

import orderEmitter from '../models/events/orderEvents.js';



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

   const placeOrder = async(req,res)=>{
   
   try{
      const newOrder=await Order.create(req.body);
      orderEmitter.emit("orderPlaced", newOrder);
      res.status(201).json(newOrder);
   }catch(err){
    res.status(500).json({error:err.message})
   }
};



export { placeOrder , getOrdersByCustomer};
