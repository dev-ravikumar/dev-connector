import axios from 'axios';
import { GET_PROFILE, PROFILE_ERR, 
    UPDATE_PROFILE, CLEAR_PROFILE, 
    PROFILE_DELETED , GET_REPOS, GET_PROFILES } from '../actions/types';
import {setAlert} from '../actions/alert';

// Getting the user profile
export const getCurrentProfile = () => async dispatch =>{

    try {
        const profile = await axios.get('/api/profile/me');

        dispatch({
            type : GET_PROFILE,
            payload : profile.data
        })  
    } catch (error) {
        
        dispatch({
            type : PROFILE_ERR,
            payload : { msg : error.response.statusText , status : error.response.status}
        })
    }  
}

// Getting All profiles
export const getProfiles = () => async dispatch =>{
    dispatch({type : CLEAR_PROFILE})
    try {
        const profiles = await axios.get('/api/profile');

        dispatch({
            type : GET_PROFILES,
            payload : profiles.data
        })  
    } catch (error) {
        
        dispatch({
            type : PROFILE_ERR,
            payload : { msg : error.response.statusText , status : error.response.status}
        })
    }  
}

// Getting Profile By ID
export const getProfileById = userid => async dispatch =>{
    try {
        const profile = await axios.get(`/api/profile/user/${userid}`);

        dispatch({
            type : GET_PROFILE,
            payload : profile.data
        })  
    } catch (error) {
        
        dispatch({
            type : PROFILE_ERR,
            payload : { msg : error.response.statusText , status : error.response.status}
        })
    }  
}

// Getting Github Repos
export const getGithubRepos = username => async dispatch =>{
    try {
        const profile = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type : GET_REPOS,
            payload : profile.data
        })  
    } catch (error) {
        
        dispatch({
            type : PROFILE_ERR,
            payload : { msg : error.response.statusText , status : error.response.status}
        })
    }  
}

// Create and update profile
export const createProfile = (formData , history , edit = false) => async dispatch =>{
try {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const res = await axios.post('/api/profile', formData , config);
    dispatch({
        type : GET_PROFILE,
        payload : res.data
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created' , 'success'));
    if(!edit){
        history.push('/dashboard');
    }
} catch (error) {
    const errors = error.response.data.errors;
    if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg , 'danger')));
    }
    dispatch({
        type : PROFILE_ERR,
        payload : { msg : error.response.statusText , status : error.response.status}
    })
}
}

// Add Experience
export const addExp = (formData , history , edit = false) => async dispatch =>{
try {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const res = await axios.put('/api/profile/experience', formData , config);
    dispatch({
        type : UPDATE_PROFILE,
        payload : res.data
    });
    dispatch(setAlert('Experience Added' , 'success'));
        history.push('/dashboard');
 
} catch (error) {
    const errors = error.response.data.errors;
    if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg , 'danger')));
    }
    dispatch({
        type : PROFILE_ERR,
        payload : { msg : error.response.statusText , status : error.response.status}
    })
}
}
// Add Education
export const addEdu = (formData , history , edit = false) => async dispatch =>{
try {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const res = await axios.put('/api/profile/education', formData , config);
    dispatch({
        type : UPDATE_PROFILE,
        payload : res.data
    });
    dispatch(setAlert('Education Added' , 'success'));
        history.push('/dashboard');
 
} catch (error) {
    const errors = error.response.data.errors;
    if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg , 'danger')));
    }
    dispatch({
        type : PROFILE_ERR,
        payload : { msg : error.response.statusText , status : error.response.status}
    })
}
}
// Delete Education
export const deleteEdu = id => async dispatch =>{
try {
    
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
        type : UPDATE_PROFILE,
        payload : res.data
    });
    dispatch(setAlert('Education Deleted' , 'success'));
 
} catch (error) {
    dispatch({
        type : PROFILE_ERR,
        payload : { msg : error.response.statusText , status : error.response.status}
    })
}
}
// Delete experience
export const deleteExperience = id => async dispatch =>{
try {
    
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
        type : UPDATE_PROFILE,
        payload : res.data
    });
    dispatch(setAlert('Experience Deleted' , 'success'));
 
} catch (error) {
    dispatch({
        type : PROFILE_ERR,
        payload : { msg : error.response.statusText , status : error.response.status}
    })
}
}
// Delete Account
export const deleteProfile = id => async dispatch =>{
    if(window.confirm('Are you sure to delete profile')){
        try {
            const res = await axios.delete(`/api/profile`);
            dispatch({
                type : CLEAR_PROFILE
            });
            dispatch({
                type : PROFILE_DELETED
            })
            dispatch(setAlert('Profile successfully deleted' , 'success'));
         
        } catch (error) {
            dispatch({
                type : PROFILE_ERR,
                payload : { msg : error.response.statusText , status : error.response.status}
            })
        }
        }
    }
