import {useRef} from 'react';

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
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type='text'
                    required
                    placeholder='Enter Name'
                    ref={nameRef}
                />
                <br />
                <input type='email'
                    required
                    placeholder='Enter Email'
                    ref={emailRef}
                />
                <br />
                <input type='password'
                    required
                    placeholder='Enter Password'
                    ref={passwordRef}
                />
                <br />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Signup;