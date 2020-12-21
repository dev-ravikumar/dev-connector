const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../model/Profile');
const request = require ('request');
const config = require('config');
const User = require('../../model/User');
const Post = require('../../model/Post');
const { check,validationResult } = require('express-validator');
// APi for getting a user

router.get('/me',auth ,async (req,res)=>{
    try {
        const profile = await Profile.findOne({user : req.user.id}).populate('user',['name' , 'avatar']);

        if(!profile){
            return res.status(400).json( { msg : 'There is no profile for this user'});
        }
        res.json(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error')
    }
})

// For updating and adding a profile

router.post('/',[auth,
check('status', 'Status is Required').not().isEmpty(),
check('skills','Skills are required').not().isEmpty()
], async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() })
    }
    const {
        company,
        website,
        location,bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // Build profile Object
    const profileFields = {};
    profileFields.user = req.user.id;

    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(status) profileFields.status = status;
    if(bio) profileFields.bio = bio;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
        profileFields.skills = skills.split(',').map((item) => item.trim())
    }
  // Build Social Object
  profileFields.social = {};
  if(youtube) profileFields.social.youtube = youtube;
  if(twitter) profileFields.social.twitter = twitter;
  if(instagram) profileFields.social.instagram = instagram;
  if(linkedin) profileFields.linkedin = linkedin;
  if(facebook) profileFields.social.facebook = facebook;

  try {
    
    let profile = await Profile.findOne({ user : req.user.id });

    if(profile){
    profile = await Profile.findOneAndUpdate({ user : req.user.id },
         { $set : profileFields },
         { new : true });
         return res.json(profile)
    }
  //Create
  profile  = new Profile(profileFields);
   await profile.save()
   res.json(profile)

  } catch (error) {
      console.error(error)
      return res.status(500).send('Server error')
  }

});

// Get all the profiles
router.get('/', async (req,res)=>{
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        return res.json(profiles)
        
    } catch (error) {
        console.error(error)
        return res.status(500).send('Server error')
    }
});

//Get user profile by user id
router.get('/user/:user_id', async(req,res)=>{
    try {
        const profile = await Profile.findOne({ user :  req.params.user_id }).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({ msg : 'Profile Not Found' });
        }
        return res.json(profile);
    } catch (error) {
        console.error(error);
        // if(error.kind == 'Object_Id'){
        //     return res.status(400).json({ msg : 'Profile Not Found' });
        // }
        return res.status(500).send('Server Error');
    }
  
})

// Delete the profile and user and posts
router.delete('/',auth, async(req,res)=>{
    try {
        // Delete all post
        await Post.deleteMany({ user : req.user.id });
        // This Deletes the profile
        await Profile.findOneAndDelete({ user : req.user.id });
        // This deletes the user
        await User.findOneAndDelete( { _id : req.user.id });

        return res.json({ msg : 'User Removed' });
        
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error')
    }
});

//Adding the experiene
router.put('/experience',[
    auth,
    check('title', 'Title cannot be Empty').not().isEmpty(),
    check('company', 'Company cannot be Empty').not().isEmpty(),
    check('location', 'Location cannot be Empty').not().isEmpty(),
    check('from', 'From Date cannot be Empty').not().isEmpty()
], async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() })
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    let experienceFields = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try {
        const profile  = await Profile.findOne({ user : req.user.id });
        profile.experience.unshift(experienceFields);
        await profile.save();

        res.json(profile)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
        
    }
})
// Delete user experience
router.delete('/experience/:exp_id', auth, async(req,res) =>{
    try {
    let profile = await Profile.findOne({ user : req.user.id});
    
    // Get Remove experience index
    const removeIndex = profile.experience.map((item) => item.id).indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex,1);

    await profile.save();
    return res.json(profile);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
})
//Adding the education
router.put('/education',[
    auth,
    check('school', 'School cannot be Empty').not().isEmpty(),
    check('degree', 'Degree cannot be Empty').not().isEmpty(),
    check('fieldofstudy', 'Field of Study cannot be Empty').not().isEmpty(),
    check('from', 'From Date cannot be Empty').not().isEmpty()
], async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() })
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    let educationFields = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    try {
        const profile  = await Profile.findOne({ user : req.user.id });
        profile.education.unshift(educationFields);
        await profile.save();

        res.json(profile)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
        
    }
})
// Delete user education
router.delete('/education/:edu_id', auth, async(req,res) =>{
    try {
    let profile = await Profile.findOne({ user : req.user.id});
    
    // Get Remove experience index
    const removeIndex = profile.education.map((item) => item.id).indexOf(req.params.edu_id);
    profile.education.splice(removeIndex,1);

    await profile.save();
    return res.json(profile);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
})

//Github
router.get('/github/:username',async (req,res) =>{
    try {
        let options = {
            uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5
            &sort=created:asc&client_id=${config.get('githubClientid')}&client_secret=${config.get('githubClientSecret')}`,
            method :`GET`,
            headers : {'user-agent':'node.js'}
        }
    
        request(options,(error,response,body)=>{
            if(error) console.error(error);
    
            if(response.statusCode !==200){
                return res.status(404).json({ msg :'No Github User Found' })
            }

            res.json(JSON.parse(body));
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }

})
module.exports = router