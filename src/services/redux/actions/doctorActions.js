import {
    GET_DOCTORS,
    CREATE_DOCTOR,
    UPDATE_DOCTOR,
    DELETE_DOCTOR,
    ERROR_DOCTOR
} from './actionTypes/doctorActionTypes'
import {
    UNAUTHORIZED
} from './actionTypes/authActionTypes'
import {
    getDoctors as getDoctorsAPI
} from './../../api/doctor-api'
import {
    createUser as createUserAPI,
    updateUser as updateUserAPI,
    deleteUser as deleteUserAPI
} from './../../api/user-api'

const getDoctors = (pagination, searchParams) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await getDoctorsAPI(pagination, searchParams);
        return dispatch({
            type: GET_DOCTORS,
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
        doctorResponse.doctorInfo = {...res.doctorInfo, specialtyInfo: {...res.specialtyInfo}};

        return dispatch({
            type: CREATE_DOCTOR,
            playload: doctorResponse
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

const deleteDoctor = (doctor) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await deleteUserAPI(doctor);
        return dispatch({
            type: DELETE_DOCTOR,
            playload: doctor
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
        type: ERROR_DOCTOR,
        playload: message
    })
}

export { getDoctors, createDoctor, updateDoctor, deleteDoctor }
