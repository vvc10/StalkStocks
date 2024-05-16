import React from 'react'
import './Sidebar.css'
const Sidebar = ({ onPageChange }) => {
  return (

    <div className='sidebar'>
      <ul>
        <li onClick={() => onPageChange('StockMPage')}>Dashboard</li>
        <li onClick={() => onPageChange('WatchList')}>Watchlist</li>
      </ul>
    </div>
    
  )
}

export default Sidebar
