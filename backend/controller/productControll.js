import Product from "../model/productModel.js"
export const addProduct = async (req, res) => {
    try {
      console.log("Request received:", req.body);
  
    
      const isArray = Array.isArray(req.body);
  
      if (isArray) {
      
        const products = await Product.insertMany(req.body);
        return res.status(201).json({
          message: "Products added successfully",
          products,
        });
      } else {
     
        const product = new Product(req.body);
        await product.save();
        return res.status(201).json({
          message: "Product added successfully",
          product,
        });
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
      res.status(500).json({
        message: "Error adding product",
        error: error.message,
      });
    }
  };
  export const getProduct=async(req, res) => {
    try {
      const product = await Product.find();
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);    
  }
  catch (error) {
    console.error("Error getting product:", error.message);
    res.status(500).json({ message: "Error getting product" });
  }
}