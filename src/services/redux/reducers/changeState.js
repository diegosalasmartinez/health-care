import {
    CHANGE_STATE
  } from '../actions/actionTypes/changeStateActionTypes'
  
  const initialState = {
    sidebarShow: 'true'
  }
  
  const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case CHANGE_STATE:
        return {...state, ...rest }
      default:
        return {...state}
    }
  }
  
  export default changeState
  