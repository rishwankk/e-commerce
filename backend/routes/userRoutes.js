import express from 'express';
import { loginUser, postUser } from '../controller/userControll.js';
import { addProduct, getProduct } from '../controller/productControll.js';
import { addToCart, getCart, orderConfirm, updateQuantity } from '../controller/cartController.js';
import { getOrder } from '../controller/OrderControll.js';
const router=express.Router();
router.post("/signup",postUser)
.post("/login",loginUser)
.post("/add",addProduct)
.get("/product",getProduct)
.post("/addtocart",addToCart)
.get("/cart",getCart)
.post("/updatecart",updateQuantity)
.post("/orderconfirm",orderConfirm)
.get("/order",getOrder)
.post("/deletecartitem",)

export default router;