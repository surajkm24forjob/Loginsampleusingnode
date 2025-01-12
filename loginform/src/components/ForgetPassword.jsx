// ForgetPassword.js
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const ForgetPassword = () => {
    const [password, setPassword] = useState('');
    const [cnfpassword, setCnfPassword] = useState('');
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
       
        if(!password || !cnfpassword) {
            alert("Please fill all the fields")
            setError('Please fill all the fields');
            return;
        }

        if (password!==cnfpassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`${apiBaseUrl}/forget-password`, {
                username,
                password,
                PASSNEW : cnfpassword,
                
            },{
               headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
               } 
            }).then(console.log(`Password & Confirm Password ${username} is `, password , cnfpassword))
         
         if (response.data.message ==="Password Updated Successfully") {
                    setSuccess('Password Updated Successfully!');
                    setError(null);
                    setPassword('');
                    setCnfPassword('');
                    localStorage.removeItem('forgotPasswordUsername');
                    alert("Password changed successfully! Login again")
                    setTimeout(()=>navigate('/login'),2000);
                   } else {
                    setError(response.data.message);
                   } 
            
           
         
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='forgetuser'>
            <h5>Forget Password</h5>
            <form onSubmit={handleSubmit} className='form formdisplay mx-auto m-4 p-4 w-100 border rounded-3 '>
                <div className="mb-3">
                <label className='form-label' >create New Password</label>
                </div>
                <div className="mb-3">
                <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className='form-control'
                    />
                </div>
                <div className="mb-3">
                <label htmlFor="" className='form-label' >confirm Password</label>
                </div>
                <div className="mb-3">
                <input type="password" name="cnfpassword" id="cnfpassword" value={cnfpassword} onChange={(event)=>setCnfPassword(event.target.value)} className='form-control'/>
                </div>
                <button className='btn btn-success d-flex mx-auto' type="submit">Reset Password</button>
                <div className='divforforgetpass mt-3'>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                </div>
                   </form>
        </div>
    );
};

export default ForgetPassword;