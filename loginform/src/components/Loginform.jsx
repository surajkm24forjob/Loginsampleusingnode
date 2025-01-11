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
      
               
        if(!username ||  !password) {
            alert("Please fill all the fields")
            setError('Please fill all the fields');
            return;
        }

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
            <h5>Login</h5>
            <form onSubmit={handleSubmit} className='form formdisplay mx-auto m-4 p-4 w-100 border rounded-3'>
                <div className="mb-3">
                <label className='form-label' > Username </label>
                </div>
                <div className="mb-3">
                <input type="text" className='form-control' value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className="mb-3">
                <label className='form-label' >Password</label>
                </div>
                <div className="mb-3">
                <input type="password" className='form-control' value={password} onChange={(event) => {setPassword(event.target.value)
                     if (error===!null && event.target.value ===!'') {
                                setError(null);
                            }
                        }}
                    />
                </div>
                <button  className='btn btn-success d-flex mx-auto' type="submit">Login</button>
              <div className='divforforgetpass mt-3'>
              <h6 >Forgot Password <a href="" onClick={handleforgetpassword} > click here!</a></h6>
                {error && <p style={{ color: 'red' }}>{error}</p>}
          
              </div>
            </form>
        </div>
    );
};

export default Loginform;