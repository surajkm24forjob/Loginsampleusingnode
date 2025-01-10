// Register.js
import  { useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/register', {
                username,
                email,
                password,
            });
            console.log(response.data);
            setUsername('');
            setEmail('');
            setPassword('');
            history('/login');
        } catch (err) {
            setError(err);
        }
    };

const handleRegisterUser = ()=>{
    localStorage.setItem('forgotPasswordUsername' ,username);
       history('/login');
}

    return (
        <div className='registeruser '>
            <h5>Register</h5>
            <form onSubmit={handleSubmit} className='form-sm mx-auto w-25'>
                <div className="mb-3">
                <label >Username</label>
                </div>
                <div className="mb-3">
                <input type="text" className='form-control' value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className="mb-3">
                <label>Email</label>
                </div>
               <div className="mb-3">
               <input className='form-control' type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
               </div>
                <div className="mb-3">
                <label>Password </label>
                </div>
                <div className="mb-3">
                <input className='form-control' type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                
                </div>
                
                <button className='btn btn-success' type="submit" onClick={handleRegisterUser}>Register</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Register;