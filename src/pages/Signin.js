import {useRef} from 'react';
import {Link} from 'react-router-dom';
import '../styles/signInUp.css';

function Signin(){
    const emailRef = useRef();
    const passwordref = useRef();

    function handleSubmit(e){
        e.preventDefault();
        const data = {
            email: emailRef.current.value,
            password: passwordref.current.value
        }

        console.log('input signIn data: ', data);
    }

    return(
        <div className='sign-container'>
            <div className='sign-form-container'>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email"
                        required
                        placeholder="Enter Email"
                        ref={emailRef}
                        className='input-field'
                    />
                    <br />
                    <input type="password"
                        required
                        placeholder="Enter Password"
                        ref={passwordref}
                        className='input-field'
                    />
                    <br />
                    <button className='input-field'>Submit</button>
                </form>
                <br />
                <Link to='/signup'><span>or Create New Account</span></Link>
            </div>
        </div>
    )
}

export default Signin;