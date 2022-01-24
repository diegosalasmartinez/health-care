import React, { Component } from 'react'
import { CButton, CCol, CFormInput, CFormLabel, CInputGroup, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react'
import AppointmentModel from '../../services/models/AppointmentModel'
import cloneDeep from 'lodash/cloneDeep'
import moment from 'moment'
import colorTypes from '../../services/models/others/colorTypes'

export default class AppointmentCompletion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            appointment: new AppointmentModel(),
            firstTime: true,
            detailsValid: true
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible})
            if (this.props.visible) {
                this.setState({appointment: cloneDeep(this.props.appointmentSelected)});
            }
        }
    }

    onChange = (key, isNumeric = false, isDate = false, isTime = false) => (e = {}) => {
        const { appointment } = this.state;
            let val = isNumeric ? parseInt(e.target.value || '0') : (isDate) ? moment(e).format("YYYY-MM-DD") : (isTime) ? e : e.target.value;
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
        if (this.state.appointment.details !== "") {
            this.setState({detailsValid: true});
            this.props.onSave(this.state.appointment);
        } else {
            this.setState({detailsValid: false});
        }
    }

    onClose = () => {
        this.setState({visible: false});
        this.props.onClose();
    }

    render() {
        const { visible, appointment, detailsValid, firstTime } = this.state;
        const { historyMode } = this.props;
        const title = historyMode ? "Appointment Details" : "Complete appointment";

        return (
            <COffcanvas placement="end" visible={visible} onHide={this.onClose}>
                <COffcanvasHeader>
                    <COffcanvasTitle>{title}</COffcanvasTitle>
                </COffcanvasHeader>
                <COffcanvasBody>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="patient" className="col-sm-4 col-form-label">Patient</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="patient" value={appointment.patientInfo.fullName} readOnly={true}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="doctor" className="col-sm-4 col-form-label">Doctor</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="doctor" value={appointment.doctorInfo.fullName} readOnly={true}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="floor" className="col-sm-4 col-form-label">Floor</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="floor" value={appointment.floor} readOnly={true}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="room" className="col-sm-4 col-form-label">Room</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="room" value={appointment.room} readOnly={true}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="date" className="col-sm-4 col-form-label">Date</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="date" value={moment(appointment.date).format("YYYY-MM-DD")} readOnly={true}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="time" className="col-sm-4 col-form-label">Time</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="time" value={appointment.time} readOnly={true}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="details" className="col-sm-4 col-form-label">Details</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="details" value={appointment.details} onChange={this.onChange('details', false, false)} invalid={!firstTime && !detailsValid} readOnly={historyMode}/>
                        </CCol>
                    </CRow>
                    <CCol xs="12" className="right-side my-3">
                        <CButton color={colorTypes.LIGHT} onClick={this.onClose}>Back</CButton>
                        { !historyMode && <CButton color={colorTypes.PRIMARY} style={{marginLeft: "1rem"}} onClick={this.onSave}>Complete</CButton> }
                    </CCol>
                </COffcanvasBody>
            </COffcanvas>
        )
    }
}
