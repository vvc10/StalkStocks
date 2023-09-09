import React from 'react'
import newGif from '../assets/images/newgif.gif';
const WhatNews = () => {
    return (
        <div className='whatnews_tab'>
            <div className='et_head'>What's New?</div>
            <div className='et_main'><img src={newGif}/>Features are still updating.. stay tuned!</div>
        </div>
    )
}

export default WhatNews;
