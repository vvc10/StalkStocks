import React from 'react'
import './main.css'
import { NavLink } from 'react-router-dom'
const BottomBar = () => {
    return (
        <div>
            <div className='res_bottombar'>
                <ul>
                    <li className="nav-item">
                        {/* <svg class="bi me-2" width="16" height="16"><use xlink: href="#home" /></svg> */}
                        <NavLink exact activeClassName="active" to="/" className='nav-item-link'>Generate</NavLink>
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
            </div>
        </div>
    )
}

export default BottomBar
