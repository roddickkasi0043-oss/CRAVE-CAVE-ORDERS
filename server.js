const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

let orders = [];

// Serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Receive order
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

// Cancel order route
app.delete('/cancel-order/:name', (req, res) => {
    const customerName = req.params.name;
    const initialLength = orders.length;
    orders = orders.filter(order => order.customer !== customerName);
    
    if (orders.length < initialLength) {
        res.status(200).send({ message: "Deleted" });
    } else {
        res.status(404).send({ message: "Not found" });
    }
});

// View orders
app.get('/admin/orders', (req, res) => {
    res.json(orders);
});

app.listen(PORT, () => {
    console.log(`Crave Cave is LIVE on port ${PORT}`);
});