import { combineReducers } from 'redux'

import changeState from './changeState'
import doctor from './doctorReducer'
import patient from './patientReducer'

const rootReducer = combineReducers({
	changeState,
	doctor,
	patient
})

export default rootReducer
