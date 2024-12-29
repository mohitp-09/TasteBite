const mongoose = require("mongoose");

const foodCategorySchema = new mongoose.Schema(
    {
        CategoryName: { type: String, required: true }
    }
)

const foodCategory = mongoose.model("foodCategory", foodCategorySchema, "food_category");

module.exports = foodCategory;