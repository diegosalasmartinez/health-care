import {
    GET_DOCTORS,
    ERROR_DOCTOR
} from './actionTypes/doctorActionTypes'
import {
    getDoctors as getDoctorsAPI
} from './../../api/doctor-api'

const getDoctors = () => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await getDoctorsAPI();
        return dispatch({
            type: GET_DOCTORS,
            playload: res
        })
    } catch(e){
        message = e.response.data.message;
    }
    return dispatch({
        type: ERROR_DOCTOR,
        playload: message
    })
}

export { getDoctors }
