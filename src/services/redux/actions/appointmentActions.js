import {
    GET_APPOINTMENTS,
    GET_APPOINTMENTS_COMPLETED,
    CREATE_APPOINTMENT,
    UPDATE_APPOINTMENT,
    COMPLETE_APPOINTMENT,
    DELETE_APPOINTMENT,
    ERROR_APPOINTMENT
} from './actionTypes/appointmentActionTypes'
import {
    UNAUTHORIZED
} from './actionTypes/authActionTypes'
import {
    getAppointments as getAppointmentsAPI,
    getAppointmentsCompleted as getAppointmentsCompletedAPI,
    createAppointment as createAppointmentAPI,
    updateAppointment as updateAppointmentAPI,
    completeAppointment as completeAppointmentAPI,
    deleteAppointment as deleteAppointmentAPI
} from '../../api/appointment-api'

const getAppointments = (pagination, searchParams) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await getAppointmentsAPI(pagination, searchParams);
        return dispatch({
            type: GET_APPOINTMENTS,
            playload: res
        })
    } catch(e){
        if (e.response && e.response.statusText === "Unauthorized") {
            return dispatch({
                type: UNAUTHORIZED
            })
        }
        if (e.response && e.response.data && e.response.data.message) {
            message = e.response.data.message;
        }
    }
    return dispatch({
        type: ERROR_APPOINTMENT,
        playload: message
    })
}

const getAppointmentsCompleted = (pagination, searchParams) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await getAppointmentsCompletedAPI(pagination, searchParams);
        return dispatch({
            type: GET_APPOINTMENTS_COMPLETED,
            playload: res
        })
    } catch(e){
        if (e.response && e.response.statusText === "Unauthorized") {
            return dispatch({
                type: UNAUTHORIZED
            })
        }
        if (e.response && e.response.data && e.response.data.message) {
            message = e.response.data.message;
        }
    }
    return dispatch({
        type: ERROR_APPOINTMENT,
        playload: message
    })
}


const createAppointment = (appointment) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        let newAppointment = {...appointment};
        const res = await createAppointmentAPI(appointment);
        newAppointment._id = res._id;

        return dispatch({
            type: CREATE_APPOINTMENT,
            playload: newAppointment
        })
    } catch(e){
        if (e.response && e.response.statusText === "Unauthorized") {
            return dispatch({
                type: UNAUTHORIZED
            })
        }
        if (e.response && e.response.data && e.response.data.message) {
            message = e.response.data.message;
        }
    }
    return dispatch({
        type: ERROR_APPOINTMENT,
        playload: message
    })
}

const updateAppointment = (appointment) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await updateAppointmentAPI(appointment);
        return dispatch({
            type: UPDATE_APPOINTMENT,
            playload: appointment
        })
    } catch(e){
        if (e.response && e.response.statusText === "Unauthorized") {
            return dispatch({
                type: UNAUTHORIZED
            })
        }
        if (e.response && e.response.data && e.response.data.message) {
            message = e.response.data.message;
        }
    }
    return dispatch({
        type: ERROR_APPOINTMENT,
        playload: message
    })
}

const completeAppointment = (appointment) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await completeAppointmentAPI(appointment);
        return dispatch({
            type: COMPLETE_APPOINTMENT,
            playload: appointment
        })
    } catch(e){
        if (e.response && e.response.statusText === "Unauthorized") {
            return dispatch({
                type: UNAUTHORIZED
            })
        }
        if (e.response && e.response.data && e.response.data.message) {
            message = e.response.data.message;
        }
    }
    return dispatch({
        type: ERROR_APPOINTMENT,
        playload: message
    })
}

const deleteAppointment = (appointment) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await deleteAppointmentAPI(appointment);
        return dispatch({
            type: DELETE_APPOINTMENT,
            playload: appointment
        })
    } catch(e){
        if (e.response && e.response.statusText === "Unauthorized") {
            return dispatch({
                type: UNAUTHORIZED
            })
        }
        if (e.response && e.response.data && e.response.data.message) {
            message = e.response.data.message;
        }
    }
    return dispatch({
        type: ERROR_APPOINTMENT,
        playload: message
    })
}

export { getAppointments, getAppointmentsCompleted, createAppointment, updateAppointment, completeAppointment, deleteAppointment }
