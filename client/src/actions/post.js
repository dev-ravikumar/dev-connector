import axios from 'axios';
import { GET_POSTS , POST_ERR ,UPDATE_LIKES , REMOVE_POST, ADD_POST , GET_POST , ADD_COMMENT , DELETE_COMMENT} from './types';
import { setAlert } from '../actions/alert'; 

//Get All Posts
export const getAllPosts = () => async dispatch =>{
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type : GET_POSTS,
            payload : res.data
        })
        
    } catch (error) {
        dispatch({
            type : POST_ERR,
            payload : {msg : error.response.statusText , status : error.response.status}
        })
    }
  
}

//Get  Post
export const getPost = postid => async dispatch =>{
    try {
        const res = await axios.get(`/api/posts/${postid}`);
        dispatch({
            type : GET_POST,
            payload : res.data
        })
        
    } catch (error) {
        dispatch({
            type : POST_ERR,
            payload : {msg : error.response.statusText , status : error.response.status}
        })
    }
  
}
//Add Likes
export const addLike = postid => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/likes/${postid}`);
        dispatch({
            type : UPDATE_LIKES,
            payload : {postid , likes : res.data}
        })
        
    } catch (error) {
        dispatch({
            type : POST_ERR,
            payload : {msg : error.response.statusText , status : error.response.status}
        })
    }
  
}
//Remove Likes
export const removeLike = postid => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/unlikes/${postid}`);
        dispatch({
            type : UPDATE_LIKES,
            payload : {postid , likes : res.data}
        })
        
    } catch (error) {
        dispatch({
            type : POST_ERR,
            payload : {msg : error.response.statusText , status : error.response.status}
        })
    }
  
}
//Delete Post
export const deletePost = postid => async dispatch =>{
    try {
        const res = await axios.delete(`/api/posts/${postid}`);
        dispatch({
            type : REMOVE_POST,
            payload : postid
        })
        
     dispatch(setAlert('Post Removed' , 'Success') )  
        
    } catch (error) {
        dispatch({
            type : POST_ERR,
            payload : {msg : error.response.statusText , status : error.response.status}
        })
    }
  
}
//Add Post
export const addPost = (formdata) => async dispatch =>{
    try {
        const config = {
            headers : {
                'Content-Type' :'application/json'
            }
        }
        const body = JSON.stringify({text : formdata})
    
        const res = await axios.post('/api/posts' , body, config);
        dispatch({
            type : ADD_POST,
            payload : res.data
        })
        
     dispatch(setAlert('Post Added' , 'Success') )  
        
    } catch (error) {
        dispatch({
            type : POST_ERR,
            payload : {msg : error.response.statusText , status : error.response.status}
        })
    }
  
}
//Add Comment
export const addComment = (postid ,formdata) => async dispatch =>{
    try {
        const config = {
            headers : {
                'Content-Type' :'application/json'
            }
        }
        const body = JSON.stringify({text : formdata})
    
        const res = await axios.put(`/api/posts/comment/${postid}` , body, config);
        dispatch({
            type : ADD_COMMENT,
            payload : res.data
        })
        
     dispatch(setAlert('Comment Added' , 'Success') )  
        
    } catch (error) {
        dispatch({
            type : POST_ERR,
            payload : {msg : error.response.statusText , status : error.response.status}
        })
    }
  
}
//Delete Comment
export const deleteComment = (postid , commentid) => async dispatch =>{
    try {
    
       await axios.delete(`/api/posts/comment/${postid}/${commentid}`);
        dispatch({
            type : DELETE_COMMENT,
            payload : commentid
        })
        
     dispatch(setAlert('Comment Deleted' , 'Success') )  
        
    } catch (error) {
        dispatch({
            type : POST_ERR,
            payload : {msg : error.response.statusText , status : error.response.status}
        })
    }
  
}