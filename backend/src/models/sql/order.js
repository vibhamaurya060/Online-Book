import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';
import Customer from './customer.js';

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    customerId: {
        type: DataTypes.INTEGER,
        references: {
            model: Customer,
            key: 'id',
        },
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

Order.belongsTo(Customer);

export default Order
