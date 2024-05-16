import React from 'react'
import Sidebar from './Sidebar'
import StockMPage from './StockMPage'
import './styles.css'

const Main = () => {
  return (
    <div className='Main_cont'>
      <Sidebar/>
      <StockMPage/>
    </div>
  )
}

export default Main
