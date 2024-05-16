import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import './StockMPage.css'; // Importing custom CSS file
import TrendingStocks from './TrendingStocks';

const demoStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
];

const StockMPage = () => {
  const [stocks, setStocks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStock, setNewStock] = useState({ symbol: '' });
  const [selectedParams, setSelectedParams] = useState({
    price: true,
    volume: true,
    open: false,
    high: false,
    low: false,
    graph: false
  });

  useEffect(() => {
    fetchTopStocks();
  }, []);

  const fetchTopStocks = async () => {
    const topStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'FB', 'NVDA', 'NFLX', 'PYPL', 'INTC'];
    for (let symbol of topStocks) {
      await fetchStockData(symbol);
    }
  };

  const handleAddStock = () => {
    if (newStock.symbol.trim() !== '') {
      fetchStockData(newStock.symbol.trim());
      setIsModalOpen(false);
    }
  };

  const fetchStockData = async (symbol) => {
    const API_KEY = 'QSK4LPPI7UZIW4PF'; // Replace with your API key
    const API_URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data['Global Quote']) {
        const price = parseFloat(data['Global Quote']['05. price']).toFixed(2);
        const volume = parseInt(data['Global Quote']['06. volume']).toLocaleString();
        const open = parseFloat(data['Global Quote']['02. open']).toFixed(2);
        const high = parseFloat(data['Global Quote']['03. high']).toFixed(2);
        const low = parseFloat(data['Global Quote']['04. low']).toFixed(2);
        const graphData = { ...data['Global Quote'] };

        const stockData = {
          symbol: symbol.toUpperCase(),
          price: price,
          volume: volume,
          open: open,
          high: high,
          low: low,
          graphData: graphData
        };

        setStocks((prevStocks) => [...prevStocks, stockData]);
        setNewStock({ symbol: '' });
      } else {
        console.error('Error fetching stock data:', data);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  const handleParamChange = (e) => {
    const { name, checked } = e.target;
    setSelectedParams({ ...selectedParams, [name]: checked });
  };

  return (
    <div className="stock-manager-page">
      <div className='trending-stocks-bar'>
        <TrendingStocks />

      </div>
      <div className="option-bar">
        <button className="add-stock-btn" onClick={() => setIsModalOpen(true)}>Add Stock</button>
      </div>
      <TableContainer component={Paper} className="stock-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              {selectedParams.price && <TableCell>Price</TableCell>}
              {selectedParams.volume && <TableCell>Volume</TableCell>}
              {selectedParams.open && <TableCell>Open</TableCell>}
              {selectedParams.high && <TableCell>High</TableCell>}
              {selectedParams.low && <TableCell>Low</TableCell>}
              {selectedParams.graph && <TableCell>Graph</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock, index) => (
              <TableRow key={index}>
                <TableCell>{stock.symbol}</TableCell>
                {selectedParams.price && <TableCell style={{ color: parseFloat(stock.price) >= 0 ? 'green' : 'inherit', fontWeight: parseFloat(stock.price) >= 0 ? 600 : 500 }}>{stock.price}</TableCell>}
                {selectedParams.volume && <TableCell>{stock.volume}</TableCell>}
                {selectedParams.open && <TableCell>{stock.open}</TableCell>}
                {selectedParams.high && <TableCell>{stock.high}</TableCell>}
                {selectedParams.low && <TableCell>{stock.low}</TableCell>}
                {selectedParams.graph && (
                  <TableCell>
                    <img src={`https://www.alphavantage.co/chart/v=1.0&t=1d&symbol=${stock.symbol}&apikey=YOUR_ALPHA_VANTAGE_API_KEY`} alt="Stock Graph" />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} className="custom-modal">
        <Box className="modal-content">
          <h2>Add New Stock</h2>
          <FormControl fullWidth>
            <InputLabel id="demo-stocks-label">Select Demo Stock</InputLabel>
            <Select
              labelId="demo-stocks-label"
              id="demo-stocks"
              value={newStock.symbol}
              name="symbol"
              onChange={handleChange}
            >
              {demoStocks.map((stock) => (
                <MenuItem key={stock.symbol} value={stock.symbol}>
                  {stock.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={selectedParams.price} onChange={handleParamChange} name="price" />}
                label="Price"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedParams.volume} onChange={handleParamChange} name="volume" />}
                label="Volume"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedParams.open} onChange={handleParamChange} name="open" />}
                label="Open"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedParams.high} onChange={handleParamChange} name="high" />}
                label="High"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedParams.low} onChange={handleParamChange} name="low" />}
                label="Low"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedParams.graph} onChange={handleParamChange} name="graph" />}
                label="Graph"
              />
            </FormGroup>
          </FormControl>
          <Button onClick={handleAddStock} variant="contained" color="primary">
            Add Stock
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default StockMPage;
