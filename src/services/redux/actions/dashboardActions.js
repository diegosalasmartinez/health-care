import {
    GET_BEST_DOCTORS,
    GET_BEST_SPECIALTIES,
    GET_DASHBOARD_HISTORY
} from './actionTypes/dashboardActionTypes'
import {
    UNAUTHORIZED
} from './actionTypes/authActionTypes'
import {
    getBestDoctors as getBestDoctorsAPI,
    getBestSpecialties as getBestSpecialtiesAPI,
    getDashboardHistory as getDashboardHistoryAPI
} from '../../api/dashboard-api'

const getBestDoctors = () => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await getBestDoctorsAPI();
        return res;
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
        type: ERROR_DOCTOR,
        playload: message
    })
}

const getBestSpecialties = () => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await getBestSpecialtiesAPI();
        return res;
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
        type: ERROR_DOCTOR,
        playload: message
    })
}

const getDashboardHistory = () => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await getDashboardHistoryAPI();
        return res;
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
        type: ERROR_DOCTOR,
        playload: message
    })
}

export { getBestDoctors, getBestSpecialties, getDashboardHistory }
