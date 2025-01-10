// Login.js
import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Loginform = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                username,
                password,
            });
            console.log(response.data);

        if (response.data.message ==='Login Successfull') {
            console.log('Login Successfull');
        }else{
            setError(response.data.message);;
        }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleforgetpassword = (e) =>{
        e.preventDefault();
        navigate('/forgotpassword');
    }

    return (
        <div className='loginuser'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className='form mx-auto w-25'>
                <div className="mb-3">
                <label> Username </label>
                </div>
                <div className="mb-3">
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className="mb-3">
                <label>Password</label>
                </div>
                <div className="mb-3">
                <input
                        type="password"
                        value={password}
                        onChange={(event) => {setPassword(event.target.value)
                            if (error===!null && event.target.value ===!'') {
                                setError(null);
                            }
                        }}
                    />
                </div>
                <button type="submit">Login</button>
                <h6>Forgot Password <a href="" onClick={handleforgetpassword} >click here!</a></h6>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Loginform;