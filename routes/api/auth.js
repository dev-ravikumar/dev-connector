const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require('../../model/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// Get the User 
router.get('/',auth, async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
})

//Login The user and Get the token
router.post('/',[
    check('email', 'Please provide a valid email').isEmail(),
    check('password','Password is required').exists()
] ,async (req,res)=>{
try {
   const errors = validationResult(req);

   if(!errors.isEmpty()){
       return res.status(400).json({ errors : errors.array()});
   }

   const { email, password } = req.body;

   const user = await User.findOne({email});

   if(!user){
       return res.status(400).json({errors : [{msg : 'Invaild Credentials'}]})
   }

   const isMatch = await bcrypt.compare( password , user.password);

   if(!isMatch){
    return res.status(400).json({errors : [{msg : 'Invaild Credentials'}]})
   }

   const payload = {
       user : {
           id : user.id
       }
   }

   jwt.sign(payload,config.get('jwtSecret'),{expiresIn : 360000},
   (err,token)=>{
       if (err) throw err;
       res.json({token})
   })

} catch (error) {
    console.error(error)
    return res.status(500).send('Server Error')
}
})

module.exports = router