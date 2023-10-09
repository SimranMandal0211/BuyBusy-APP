import '../styles/Navbar.css';
import homeIcon from '../assets/images/homeIcon.png';
import signInIcon from '../assets/images/signInIcon.png';

function Navbar(){
    return(
        <div className='nav-container'>
            <div>
                <h2>BuyBusy</h2>
            </div>
            <div className='nav-btns'>
                <span><img src={homeIcon} alt='home' width='40' height='40' /> Home</span>
                <span><img src={signInIcon} alt='home' width='40' height='40' /> Login</span>
            </div>
        </div>
    );
}

export default Navbar;