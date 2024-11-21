import Order from "../model/orderModel.js";

export const getOrder = async (req, res) => {
  try {
    console.log("Fetching orders...");

   
    const orders = await Order.find()
      .populate('customer', 'name email') 
      .populate('products.product', 'name company offerPrice') 
      .exec();

    console.log("Orders fetched successfully:", orders);

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err); 
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};
