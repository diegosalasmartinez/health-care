import {
    GET_USERS,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    ERROR_USER
} from '../actions/actionTypes/userActionTypes'

const initialState = {
    users: [],
    length: 0,
    error: "",
    loaded: false,
    failed: false
};

const user = (state = initialState, action) => {    
    switch(action.type){
        case GET_USERS:
            return {...state, users: [...action.playload.users], length: action.playload.length, error: "", loaded: true, failed: false};
        case CREATE_USER:
            return {...state, users: [...state.users, action.playload], error: "", loaded: true, failed: false};
        case UPDATE_USER:
            const usersUpdated = state.users.map(u => u._id === action.playload._id ? {...action.playload} : {...u});
            return {...state, users: [...usersUpdated], error: "", loaded: true, failed: false};
        case DELETE_USER:
            const usersDeleted = state.users.filter(u => u._id !== action.playload._id);
            return {...state, users: [...usersDeleted], error: "", loaded: true, failed: false};
        case ERROR_USER:
            return {...state, error: action.playload, loaded: true, failed: true};
        default:
            return {...state};
    }
}

export default user