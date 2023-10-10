import {useRef} from 'react';
import '../styles/signInUp.css';

function Signup(){
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit(e){
        e.preventDefault();

        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password:passwordRef.current.value
        }

        console.log('signUp data', data);
    }

    return(
        <div className='sign-container'>
            <div className='sign-form-container'>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input type='text'
                        required
                        placeholder='Enter Name'
                        ref={nameRef} 
                        className='input-field'
                    />
                    <br />
                    <input type='email'
                        required
                        placeholder='Enter Email'
                        ref={emailRef} 
                        className='input-field'
                    />
                    <br />
                    <input type='password'
                        required
                        placeholder='Enter Password'
                        ref={passwordRef} 
                        className='input-field'
                    />
                    <br />
                    <button className='input-field'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;