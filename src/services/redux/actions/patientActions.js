import {
    GET_PATIENTS,
    CREATE_PATIENT,
    UPDATE_PATIENT,
    DELETE_PATIENT,
    ERROR_PATIENT,
    STAGE_PATIENT
} from './actionTypes/patientActionTypes'
import {
    UNAUTHORIZED
} from './actionTypes/authActionTypes'
import {
    getPatients as getPatientsAPI,
    createPatient as createPatientAPI,
    updatePatient as updatePatientAPI,
    deletePatient as deletePatientAPI
} from '../../api/patient-api'
import cloneDeep from 'lodash/cloneDeep'

const getPatients = (pagination, searchParams) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await getPatientsAPI(pagination, searchParams);
        return dispatch({
            type: GET_PATIENTS,
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
        type: ERROR_PATIENT,
        playload: message
    })
}

const createPatient = (patient) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await createPatientAPI(patient);
        let patientResponse = {...res.patient};
        patientResponse.personInfo = {...res.personInfo};

        return dispatch({
            type: CREATE_PATIENT,
            playload: patientResponse
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
        type: ERROR_PATIENT,
        playload: message
    })
}

const updatePatient = (patient) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await updatePatientAPI(patient);
        return dispatch({
            type: UPDATE_PATIENT,
            playload: patient
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
        type: ERROR_PATIENT,
        playload: message
    })
}

const deletePatient = (patient) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await deletePatientAPI(patient);
        return dispatch({
            type: DELETE_PATIENT,
            playload: patient
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
        type: ERROR_PATIENT,
        playload: message
    })
}

const stagePatient = (patient) => async (dispatch) => {
    return dispatch({
        type: STAGE_PATIENT,
        playload: cloneDeep(patient)
    })
}

export { getPatients, createPatient, updatePatient, deletePatient, stagePatient }
