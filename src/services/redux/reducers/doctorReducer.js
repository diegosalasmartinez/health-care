import {
    GET_DOCTORS,
    ERROR_DOCTOR
} from '../actions/actionTypes/doctorActionTypes'

const initialState = {
    doctors: [],
    error: "",
    loaded: false,
    failed: false
};

const doctor = (state = initialState, action) => {    
    switch(action.type){
        case GET_DOCTORS:
            return {...state, doctors: [...action.playload], error: "", loaded: true, failed: false};
        case ERROR_DOCTOR:
            return {...state, error: action.playload, loaded: true, failed: true};
        default:
            return {...state};
    }
}

export default doctor