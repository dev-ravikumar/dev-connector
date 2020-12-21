const express = require('express');
const { request } = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../model/Post');
const User = require('../../model/User');


// Adding the post
router.post('/',[
    auth,
    check('text','Text is Required').not().isEmpty()
] ,async (req,res)=>{
    try {
        let errors  = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors : errors.array() });
        }

        const user = await User.findById(req.user.id).select('-password');

        let objPost = new Post({
            user : req.user.id,
            text : req.body.text,
            name : user.name,
            avatar : user.avatar
        });

        const post = await objPost.save();
        return res.json(post);

    } catch (error) {
        console.error(error)
        return res.status(500).send('Server Error');
    }
})

// Get all the posts
router.get('/',auth, async (req,res)=>{
    try {
        const posts = await Post.find().sort({ date : -1 });
        res.json(posts)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error')
    }
})

// Get post by id
router.get('/:post_id', auth , async (req,res)=>{
    try {
        const post = await Post.findById(req.params.post_id);
        
        if(!post){
            return res.status(404).json( { msg : 'Post Not FOund' });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        if(error.kind == 'ObjectId'){
            return res.status(404).json( { msg : 'Post Not FOund' });
        }
        return res.status(500).send('Server Error');
    }
})


// Delete Post
router.delete('/:post_id', auth , async(req,res)=>{
    try {
        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(404).json({ msg :'Post Not Found' })
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg : 'UnAuthorized User' })
        }
        await post.remove();
        res.send('Post Removed')
    } catch (error) {
        console.error(error);
        if(error.kind == 'ObjectId'){
            return res.status(404).json( { msg : 'Post Not FOund' });
        }
        return res.status(500).send('Server Error')
    }
})
// Likes on Posts
router.put('/likes/:post_id', auth , async(req,res) =>{
    try {

        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(404).json({ msg :'Post Not Found' })
        }
        // Check for the previous Likes
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg : 'Post already liked'});
        }
        post.likes.unshift({ user : req.user.id });

       await post.save();
        res.json(post.likes)
        
    } catch (error) {
        console.error(error);
        if(error.kind == 'ObjectId'){
            return res.status(404).json( { msg : 'Post Not FOund' });
        }
        return res.status(500).send('Server Error')
    }
})
// UnLikes on Posts
router.put('/unlikes/:post_id', auth , async(req,res) =>{
    try {

        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(404).json({ msg :'Post Not Found' })
        }
        // Check for the previous Likes
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.json({msg : 'Post has to be like first'});
        }
      const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
      post.likes.splice(removeIndex,1);

       await post.save();
        res.json(post.likes)
        
    } catch (error) {
        console.error(error);
        if(error.kind == 'ObjectId'){
            return res.status(404).json( { msg : 'Post Not FOund' });
        }
        return res.status(500).send('Server Error')
    }
})

// Adding a comment
router.put('/comment/:post_id', [
    auth,
    check('text', 'text is required').not().isEmpty()
] , async(req,res) =>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors : errors.array() })
        }

        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(404).json({ msg :'Post Not Found' })
        }
        // Find the user
        const user = await User.findById(req.user.id).select('-password');
        const newComment = new Post({
            text : req.body.text,
            user : req.user.id,
            name : user.name,
            avatar : user.avatar
        })

        post.comment.unshift(newComment);
        await post.save();
        res.json(post.comment)
        
    } catch (error) {
        console.error(error);
        if(error.kind == 'ObjectId'){
            return res.status(404).json( { msg : 'Post Not FOund' });
        }
        return res.status(500).send('Server error');
    }
})

// Delet the comment
router.delete('/comment/:post_id/:comment_id' , auth , async(req,res) =>{
    try {
        
        const post = await Post.findById(req.params.post_id);

        if(!post){
            return res.status(404).json({ msg : 'Post not found' });
        }

        const comment = post.comment.find(comment => comment.id === req.params.comment_id);
        
        if(!comment) {
            return res.status(404).json( { msg : 'Comment Not Found' });
        }
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({ msg : 'Unauthorized User' });
        }
        const removeIndex = post.comment.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comment.splice(removeIndex,1);

        await post.save();
        res.json(post.comment);
    } catch (error) {
        console.error(error);
        if(error.kind == 'ObjectId'){
            return res.status(404).json( { msg : 'Post Not FOund' });
        }
        return res.status(500).send('Server error');
    }
})
module.exports = router