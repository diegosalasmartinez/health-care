import React, { Component } from 'react'
import { CButton, CCol, CFormInput, CFormLabel, CInputGroup, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import cloneDeep from 'lodash/cloneDeep'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'
import moment from 'moment'
import actionTypes from '../../services/models/others/actionTypes'
import AppointmentModel, { validate } from '../../services/models/AppointmentModel'
import colorTypes from '../../services/models/others/colorTypes'
import { objIsNull } from '../../utils/utils'
import DoctorSearch from '../doctors/DoctorSearch'
import PatientSearch from '../patients/PatientSearch'

export default class AppointmentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            firstTime: true,
            appointment: new AppointmentModel(),
            showDoctorModal: false,
            showPatientModal: false,
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
                    let newAppointment;
                    if (this.props.patientSelected) {
                        newAppointment = new AppointmentModel();
                        newAppointment.patientInfo = cloneDeep(this.props.patientSelected);
                    } else {
                        newAppointment = cloneDeep(this.props.appointmentSelected);
                    }
                    this.setState({appointment: newAppointment});
                }
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

    onCloseDoctorModal = () => {
        this.setState({showDoctorModal: false});
    }

    onClosePatientModal = () => {
        this.setState({showPatientModal: false});
    }

    onSelectDoctor = (d) => {
        const { appointment } = this.state;
        let appointmentUpdated = {...appointment};
        appointmentUpdated.doctorInfo = cloneDeep(d);
        this.setState({appointment: appointmentUpdated});
    }

    onSelectPatient = (p) => {
        const { appointment } = this.state;
        let appointmentUpdated = {...appointment};
        appointmentUpdated.patientInfo = cloneDeep(p);
        this.setState({appointment: appointmentUpdated});
    }

    isInvalid = (key) => {
        if (this.state.errors[key]) {
            return "form-control-date-invalid";
        } else {
            return "";
        }
    }

    render() {
        const { visible, appointment, errors, firstTime, showDoctorModal, showPatientModal } = this.state;
        const { mode, patientSelected } = this.props;
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
                        <CFormLabel htmlFor="patient" className="col-sm-4 col-form-label">Patient</CFormLabel>
                        <CCol sm={8}>
                            <CInputGroup>
                                <CFormInput type="text" id="patient" value={appointment.patientInfo.fullName} readOnly={true} invalid={!firstTime && errors.patientId !== null}/>
                                { !patientSelected &&
                                    <CButton onClick={() => {this.setState({showPatientModal: true})}}>
                                        <CIcon icon={cilMagnifyingGlass} size="sm"/>
                                    </CButton>
                                }
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="doctor" className="col-sm-4 col-form-label">Doctor</CFormLabel>
                        <CCol sm={8}>
                            <CInputGroup>
                                <CFormInput type="text" id="doctor" value={appointment.doctorInfo.fullName} readOnly={true} invalid={!firstTime && errors.doctorId !== null}/>
                                <CButton onClick={() => {this.setState({showDoctorModal: true})}}>
                                    <CIcon icon={cilMagnifyingGlass} size="sm"/>
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="floor" className="col-sm-4 col-form-label">Floor</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="floor" value={appointment.floor} onChange={this.onChange('floor', false, false)} invalid={!firstTime && errors.floor !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="room" className="col-sm-4 col-form-label">Room</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="room" value={appointment.room} onChange={this.onChange('room', false, false)} invalid={!firstTime && errors.room !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="date" className="col-sm-4 col-form-label">Date</CFormLabel>
                        <CCol sm={8}>
                            <DatePicker
                                className={this.isInvalid("date")}
                                format="dd-MM-y"
                                clearIcon={null}
                                value={appointment.date ? new Date(moment(appointment.date).format("YYYY-MM-DD HH:mm:ss")) : new Date()}
                                onChange={this.onChange('date', false, true)}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="time" className="col-sm-4 col-form-label">Time</CFormLabel>
                        <CCol sm={8}>
                            <TimePicker
                                className={this.isInvalid("time")}
                                autoFocus={false}
                                name="time"
                                clearIcon={null}
                                maxDetail="minute"
                                value={appointment.time}
                                onChange={this.onChange('time', false, false, true)}
                            />
                        </CCol>
                    </CRow>
                    <CCol xs="12" className="right-side my-3">
                        <CButton color={colorTypes.LIGHT} style={{marginRight: "1rem"}} onClick={this.onClose}>Back</CButton>
                        <CButton color={color} onClick={this.onSave}>{txtButton}</CButton>
                    </CCol>
                </COffcanvasBody>
                <DoctorSearch
                    visible={showDoctorModal}
                    onSelectDoctor={this.onSelectDoctor}
                    onClose={this.onCloseDoctorModal}
                />
                <PatientSearch
                    visible={showPatientModal}
                    onSelectPatient={this.onSelectPatient}
                    onClose={this.onClosePatientModal}
                />
            </COffcanvas>
        )
    }
}
