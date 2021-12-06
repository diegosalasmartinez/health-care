import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as doctorActions from '../../services/redux/actions/doctorActions'

export class Doctors extends Component {
    async componentDidMount() {
        await this.props.getDoctors();
    }
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
        doctor: state.doctor
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(doctorActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Doctors)
