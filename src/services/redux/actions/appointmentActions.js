import {
    GET_APPOINTMENTS,
    CREATE_APPOINTMENT,
    UPDATE_APPOINTMENT,
    DELETE_APPOINTMENT,
    ERROR_APPOINTMENT
} from './actionTypes/appointmentActionTypes'
import {
    UNAUTHORIZED
} from './actionTypes/authActionTypes'
import {
    getAppointments as getAppointmentsAPI,
    createAppointment as createAppointmentAPI,
    updateAppointment as updateAppointmentAPI,
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

const createAppointment = (appointment) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        console.log(appointment);
        const res = await createAppointmentAPI(appointment);
        console.log(res);
        // let AppointmentResponse = {...res.appointment};
        // AppointmentResponse.personInfo = {...res.personInfo};

        return dispatch({
            type: CREATE_APPOINTMENT,
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

export { getAppointments, createAppointment, updateAppointment, deleteAppointment }
