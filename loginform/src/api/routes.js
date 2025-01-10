// routes.js
const express = require('express');
const router = express.Router();
const User = require('../api/user');
const bcrypt = require('bcrypt')

// User registration API
router.post('/register',async (req, res) => {
        try {
           const {username, email,password} = req.body;
           const Hashpassword = await bcrypt.hash(password, 10) 
           const user  = new User({username,email,password : Hashpassword})
           await user.save();
           
            res.send({message:"User registered successfully"})
        } catch (error) {
            res.status(500).send({message:"User Registration Failed try again later"});
        }
});

// User login API
router.post('/login',async (req, res) => {
        
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username})

            if(!user){
                return res.status(401).send({message:"Invalid username or password"})
            }


            const isValidPassword = await bcrypt.compare(password , user.password);
            if(!isValidPassword){
                return res.status(401).send({message:"Invalid username or password"})
            }

            res.send({message:"Login Successfull"});
        } catch (error) {
            res.status(500).send({message:'Internal Server Error'});
        }
});

function authenticateToken(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).send({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(400).send({ message: 'Invalid token.' });
    }
  }
  
// Forget user password API
router.post('/forget-password',authenticateToken, async(req, res) => {
            try {
                const {username, password,cnfPassword}= req.body;

                const user = await User.findOne({username});
                console.log(user);
                if(!user){
                    return res.status(401).send({message:"Invalid username or password"})
                }
                if(password !== cnfPassword){
                return res.status(401).send({message:"Password and Confirm Password does not match"})
                }else{
                    const Hashpassword = await bcrypt.hash(password, 10);
                }
                user.password = Hashpassword;
                await user.save();
                res.send({message:"Password Updated Successfully"});
                
            } catch (error) {
                res.status(500).send({message:'Internal Server Error'});
            }
});



module.exports = router;