import {EventEmitter} from 'events';
import Order from '../sql/order.js';

const orderEmitter= new EventEmitter();

orderEmitter.on("orderPlaced", async(order)=>{
    try{
        await Order.update({status: 'Placed'}, {where:{id:order.id}});

        console.log(`Order ${order.id} placed successfull.`)

    }
    catch(err){
        console.log(`eroor processing order ${order.id}: ${err.message}`);
    }
})
export default orderEmitter;