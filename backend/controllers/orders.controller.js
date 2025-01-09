const Order = require("../models/orders.model.js");

const addOrder = async (req, res) => {
    try {
        // Validate input
        if (!req.body.email || !req.body.order_data) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        // Prepare order data
        let data = [...req.body.order_data]; // Copy array to avoid mutation
        data.splice(0, 0, { Order_date: req.body.order_date });

        // Check if email exists
        let eId = await Order.findOne({ email: req.body.email });

        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error("Error:", error.message); 
        res.status(500).json({ message: error.message }); 
    }
};

// const myOrderData = async (req,res)=>{
//     try {
//         let myData = await Order.findOne({'email': req.body.email})
//         res.json({orderData: myData})
//     } catch (error) {
//         console.error("Error:", error.message); 
//         res.status(500).json({ message: error.message }); 
//     }
// }

const myOrderData = async (req, res) => {
    try {
        // Fetch order data from the database
        let myData = await Order.findOne({ 'email': req.body.email });

        if (!myData) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Extract relevant fields from the order_data array
        const formattedOrders = myData.order_data.map(order =>
            order.map(item => ({
                name: item.name,
                qty: item.qty,
                size: item.size,
                price: item.price,
                totalPrice: item.totalPrice,
                date: order[0].Order_date 
            }))
        );

        res.json({ orderData: formattedOrders });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    addOrder,
    myOrderData
};
