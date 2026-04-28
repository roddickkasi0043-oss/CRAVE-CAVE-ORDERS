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

app.listen(PORT, () => {
    console.log(`Crave Cave is LIVE on port ${PORT}`);
});