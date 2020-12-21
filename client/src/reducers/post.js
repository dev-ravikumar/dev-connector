import { GET_POSTS , POST_ERR, UPDATE_LIKES, REMOVE_POST, ADD_POST , GET_POST, ADD_COMMENT, DELETE_COMMENT } from '../actions/types';

const initiaState = {
    posts : [],
    post : null,
    loading : true,
    error : {}
}

export default function (state = initiaState , action) {
const { type , payload } = action;
switch(type){
    case ADD_POST : 
    return {
        ...state ,
        posts : [payload,...state.posts ],
        loading : false
    }
    case GET_POSTS : 
    return {
        ...state,
        posts : payload ,
        loading : false
    }
    case GET_POST : 
    return {
        ...state,
        post : payload ,
        loading : false
    }
    case POST_ERR : 
    return {
        ...state,
        error : payload,
        loading : false
    }
    case UPDATE_LIKES : 
    return {
        ...state,
        posts : state.posts.map(post => post._id === payload.postid ? {...post , likes : payload.likes} : post),
        loading : false
    }
    case ADD_COMMENT : 
    return {
        ...state,
        post : {...state.post , comment : payload},
        loading : false
    }
    case DELETE_COMMENT :
        return {
            ...state,
            post : {...state.post , comment : state.post.comment.filter(comment => comment._id !== payload)},
            loading : false
        }
    case REMOVE_POST : 
    return{
        ...state,
        posts : state.posts.filter(post => post._id !== payload),
        loading : false
    }
  
     default : 
        return state
}
}