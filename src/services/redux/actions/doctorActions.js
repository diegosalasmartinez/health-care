import {
    GET_DOCTORS,
    CREATE_DOCTOR,
    ERROR_DOCTOR
} from './actionTypes/doctorActionTypes'
import {
    getDoctors as getDoctorsAPI,
    createDoctor as createDoctorAPI
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

const createDoctor = (doctor) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        doctor.role = "DOCTOR";
        const res = await createDoctorAPI(doctor);
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

export { getDoctors, createDoctor }
