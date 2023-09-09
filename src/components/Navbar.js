import React from 'react';
// import styles from './styles.module.css';
import UserDropDown from './UserDropDown.js'
import './main.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Auth } from "../firebase-config"
import { signOut } from 'firebase/auth';
// import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import catLogo from '../assets/images/catlogo.png';
const Navbar = () => {
    const [user] = useAuthState(Auth)
    const navigator = useNavigate()
    const logOut = async () => {
        await signOut(Auth)
        navigator("/login")
    }


    return (
        <div className="home">
            <nav class="navbar navbar-expand-lg" style={{ backgroundColor: '#000521', padding: '20px 0' }}>
                <div className="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand" href="/GenerateImg" style={{ paddingLeft: '2%', color: 'white', fontWeight: '600' }}> <img src={catLogo} /> Sketchit</a>
                    <form class="d-flex" style={{ paddingLeft: '10%' }}>
                        <input class="form_control me-2" type="search" placeholder="Search ImgGen.." aria-label="Search" />
                        {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
                    </form>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul class="navbar-nav me-auto mb-lg-0">
                            <li class="nav-item">
                                <NavLink class="nav-link disabled" aria-current="page" to='#'>Blog</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink class="nav-link disabled" to='#'>Faqs</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink class="nav-link disabled" to='#' tabindex="-1" aria-disabled="true">Disabled</NavLink>
                            </li>
                        </ul>
                        {user ?
                            <div className='link'>
                                <div className='d-flex'>
                                    
                                    {/* <img className='logo' src={user.photoURL} alt="" /> */}
                                    <UserDropDown /></div>
                            </div>
                            : <NavLink className='link' to="/login">Login</NavLink>
                        }
                    </div>

                </div>
            </nav>
        </div>

    )
}

export default Navbar
