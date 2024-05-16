// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://pankajy8928:bucT7LryT1DFYz5O@cluster0.uwfwgjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Stock Schema
const stockSchema = new mongoose.Schema({
  symbol: String
});

const Stock = mongoose.model('Stock', stockSchema);

// API endpoints
app.post('/api/addStock', async (req, res) => {
  try {
    const { symbol } = req.body;
    const newStock = new Stock({ symbol });
    await newStock.save();
    res.json({ message: 'Stock added successfully' });
  } catch (error) {
    console.error('Error adding stock:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getStocks', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
