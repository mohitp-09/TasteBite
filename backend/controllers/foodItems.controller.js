const FoodItem = require('../models/foodItems.model');
const foodCategory = require('../models/foodCategory.model');

const allCategory = async (req, res)=>{
  try {
      const fetchCate = await foodCategory.find({});
      return fetchCate;
  } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
  }
}

const fetchData = async (req, res)=>{
    try {
        const allData = await FoodItem.find({});
        const categories = await allCategory();
        res.status(200).json([allData,categories]);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const addItems = async (req, res) =>{
        try {
          const createdData = await FoodItem.create(req.body);
          res.status(200).json(createdData);
        } catch (error) {
          res.status(500).json({ message: error.message }); 
        }
}

module.exports = {
    fetchData,
    addItems
}