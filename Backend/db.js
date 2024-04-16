const mongoose = require('mongoose');

const uri = "mongodb+srv://devyanshgrover348:devyansh123@cluster0.8fceuvo.mongodb.net/dribbble?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = mongoDB;
