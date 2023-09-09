
import React from 'react';
// import styles from './styles.module.css';
import UserDropDown from './UserDropDown.js'
import Navbar from './Navbar.js';
import './main.css'
// import { initializeApp } from "firebase/app";
import './main.css'
import InputPrompt from './InputPrompt'
import { useState } from 'react';
import Explore from './Explore';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ImageFrame from './ImageFrame';
import Login from './Login.js';
import GenerateImg from './GenerateImg.js';
import MyPosts from './MyPosts.js';
import WhatNews from './WhatNews.js';
function Home() {


    const stylesidebar = {
        width: '15%',
        height: '90vh',
        color: 'white',
        backgroundColor: '#000521',
        padding: '20px'

    }

    const ulstyle = {
        color: 'white'
    }
    return (
        <>


            <Navbar />

            <div className="main_ar" style={{ display: 'flex', backgroundColor: '#000521' }}>

                <div className="d-flex flex-column flex-shrink-0" style={stylesidebar}>

                    <ul className="nav nav-pills flex-column mb-auto" style={ulstyle}>

                        <li className="nav-item" style={ulstyle}>
                            {/* <svg class="bi me-2" width="16" height="16"><use xlink: href="#home" /></svg> */}
                            <NavLink exact activeClassName="active" to="/GenerateImg" className='nav-item-link'>Generate</NavLink>
                        </li>
                        <li >
                            {/* <svg class="bi me-2" width="16" height="16"><use xlink: href="#speedometer2" /></svg> */}
                            <NavLink activeClassName="active" to="/explore">Explore</NavLink>
                        </li>
                        <li>
                            {/* <svg class="bi me-2" width="16" height="16"><use xlink: href="#table" /></svg> */}
                            <NavLink to="/myposts">My Posts</NavLink>
                        </li>

                        <li>
                            {/* <svg class="bi me-2" width="16" height="16"><use xlink: href="#people-circle" /></svg> */}
                            <NavLink activeClassName="active" to="/whatnews">What's new?</NavLink>
                        </li>
                    </ul>
                    <hr />
                    <div className="sidebar_bottom">

                        <button className='Github_btn'><a href='https://github.com/vvc10'><i class="fa fa-github"></i> </a> </button>
                        <button className='qs_btn'> <i class="fa fa-question "></i></button>
                    </div>
                </div>


                <div className='main_center'>

                    <Routes>
                        {/* <Route exact path='/' element={<ImageFrame />}></Route> */}

                        <Route exact path='/GenerateImg' element={< GenerateImg />}></Route>

                        <Route exact path='/myposts' element={< MyPosts />}></Route>

                        <Route exact path='/explore' element={< Explore />}></Route>
                        <Route exact path='/whatnews' element={<WhatNews />}></Route>
                        {/* <Route path='/login' element={<Login/>}/> */}
                    </Routes>

                </div>

            </div>


        </>

    );
}

export default Home;
