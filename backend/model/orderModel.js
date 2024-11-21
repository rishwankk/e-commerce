import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensure the customer field is mandatory
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true, // Ensure each product entry references a Product
        },
        name: {
          type: String,
          required: true, // Ensure product name is included
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Quantity must be at least 1
        },
        price: {
          type: Number,
          required: true, // Include price to prevent inconsistencies if product price changes
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true, // Ensure total price is mandatory
    },
    deliveryAddress: {
      type: String,
      required: true, // Ensure delivery address is provided
    },
    email: {
      type: String,
      required: true, // Email field to store the customer's email
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending", // Default order status
    },
    orderDate: {
      type: Date,
      default: Date.now, // Automatically record the order date
    },
  },
  { timestamps: true } // Enable createdAt and updatedAt timestamps
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
