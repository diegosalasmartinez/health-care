import {
    GET_APPOINTMENTS,
    CREATE_APPOINTMENT,
    UPDATE_APPOINTMENT,
    DELETE_APPOINTMENT,
    ERROR_APPOINTMENT
} from '../actions/actionTypes/appointmentActionTypes'

const initialState = {
    appointments: [],
    length: 0,
    error: "",
    loaded: false,
    failed: false
};

const appointment = (state = initialState, action) => {    
    switch(action.type){
        case GET_APPOINTMENTS:
            return {...state, appointments: [...action.playload.appointments], length: action.playload.length, error: "", loaded: true, failed: false};
        case CREATE_APPOINTMENT:
            return {...state, appointments: [...state.appointments, action.playload], error: "", loaded: true, failed: false};
        case UPDATE_APPOINTMENT:
            const appointmentsUpdated = state.appointments.map(u => u._id === action.playload._id ? {...action.playload} : {...u});
            return {...state, appointments: [...appointmentsUpdated], error: "", loaded: true, failed: false};
        case DELETE_APPOINTMENT:
            const appointmentsDeleted = state.appointments.filter(u => u._id !== action.playload._id);
            return {...state, appointments: [...appointmentsDeleted], error: "", loaded: true, failed: false};
        case ERROR_APPOINTMENT:
            return {...state, error: action.playload, loaded: true, failed: true};
        default:
            return {...state};
    }
}

export default appointment