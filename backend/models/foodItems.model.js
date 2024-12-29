const mongoose = require("mongoose");


const foodItemSchema = new mongoose.Schema(
    {
        CategoryName: { type: String, required: true },
        name: { type: String, required: true },
        img: { type: String, required: true },
        options: [
            new mongoose.Schema(
                {
                    half: { type: String },
                    full: { type: String }
                },
                { _id: false } 
            )
        ],
        description: { type: String, required: true }
    },
    {
        versionKey: false 
    }
);


const FoodItem = mongoose.model("FoodItem", foodItemSchema, "food_items");

module.exports = FoodItem;
