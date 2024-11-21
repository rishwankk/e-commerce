import Cart from "../model/cartModel.js";
import Product from "../model/productModel.js";
import nodemailer from "nodemailer";
import Order from "../model/orderModel.js";

export const addToCart = async (req, res) => {
    console.log("this.addToCart");
    
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
 
      cart = new Cart({
        userId,
        items: [{ productId, quantity, price: product.offerPrice }],
      });
    } else {
    
      const item = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (item) {
        item.quantity += quantity; 
      } else {
        cart.items.push({ productId, quantity, price: product.offerPrice });
      }
    }


    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("Error managing cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCart = async (req, res) => {
  const { userId } = req.query;
  console.log(req.query);
  

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const cartData = await Cart.findOne({ userId }).populate("items.productId");

    if (cartData) {
   
      const cartStatus = cartData.items.reduce((status, item) => {
        status[item.productId._id] = true; 
        return status;
      }, {});

     
      const response = {
        cartStatus,
        items: cartData.items.map((item) => ({
          productId: item.productId._id,
          name: item.productId.name,
          image: item.productId.image,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: cartData.totalPrice,
      };

      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const updateQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  console.log(req.body,"cartQuantity");
  

  if (!userId || !productId || quantity === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart: {
        items: cart.items,
        totalPrice: cart.totalPrice,
      },
    });
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const orderConfirm = async (req, res) => {
  const { email, address, orderDetails, totalPrice, userId } = req.body;

  try {
   
    const newOrder = new Order({
      customer: userId,
      email,
      deliveryAddress: address,
      products: orderDetails.map((item) => ({
        product: item.productId,
        name: item.name, 
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice,
    });

    await newOrder.save();


    const emailSent = await sendOrderConfirmation({
      email,
      address,
      orderDetails,
      totalPrice,
    });

  

   
    await Cart.updateOne(
      { userId: userId },
      { $set: { items: [], totalPrice: 0 } }
    );
console.log("this");

    res.status(201).json({ message: "Order placed successfully and cart cleared." });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ message: "Failed to place order." });
  }
};

const sendOrderConfirmation = async ({ email, address, orderDetails, totalPrice }) => {
  const transport = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: "rishwan916@gmail.com", 
      pass: "xpazxfziechgzgmf"    
    }
  });

  const emailContent = `
    <h1>Order Confirmation</h1>
    <p>Thank you for your order! Here are your details:</p>
    <p><strong>Address:</strong> ${address}</p>
    <h2>Order Details:</h2>
    <ul>
      ${orderDetails
        .map(
          (item) => `
        <li>
          ${item.name} - ₹${item.price} x ${item.quantity} = ₹${(
            item.price * item.quantity
          ).toFixed(2)}
        </li>
      `
        )
        .join("")}
    </ul>
    <h3>Total Price: ₹${totalPrice.toFixed(2)}</h3>
  `;

  try {
    await transport.sendMail({
      from: "rishwank773@gmail.com",
      to: email,
      subject: "Order Confirmation",
      html: emailContent,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error.message);
    return false;
  }
};