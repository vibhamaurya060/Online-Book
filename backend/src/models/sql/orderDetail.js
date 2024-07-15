import{ DataTypes } from'sequelize';
import { sequelize } from '../../config/db.js';
import Order from './order.js';

const OrderDetail = sequelize.define('OrderDetail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: 'id',
        },
    },
    bookId: {
        type: DataTypes.STRING, // MongoDB ObjectId as string
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

OrderDetail.belongsTo(Order);

export default OrderDetail
