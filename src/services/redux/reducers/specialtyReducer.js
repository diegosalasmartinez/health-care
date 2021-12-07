import {
    GET_SPECIALTIES,
    CREATE_SPECIALTY,
    UPDATE_SPECIALTY,
    DELETE_SPECIALTY,
    ERROR_SPECIALTY
} from '../actions/actionTypes/specialtyActionTypes'

const initialState = {
    specialties: [],
    error: "",
    loaded: false,
    failed: false
};

const specialty = (state = initialState, action) => {    
    switch(action.type){
        case GET_SPECIALTIES:
            return {...state, specialties: [...action.playload], error: "", loaded: true, failed: false};
        case CREATE_SPECIALTY:
            return {...state, specialties: [...state.specialties, action.playload], error: "", loaded: true, failed: false};
        case UPDATE_SPECIALTY:
            const specialtiesUpdated = state.specialties.map(d => d._id === action.playload._id ? {...action.playload} : {...d});
            return {...state, specialties: [...specialtiesUpdated], error: "", loaded: true, failed: false};
        case DELETE_SPECIALTY:
            const specialtiesDeleted = state.specialties.filter(d => d._id !== action.playload._id);
            return {...state, specialties: [...specialtiesDeleted], error: "", loaded: true, failed: false};
        case ERROR_SPECIALTY:
            return {...state, error: action.playload, loaded: true, failed: true};
        default:
            return {...state};
    }
}

export default specialty