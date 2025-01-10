// ForgetPassword.js
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const ForgetPassword = () => {
    const [password, setPassword] = useState('');
    const [cnfpassword, setcnfPassword] = useState('');
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [success, setSuccess] = useState();


    useEffect(() => {
      const Storedusername = localStorage.getItem('forgotPasswordUsername');
      console.log("Stored Username  " + Storedusername);
      if (Storedusername) {
        setUsername(Storedusername);  
      }
      
    }, [])
    
    

    const handleSubmit = async (event) => {
        event.preventDefault();
       
      

        if (password!==cnfpassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://localhost:8080/api/forget-password', {
                username,
                password,
                cnfpassword,
                
            },{
               headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
               } 
            }).then(console.log(username,password,cnfpassword))
            .then((response)=>{
                if (response.data.message ==="Password Updated Successfully") {
                    setSuccess('Password Updated Successfully!');
                    setError(null);
                    setPassword('');
                    setcnfPassword('');
                    localStorage.removeItem('forgotPasswordUsername');
                    setTimeout(()=>navigate('/login'),2000);
                   } else {
                    setError(response.data.message);
                   } 
            })
            .catch((error)=>{
                setError(error.message);
            });
         
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Forget Password</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    create New Password:
                  
                </label>
                <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                <br />
                <label htmlFor="">confirm Password</label>
                <input type="password" name="cnfpassword" id="cnfpassword" value={cnfpassword} onChange={(event)=>setcnfPassword(event.target.value)}/>
                <button type="submit">Reset Password</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>
        </div>
    );
};

export default ForgetPassword;