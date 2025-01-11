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
        
        if(!username || !email || !password) {
                alert("Please fill all the fields")
                setError('Please fill all the fields');
                return;
            }


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
            handleRegisterUser();
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
        <div className='registeruser'>
     
      <h5>Register Here!</h5>
            <form onSubmit={handleSubmit} className='form formdisplay mx-auto m-4 p-4 w-100 border rounded-3 '>
              
                <div className="mb-3">
                <label className='form-label' >Username</label>
                </div>
                <div className="mb-3">
                <input type="text" className='form-control' value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className="mb-3">
                <label className='form-label'>Email</label >
                </div>
               <div className="mb-3">
               <input className='form-control' type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
               </div>
                <div className="mb-3">
                <label className='form-label'>Password </label >
                </div>
                <div className="mb-3">
                <input className='form-control' type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                
                </div>
                
                <button className='btn btn-success d-flex mx-auto' type="submit">Register</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        
      </div>
     
    );
};

export default Register;