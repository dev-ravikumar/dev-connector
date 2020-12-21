const express = require('express');
const router = express.Router();
const User = require('../../model/User');
const gravatar = require('gravatar');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult, check}  = require('express-validator')

// Posts Data
router.post('/',[
    check('name' , 'Name is required').not().isEmpty(),
    check('email', 'Please Fill Correct Email').isEmail(),
    check('password', 'Password length must be equal or greater than 6').isLength({min : 6 })
] ,async (req,res)=>{
const errors = validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({errors :errors.array()})
}
 try {
    const { name , email , password } = req.body;

    let user = await User.findOne({ email });
    
    if(user){
      return  res.status(400).json({ errors : [ { msg : 'User Already Exists' }] })
    }
    
    // User Gravatar
    const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})
    
    user = new User({
        name,
        email,
        password,
        avatar
    })
    // encrypt Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Return jsonwebtoken
    const payload = {
        user : {
            id : user.id
        }
    }
    jwt.sign(payload, config.get("jwtSecret"), {expiresIn : 360000},
    (err,token)=>{
        if (err) throw err
        res.json({ token })
    });
 } catch (error) {
     console.error(error)
    return res.status(500).send('Server Error');
 }

})
module.exports = router