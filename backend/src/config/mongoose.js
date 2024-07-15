import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('Unable to connect to MongoDB:', error);
    }
};

export default connectMongoDB;
