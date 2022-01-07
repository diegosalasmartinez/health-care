import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appointmentActions from '../../services/redux/actions/appointmentActions'

export class Appointments extends Component {
    render() {
        return (
            <div>
                Hola
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        appointment: state.appointment
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(Object.assign({}, appointmentActions), dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Appointments)
