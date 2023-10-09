import {useRef} from 'react';
import {Link} from 'react-router-dom';

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
        <div className='signIn-container'>
            <div className='signIn-form-container'>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email"
                        required
                        placeholder="Enter Email"
                        ref={emailRef}
                    />
                    <br />
                    <input type="password"
                        required
                        placeholder="Enter Password"
                        ref={passwordref}
                    />
                    <button>Submit</button>
                </form>
                <br />
                <Link to='/signup'>or Create New Account</Link>
            </div>
        </div>
    )
}

export default Signin;