import {
    GET_USERS,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    ERROR_USER
} from './actionTypes/userActionTypes'
import {
    getUsers as getUsersAPI,
    createUser as createUserAPI,
    updateUser as updateUserAPI,
    deleteUser as deleteUserAPI
} from '../../api/user-api'

const getUsers = () => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await getUsersAPI();
        return dispatch({
            type: GET_USERS,
            playload: res
        })
    } catch(e){
        message = e.response.data.message;
    }
    return dispatch({
        type: ERROR_USER,
        playload: message
    })
}

const createUser = (user) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await createUserAPI(user);
        let userResponse = {...res.user};
        userResponse.personInfo = {...res.personInfo};

        return dispatch({
            type: CREATE_USER,
            playload: userResponse
        })
    } catch(e){
        message = e.response.data.message;
    }
    return dispatch({
        type: ERROR_USER,
        playload: message
    })
}

const updateUser = (user) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await updateUserAPI(user);
        return dispatch({
            type: UPDATE_USER,
            playload: user
        })
    } catch(e){
        message = e.response.data.message;
    }
    return dispatch({
        type: ERROR_USER,
        playload: message
    })
}

const deleteUser = (user) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await deleteUserAPI(user);
        return dispatch({
            type: DELETE_USER,
            playload: user
        })
    } catch(e){
        message = e.response.data.message;
    }
    return dispatch({
        type: ERROR_USER,
        playload: message
    })
}

export { getUsers, createUser, updateUser, deleteUser }
