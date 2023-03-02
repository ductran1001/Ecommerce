import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const OrderSchema = new Schema(
    {
        firstName: { type: String, required: true },
        name: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        phoneNumber: { type: String, require: true },
        email: { type: String, require: true },
        status: { type: String, default: 'waiting' },
        orderDetails: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product' },
                name: { type: String },
                image: { type: String },
                price: { type: Number },
                quantity: { type: Number },
                promotion: { type: Number },
                _id: false,
            },
        ],
    },
    { timestamps: true }
);

export default model<IOrder>('Order', OrderSchema);
