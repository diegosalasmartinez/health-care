import { combineReducers } from 'redux'

import changeState from './changeState'
import doctor from './doctorReducer'

const rootReducer = combineReducers({
	changeState,
	doctor
})

export default rootReducer
