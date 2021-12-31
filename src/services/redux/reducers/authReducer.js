import {
    LOGIN,
    LOGOUT,
    UNAUTHORIZED,
    ERROR_AUTH
} from '../actions/actionTypes/authActionTypes'

const initialState = {
    user: {
        role: "",
        name: "",
        lastName: ""
    },
    token: "",
    error: "",
    loaded: false,
    failed: false
};

const doctor = (state = initialState, action) => {    
    switch(action.type){
        case UNAUTHORIZED:
        case LOGOUT:
            return {...initialState, loaded: true, failed: false};
        case LOGIN:
            return {...state, user: {...action.playload.user}, token: action.playload.token, error: "", loaded: true, failed: false};
        case ERROR_AUTH:
            return {...initialState, error: action.playload, loaded: true, failed: true};
        default:
            return {...state};
    }
}

export default doctor