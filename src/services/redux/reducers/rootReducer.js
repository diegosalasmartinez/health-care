import { combineReducers } from 'redux'

import changeState from './changeState'
import doctor from './doctorReducer'
import patient from './patientReducer'
import specialty from './specialtyReducer'

const rootReducer = combineReducers({
	changeState,
	doctor,
	patient,
	specialty
})

export default rootReducer
