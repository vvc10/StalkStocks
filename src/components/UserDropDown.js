import Dropdown from 'react-bootstrap/Dropdown';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Auth } from "../firebase-config"
import { signOut } from 'firebase/auth';
import './main.css'
import { useNavigate } from 'react-router-dom';

function UserDropDown(handleLogin, handleLogout) {

    const [user] = useAuthState(Auth)
    const navigator = useNavigate()
    const logOut = async () => {
        await signOut(Auth)
        navigator("/login")
    }
    return (
        <>
            {user ? (
                <div style={{ display: 'flex' }}>
                    <Dropdown >
                        <Dropdown.Toggle id="dropdown-basic" style={{backgroundColor: 'transparent', border: '0px solid transparent', borderRadius: '100px', outline: '0px solid transparent', boxShadow: 'none' }}>
                            <button style={{ backgroundColor: 'transparent', border: '0px solid transparent', margin: 'auto 10px', padding: '5px', height: 'fit-content' }}><i class="fa fa-bell-o" aria-hidden="true" style={{ color: 'white', fontSize: '18px' }}></i></button>
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ width: '25vw', padding: '20px 0px' }}>
                            <div style={{ padding: '0px 20px', display: 'flex', backgroundColor: 'transparent', height: '20px' }}><span style={{ fontSize: '14px', fontWeight: '600' }}>Notifications</span><p style={{ padding: '0 10px', fontSize:'14px' }}>(0)</p></div>

                            <hr />
                            <Dropdown.Item href="#/action-1" style={{ backgroundColor: 'transparent' }}>

                                <div style={{ textAlign: 'center', width: '100%', padding: '0 10px', backgroundColor: 'transparent', height: '20px' }}>No notification!</div>




                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: 'transparent', border: '0px solid transparent', borderRadius: '100px', outline: '0px solid transparent', boxShadow: 'none' }}>
                            <img className='AcccountLogo' src={user.photoURL} alt="" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" style={{ backgroundColor: 'transparent' }}>
                                <div style={{ display: 'flex', fontSize: '14px', backgroundColor: 'transparent' }}>
                                    <img src={user.photoURL} style={{ height: '30px', borderRadius: '20px', margin: '0 10px' }} />
                                    <div style={{ padding: '0 10px' }}><span style={{ fontSize: '14px', fontWeight: '600' }}>{user.displayName}</span><p>{user.email}</p></div>

                                </div>
                                <button style={{ backgroundColor: '', border: '0px solid', width: '100%', textAlign: 'center', borderRadius: '10px', padding: '5px 0px' }}>View profile</button>
                            </Dropdown.Item>
                            <hr />
                            {/* <Dropdown.Item href="#/action-2" style={{background: 'transparent', fontSize: '14px'}}>Need Help?</Dropdown.Item> */}
                            <Dropdown.Item href="#/action-3" style={{ background: 'transparent', cursor: 'pointer' }}><button style={{ color: 'red', border: '0px solid transparent', fontSize: '14px', padding: '0', backgroundColor: 'transparent' }} onClick={logOut}>Logout</button></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>


            ) : (
                <button className="google-button" onClick={handleLogin}>
                    {/* <GoogleSvg /> */}
                    Login
                </button>
            )}




        </>
    );
}

export default UserDropDown;




