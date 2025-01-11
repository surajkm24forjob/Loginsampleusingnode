
import './App.css'
import ForgetPassword from './components/ForgetPassword';
import Loginform from './components/Loginform'
import Register from './components/RegisterUser'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export default function App() {
  

  return (
  
   <BrowserRouter>
   <Routes>
    <Route exact path='/' element={<Register/>}/>
    <Route exact path='/login' element={<Loginform/>}/>
    <Route exact path='/forgotpassword' element={<ForgetPassword/>}/>
   </Routes>
   </BrowserRouter>
   
  )
}

