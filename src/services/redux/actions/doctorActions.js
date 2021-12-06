import {
    GET_DOCTORS,
    CREATE_DOCTOR,
    UPDATE_DOCTOR,
    ERROR_DOCTOR
} from './actionTypes/doctorActionTypes'
import {
    getDoctors as getDoctorsAPI
} from './../../api/doctor-api'
import {
    createUser as createUserAPI,
    updateUser as updateUserAPI
} from './../../api/user-api'

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

const createDoctor = (doctor) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        doctor.role = "DOCTOR";
        const res = await createUserAPI(doctor);
        let doctorResponse = {...res.user};
        doctorResponse.personInfo = {...res.personInfo};
        doctorResponse.doctorInfo = {...res.doctorInfo};

        return dispatch({
            type: CREATE_DOCTOR,
            playload: doctorResponse
        })
    } catch(e){
        message = e.response.data.message;
    }
    return dispatch({
        type: ERROR_DOCTOR,
        playload: message
    })
}

const updateDoctor = (doctor) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await updateUserAPI(doctor);
        return dispatch({
            type: UPDATE_DOCTOR,
            playload: doctor
        })
    } catch(e){
        message = e.response.data.message;
    }
    return dispatch({
        type: ERROR_DOCTOR,
        playload: message
    })
}

export { getDoctors, createDoctor, updateDoctor }
