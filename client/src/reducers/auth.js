import { REGISTER_SUCCESS ,REGISTER_FAIL , USER_LOADED , AUTH_ERR ,LOGIN_FAIL,LOGIN_SUCCESS , LOGOUT, PROFILE_DELETED} from '../actions/types';

const initialState ={
    token : localStorage.getItem('token'),
    isAuth : null,
    loading : true,
    user : null
}

export default function(state = initialState , action){
    const { type, payload } = action;
    switch(type){
        case USER_LOADED : 
        return {
            ...state,
            isAuth : true,
            loading : false,
            user : payload
        }
        case REGISTER_SUCCESS :
        case LOGIN_SUCCESS :    
            localStorage.setItem('token' , payload.token);
         return {
             ...state,
             ...payload,
             isAuth : true,
             loading : false
         }
         case REGISTER_FAIL :
         case AUTH_ERR :  
         case LOGIN_FAIL :  
         case LOGOUT : 
         case PROFILE_DELETED : 
             localStorage.removeItem('token');
             return{
                 ...state,
                 token : null,
                 isAuth : false,
                 loading : false
             } 
          default :
          return state      
    }
}