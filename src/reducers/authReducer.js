import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCES,
    REGISTER_SUCCES,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGIN_TOKEN,
    NOT_LOGGEDIN,
    SOCIAL_LOGIN,
    REGISTER_FAIL,

} from '../actions/types';

const initialState = {
    token: null,
    isAuthenticated: false,
    isLoading: false,
    user: null,
}

export default function (state = initialState, action ){
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN_TOKEN:
            localStorage.setItem('token', action.payload.token);
            console.log('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            };
        case SOCIAL_LOGIN:
          
            if(action.payload.restaurant !== null || action.payload.restaurant !== 'null'){
                /* localStorage.setItem('restaurant_id', action.payload.restaurant.id) */
            }
            localStorage.setItem('user-email', action.payload.email);
            localStorage.setItem('username', action.payload.name);
            localStorage.setItem('authenticated', true);
            return {
                ...state,
                ...action.payload,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case LOGIN_SUCCES:
        case REGISTER_SUCCES:
            console.log('token', action.payload.access_token)
         
            localStorage.setItem('user-email', action.payload.user.email);
            localStorage.setItem('id', action.payload.user.id);
            localStorage.setItem('username', action.payload.user.name);
            localStorage.setItem('token', action.payload.access_token);
            localStorage.setItem('authenticated', true); 
            if(action.payload.user.restaurant){
                localStorage.setItem('restaurant_id', action.payload.user.restaurant[0])
            }
          
           
            return {
                ...state,
                ...action.payload,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case NOT_LOGGEDIN:
           
            return {
                ...state,
                isAuthenticated:false,
                isLoading:false,
                token: null,
                user: null,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('restaurant_id')
            localStorage.removeItem('user-email');
            localStorage.removeItem('id');
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            localStorage.removeItem('user')
            localStorage.removeItem('authenticated');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false 
            };
        default:
            return state; 
    }
}