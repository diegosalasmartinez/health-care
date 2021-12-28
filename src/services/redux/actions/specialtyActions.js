import {
    GET_SPECIALTIES,
    CREATE_SPECIALTY,
    UPDATE_SPECIALTY,
    DELETE_SPECIALTY,
    ERROR_SPECIALTY
} from './actionTypes/specialtyActionTypes'
import {
    UNAUTHORIZED
} from './actionTypes/authActionTypes'
import {
    getSpecialties as getSpecialtiesAPI,
    createSpecialty as createSpecialtyAPI,
    updateSpecialty as updateSpecialtyAPI,
    deleteSpecialty as deleteSpecialtyAPI
} from '../../api/specialty-api'

const getSpecialties = () => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await getSpecialtiesAPI();
        return dispatch({
            type: GET_SPECIALTIES,
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
        type: ERROR_SPECIALTY,
        playload: message
    })
}

const createSpecialty = (specialty) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await createSpecialtyAPI(specialty);

        return dispatch({
            type: CREATE_SPECIALTY,
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
        type: ERROR_SPECIALTY,
        playload: message
    })
}

const updateSpecialty = (specialty) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await updateSpecialtyAPI(specialty);
        return dispatch({
            type: UPDATE_SPECIALTY,
            playload: specialty
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
        type: ERROR_SPECIALTY,
        playload: message
    })
}

const deleteSpecialty = (specialty) => async (dispatch) => {
    let message = "There was a problem with the server. Sorry :("
    try {
        const res = await deleteSpecialtyAPI(specialty);
        return dispatch({
            type: DELETE_SPECIALTY,
            playload: specialty
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
        type: ERROR_SPECIALTY,
        playload: message
    })
}

export { getSpecialties, createSpecialty, updateSpecialty, deleteSpecialty }
