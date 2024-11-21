import { MongoClient } from "mongodb";

// MongoDB connection URI and database name
const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
const dbName = "e-commerce-test";
const collectionName = "products";

// Dummy electronic product data
const products = [
    {
        name: "Smartphone X1",
        offerPrice: 24999,
        mrp: 29999,
        company: "TechCorp",
        starRating: 4.5,
        discountPercentage: 16,
        imageUrl: "https://picsum.photos/150/150"
    },
    {
        name: "Wireless Earbuds Pro",
        offerPrice: 3499,
        mrp: 4999,
        company: "AudioMax",
        starRating: 4.3,
        discountPercentage: 30,
        imageUrl: "https://picsum.photos/150/150"
    },
    {
        name: "4K Smart TV 55-inch",
        offerPrice: 47999,
        mrp: 59999,
        company: "VisionTech",
        starRating: 4.7,
        discountPercentage: 20,
        imageUrl: "https://picsum.photos/150/150"
    },
    {
        name: "Gaming Laptop G7",
        offerPrice: 99999,
        mrp: 119999,
        company: "GamePro",
        starRating: 4.8,
        discountPercentage: 17,
        imageUrl: "https://picsum.photos/150/150"
    },
    {
        name: "Smartwatch ZFit",
        offerPrice: 8999,
        mrp: 11999,
        company: "FitTrack",
        starRating: 4.2,
        discountPercentage: 25,
        imageUrl: "https://picsum.photos/150/150"
    },
    {
        name: "Bluetooth Speaker BoomX",
        offerPrice: 2499,
        mrp: 3499,
        company: "SoundBlast",
        starRating: 4.6,
        discountPercentage: 29,
        imageUrl: "https://picsum.photos/150/150"
    },
    {
        name: "Wireless Keyboard & Mouse Combo",
        offerPrice: 1999,
        mrp: 2999,
        company: "KeyMasters",
        starRating: 4.4,
        discountPercentage: 33,
        imageUrl: "https://picsum.photos/150/150"
    },
    {
        name: "Portable Power Bank 20000mAh",
        offerPrice: 1499,
        mrp: 1999,
        company: "ChargePlus",
        starRating: 4.1,
        discountPercentage: 25,
        imageUrl: "https://picsum.photos/150/150"
    }
];

// Function to insert data into MongoDB
async function insertDummyData() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Access the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Insert the dummy data
        const result = await collection.insertMany(products);
        console.log(`${result.insertedCount} products inserted successfully!`);
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Call the function
insertDummyData();
