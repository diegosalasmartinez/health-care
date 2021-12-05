import {
    CHANGE_STATE
} from './actionTypes/changeStateActionTypes'

const toggleSidebar = (value) => {
    return ({
        type: CHANGE_STATE,
        sidebarShow: value
    })
}

export { toggleSidebar }
