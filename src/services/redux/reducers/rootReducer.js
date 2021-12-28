import { combineReducers } from 'redux'

import changeState from './changeState'
import doctor from './doctorReducer'
import patient from './patientReducer'
import specialty from './specialtyReducer'
import user from './userReducer'
import auth from './authReducer'

const rootReducer = combineReducers({
	changeState,
	doctor,
	patient,
	specialty,
	user,
	auth
})

export default rootReducer
