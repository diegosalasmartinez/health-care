import {
    GET_PATIENTS,
    CREATE_PATIENT,
    UPDATE_PATIENT,
    DELETE_PATIENT,
    STAGE_PATIENT,
    ERROR_PATIENT
} from '../actions/actionTypes/patientActionTypes'
import PatientModel from './../../models/PatientModel';

const initialState = {
    patients: [],
    length: 0,
    patientSelected: new PatientModel(),
    error: "",
    loaded: false,
    failed: false
};

const patient = (state = initialState, action) => {    
    switch(action.type){
        case GET_PATIENTS:
            return {...state, patients: [...action.playload.patients], length: action.playload.length, error: "", loaded: true, failed: false};
        case CREATE_PATIENT:
            return {...state, patients: [...state.patients, action.playload], error: "", loaded: true, failed: false};
        case UPDATE_PATIENT:
            const patientsUpdated = state.patients.map(d => d._id === action.playload._id ? {...action.playload} : {...d});
            return {...state, patients: [...patientsUpdated], error: "", loaded: true, failed: false};
        case DELETE_PATIENT:
            const patientsDeleted = state.patients.filter(d => d._id !== action.playload._id);
            return {...state, patients: [...patientsDeleted], error: "", loaded: true, failed: false};
        case STAGE_PATIENT:
            return {...state, patientSelected: {...action.playload}, error: "", loaded: true, failed: false};
        case ERROR_PATIENT:
            return {...state, error: action.playload, loaded: true, failed: true};
        default:
            return {...state};
    }
}

export default patient