import {
    GET_DOCTORS,
    CREATE_DOCTOR,
    UPDATE_DOCTOR,
    DELETE_DOCTOR,
    ERROR_DOCTOR
} from '../actions/actionTypes/doctorActionTypes'

const initialState = {
    doctors: [],
    length: 0,
    error: "",
    loaded: false,
    failed: false
};

const doctor = (state = initialState, action) => {    
    switch(action.type){
        case GET_DOCTORS:
            return {...state, doctors: [...action.playload.doctors], length: action.playload.length, error: "", loaded: true, failed: false};
        case CREATE_DOCTOR:
            return {...state, doctors: [...state.doctors, action.playload], error: "", loaded: true, failed: false};
        case UPDATE_DOCTOR:
            const doctorsUpdated = state.doctors.map(d => d._id === action.playload._id ? {...action.playload} : {...d});
            return {...state, doctors: [...doctorsUpdated], error: "", loaded: true, failed: false};
        case DELETE_DOCTOR:
            const doctorsDeleted = state.doctors.filter(d => d._id !== action.playload._id);
            return {...state, doctors: [...doctorsDeleted], error: "", loaded: true, failed: false};
        case ERROR_DOCTOR:
            return {...state, error: action.playload, loaded: true, failed: true};
        default:
            return {...state};
    }
}

export default doctor