
import mongoose from 'mongoose';
const connectDb = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/e-commerce-auxzon", {
    
      });
      console.log("DB Connected");
    } catch (error) {
      console.error("Database connection failed:", error);
      process.exit(1);
    }
  };
  export default connectDb;