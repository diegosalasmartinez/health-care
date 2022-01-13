import {
    GET_APPOINTMENTS,
    GET_APPOINTMENTS_COMPLETED,
    CREATE_APPOINTMENT,
    UPDATE_APPOINTMENT,
    DELETE_APPOINTMENT,
    ERROR_APPOINTMENT,
    COMPLETE_APPOINTMENT
} from '../actions/actionTypes/appointmentActionTypes'

const initialState = {
    appointments: [],
    appointmentsCompleted: [],
    length: 0,
    lengthCompleted: 0,
    error: "",
    loaded: false,
    failed: false
};

const appointment = (state = initialState, action) => {    
    switch(action.type){
        case GET_APPOINTMENTS:
            return {...state, appointments: [...action.playload.appointments], length: action.playload.length, error: "", loaded: true, failed: false};
        case GET_APPOINTMENTS_COMPLETED:
            return {...state, appointmentsCompleted: [...action.playload.appointments], lengthCompleted: action.playload.length, error: "", loaded: true, failed: false};
        case CREATE_APPOINTMENT:
            return {...state, appointments: [...state.appointments, action.playload], error: "", loaded: true, failed: false};
        case UPDATE_APPOINTMENT:
            const appointmentsUpdated = state.appointments.map(u => u._id === action.playload._id ? {...action.playload} : {...u});
            return {...state, appointments: [...appointmentsUpdated], error: "", loaded: true, failed: false};
        case COMPLETE_APPOINTMENT:
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