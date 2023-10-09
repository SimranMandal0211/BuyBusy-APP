import '../styles/Navbar.css';
import homeIcon from '../assets/images/homeIcon.png';
import signInIcon from '../assets/images/signInIcon.png';
import signOutIcon from '../assets/images/signOut.png';

import { Link, NavLink, Outlet } from 'react-router-dom';

function Navbar(){
    return(
    <>
        <div className='nav-container'>
            <Link to='/'>
                <h2>BuyBusy</h2>
            </Link>
            <div className='nav-btns'>
                <Link to='/'>
                    <span>
                        <img src={homeIcon} alt='home' width='40' height='40' /> Home
                    </span>
                </Link>
                
                <NavLink to='signin'>
                    {({ isActive }) => (
                        <span>
                        {isActive ? (
                            <>
                            <img src={signOutIcon} alt='signOut' width='40' height='40' /> Sign Out
                            </>
                        ) : (
                            <>
                            <img src={signInIcon} alt='signIn' width='40' height='40' /> Sign In
                            </>
                        )}
                        </span>
                    )}
                </NavLink>
                
            </div>
        </div>
        <Outlet />
    </>
    );
}

export default Navbar;