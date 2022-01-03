import React, { Component } from 'react'
import { CButton, CCol, CFormCheck, CFormInput, CFormLabel, CFormSelect, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react'
import actionTypes from '../../services/models/others/actionTypes'
import AppointmentModel, { validate } from '../../services/models/AppointmentModel'
import colorTypes from '../../services/models/others/colorTypes'
import { objIsNull } from '../../utils/utils'
import cloneDeep from 'lodash/cloneDeep'

export default class AppointmentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            firstTime: true,
            appointment: new AppointmentModel(),
            errors: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible})
            if (this.props.visible) {
                if (this.props.mode === actionTypes.UPDATE) {
                    this.setState({appointment: cloneDeep(this.props.appointmentSelected)});
                } else {
                    const newAppointment = new AppointmentModel();
                    newAppointment.patientId = this.props.patientSelected._id;
                    this.setState({appointment: newAppointment});
                }
            }
        }
    }

    onChange = (key, isNumeric = false, isDate = false) => (e = {}) => {
        const { appointment } = this.state;
            let val = isNumeric ? parseInt(e.target.value || '0') : (isDate) ? moment(e).format("YYYY-MM-DD") : e.target.value;
            let appointmentUpdated = { ...appointment };
            const keys = key.split(".");
            if (keys.length > 1) {
                appointmentUpdated[keys[0]][keys[1]] = val;
            } else {
                appointmentUpdated[key] = val;
            }
            this.setState({appointment: appointmentUpdated});
    }
    
    onSave = () => {
        this.setState({firstTime: false});
        const errors = validate(this.state.appointment);
        if (objIsNull(errors)) {
            this.props.onSave(this.state.appointment);
        }
        this.setState({errors: errors});
    }

    onClose = () => {
        this.setState({visible: false});
        this.props.onClose();
    }

    render() {
        const { visible, appointment, errors, firstTime } = this.state;
        const { mode } = this.props;
        const title = mode === actionTypes.CREATE ? "Add a new appointment" : "Update appointment";
        const txtButton = mode === actionTypes.CREATE ? "Register" : "Update";
        const color = mode === actionTypes.CREATE ? colorTypes.SUCCESS : colorTypes.WARNING;
        
        return (
            <COffcanvas placement="end" visible={visible} onHide={this.onClose}>
                <COffcanvasHeader>
                    <COffcanvasTitle>{title}</COffcanvasTitle>
                </COffcanvasHeader>
                <COffcanvasBody>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="room" className="col-sm-4 col-form-label">Room</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="room" value={appointment.room} onChange={this.onChange('room', false, false)} invalid={!firstTime && errors.room !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="floor" className="col-sm-4 col-form-label">Floor</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="floor" value={appointment.room} onChange={this.onChange('floor', false, false)} invalid={!firstTime && errors.floor !== null}/>
                        </CCol>
                    </CRow>
                    <CCol xs="12" className="right-side my-3">
                        <CButton color={colorTypes.LIGHT} style={{marginRight: "1rem"}} onClick={this.onClose}>Back</CButton>
                        <CButton color={color} onClick={this.onSave}>{txtButton}</CButton>
                    </CCol>
                </COffcanvasBody>
            </COffcanvas>
        )
    }
}
