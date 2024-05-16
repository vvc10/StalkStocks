import React, { useState } from 'react';
import Sidebar from './Sidebar';
import StockMPage from './StockMPage';
import WatchList from './WatchList';
import './styles.css';

const Main = () => {
  const [currentPage, setCurrentPage] = useState('StockMPage'); // Default to StockMPage

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='Main_cont'>
      <Sidebar onPageChange={handlePageChange} />
      {/* Dashboard - Home*/}
      {currentPage === 'StockMPage' && <StockMPage />}
      {/* Watchlist - Home*/}
      {currentPage === 'WatchList' && <WatchList />}
    </div>
  );
};

export default Main;
