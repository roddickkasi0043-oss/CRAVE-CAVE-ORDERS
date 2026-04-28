const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

let orders = [];

// Main route - shows your menu
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Receiving the order from the customer
app.post('/order', (req, res) => {
    const newOrder = {
        id: orders.length + 1,
        ...req.body,
        status: "Pending",
        time: new Date().toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" })
    };
    orders.push(newOrder);
    console.log("New Order Received:", newOrder);
    res.status(201).send({ message: "Order Received", orderId: newOrder.id });
});

// Admin route - shows all orders in JSON format
app.get('/admin/orders', (req, res) => {
    res.json(orders);
});
// Route to cancel/delete an order
app.delete('/cancel-order/:name', (req, res) => {
    const customerName = req.params.name;
    const initialLength = orders.length;
    
    // Remove the order from the list
    orders = orders.filter(order => order.customer !== customerName);

    if (orders.length < initialLength) {
        console.log(`Order for ${customerName} was cancelled.`);
        res.status(200).send({ message: "Order deleted" });
    } else {
        res.status(404).send({ message: "Order not found" });
    }
});
app.listen(PORT, () => {
    console.log(`Crave Cave is LIVE on port ${PORT}`);
});