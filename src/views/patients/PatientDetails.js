import React, { Component } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormCheck, CFormInput, CFormLabel, CRow, CSpinner } from '@coreui/react'
import DatePicker from 'react-date-picker'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as patientActions from '../../services/redux/actions/patientActions'
import actionTypes from '../../services/models/others/actionTypes'
import PatientModel, { validate } from '../../services/models/PatientModel'
import colorTypes from '../../services/models/others/colorTypes'
import notification from '../../services/models/others/notification'
import Notification from '../../components/common/Notification'
import moment from 'moment'
import { objIsNull } from '../../utils/utils'
import Confirmation from '../../components/common/Confirmation'
import cloneDeep from 'lodash/cloneDeep'

export class PatientDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: new PatientModel(),
            firstTime: true, 
            errors: {},
            mode: actionTypes.NONE,
            showConfirmationModal: false,
            loaded: true,
            failed: false,
            notifications: []
        }
    }

    componentDidMount() {
        const mode = this.props.patient.patientSelected._id === "" ? actionTypes.CREATE : actionTypes.UPDATE;
        if (this.props.history.location.pathname === "/patients/update" && mode === actionTypes.CREATE) {
            this.props.history.push("/patients/create")
        } else {
            this.setState({patient: cloneDeep(this.props.patient.patientSelected), mode});
        }
    }

    onChange = (key, isNumeric = false, isDate = false) => (e = {}) => {
        const { patient } = this.state;
            let val = isNumeric ? parseInt(e.target.value || '0') : (isDate) ? moment(e).format("YYYY-MM-DD") : e.target.value;
            let patientUpdated = { ...patient };
            const keys = key.split(".");
            if (keys.length > 1) {
                patientUpdated[keys[0]][keys[1]] = val;
            } else {
                patientUpdated[key] = val;
            }
            this.setState({patient: patientUpdated});
    }
    
    onAccept = () => {
        this.setState({firstTime: false});
        const errors = validate(this.state.patient, this.state.mode);
        if (objIsNull(errors)) {
            this.setState({showConfirmationModal: true});
        }
        this.setState({errors: errors});
    }
    
    onDiscard = () => {
        this.setState({showConfirmationModal: false});
    }

    onSave = async () => {
        this.setState({loaded: false, failed: false});
        
        const { patient } = this.state;

        if (this.state.mode === actionTypes.CREATE) {
            await this.props.createPatient(patient);
        } else if(this.state.mode === actionTypes.UPDATE) {
            await this.props.updatePatient(patient);
        }
        const failed = this.props.patient.failed;
        if (failed) {
            const newNotification = new notification(colorTypes.DANGER, 'Error', this.props.patient.error); 
            this.setState({
                loaded: true, 
                failed: false, 
                notifications: [...this.state.notifications, newNotification]
            });
        } else {
            this.props.history.push("/patients");
        }
    }

    onClose = () => {
        this.props.history.push("/patients");
    }

    render() {
        const { patient, mode, loaded, failed, notifications, firstTime, errors, showConfirmationModal } = this.state;
        const title = mode === actionTypes.CREATE ? "Add a new patient" : "Update patient";
        const txtButton = mode === actionTypes.CREATE ? "Register" : "Update";
        const color = mode === actionTypes.CREATE ? colorTypes.SUCCESS : colorTypes.WARNING;

        return (
            <CRow>
                { notifications.map((notification, index) => 
                    <Notification key={index} mode={notification.mode} title={notification.title} body={notification.body}></Notification>
                )}
                { loaded && !failed && 
                    <CCol xs="12">
                        <CCard className="mb-3">
                            <CCardHeader style={{fontWeight: 500}}>Personal Information</CCardHeader>
                            <CCardBody>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="dni" className="col-sm-2 col-form-label">DNI</CFormLabel>
                                    <CCol sm={4}>
                                        <CFormInput type="text" id="dni" value={patient.personInfo.DNI} onChange={this.onChange('personInfo.DNI', false, false)} invalid={!firstTime && errors.DNI !== null}/>
                                    </CCol>
                                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Name</CFormLabel>
                                    <CCol sm={4}>
                                        <CFormInput type="text" id="name" value={patient.personInfo.name} onChange={this.onChange('personInfo.name', false, false)} invalid={!firstTime && errors.name !== null}/>
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</CFormLabel>
                                    <CCol sm={4}>
                                        <CFormInput type="text" id="lastName" value={patient.personInfo.lastName} onChange={this.onChange('personInfo.lastName', false, false)} invalid={!firstTime && errors.lastName !== null}/>
                                    </CCol>
                                    <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">Email</CFormLabel>
                                    <CCol sm={4}>
                                        <CFormInput type="text" id="email" value={patient.personInfo.email} onChange={this.onChange('personInfo.email', false, false)} invalid={!firstTime && errors.email !== null}/>
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="phone" className="col-sm-2 col-form-label">Phone</CFormLabel>
                                    <CCol sm={4}>
                                        <CFormInput type="text" id="phone" value={patient.personInfo.phone} onChange={this.onChange('personInfo.phone', false, false)} invalid={!firstTime && errors.phone !== null}/>
                                    </CCol>
                                    <CFormLabel htmlFor="sex" className="col-sm-2 col-form-label">Sex</CFormLabel>
                                    <CCol sm={4} style={{display: 'flex', alignItems: 'center'}}>
                                        <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox1" checked={patient.personInfo.sex === "F"} value="F" label="F" onChange={this.onChange('personInfo.sex', false, false)}/>
                                        <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox2" checked={patient.personInfo.sex === "M"} value="M" label="M" onChange={this.onChange('personInfo.sex', false, false)}/>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                        <CCard>
                            <CCardHeader style={{fontWeight: 500}}>Extra Information</CCardHeader>
                            <CCardBody>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="code" className="col-sm-2 col-form-label">Code</CFormLabel>
                                    <CCol sm={4}>
                                        <CFormInput type="text" id="code" value={patient.code} onChange={this.onChange('code', false, false)} invalid={!firstTime && errors.code !== null}/>
                                    </CCol>
                                    <CFormLabel htmlFor="allergies" className="col-sm-2 col-form-label">Allergies</CFormLabel>
                                    <CCol sm={4}>
                                        <CFormInput type="text" id="allergies" value={patient.allergies} onChange={this.onChange('allergies', false, false)}/>
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="address" className="col-sm-2 col-form-label">Address</CFormLabel>
                                    <CCol sm={4}>
                                        <CFormInput type="text" id="address" value={patient.address} onChange={this.onChange('address', false, false)} invalid={!firstTime && errors.address !== null}/>
                                    </CCol>
                                    <CFormLabel htmlFor="birthday" className="col-sm-2 col-form-label">Birthday</CFormLabel>
                                    <CCol sm={4}>
                                        <DatePicker
                                            format="dd-MM-y"
                                            clearIcon={null}
                                            value={patient.birthday ? new Date(moment(patient.birthday).format("YYYY-MM-DD HH:mm:ss")) : new Date()}
                                            onChange={this.onChange('birthday', false, true)}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="occupation" className="col-sm-2 col-form-label">Occupation</CFormLabel>
                                    <CCol sm={4}>
                                        <CFormInput type="text" id="occupation" value={patient.occupation} onChange={this.onChange('occupation', false, false)} invalid={!firstTime && errors.occupation !== null}/>
                                    </CCol>
                                    <CFormLabel htmlFor="civilStatus" className="col-sm-2 col-form-label">Civil Status</CFormLabel>
                                    <CCol sm={4}>
                                        <CFormInput type="text" id="civilStatus" value={patient.civilStatus} onChange={this.onChange('civilStatus', false, false)} invalid={!firstTime && errors.civilStatus !== null}/>
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="nationality" className="col-sm-2 col-form-label">Nationality</CFormLabel>
                                    <CCol sm={4}>
                                        <CFormInput type="text" id="nationality" value={patient.nationality} onChange={this.onChange('nationality', false, false)} invalid={!firstTime && errors.nationality !== null}/>
                                    </CCol>
                                </CRow>
                                <CCol xs="12" className="right-side my-3">
                                    <CButton color={colorTypes.LIGHT} style={{marginRight: "1rem"}} onClick={this.onClose}>Back</CButton>
                                    <CButton color={color} onClick={this.onAccept}>{txtButton}</CButton>
                                </CCol>
                            </CCardBody>
                        </CCard>
                        <Confirmation
                            type="patient"
                            mode={mode}
                            body={patient.code + " - " + patient.personInfo.name + " " + patient.personInfo.lastName}
                            object={patient}
                            visible={showConfirmationModal}
                            onAccept={this.onSave}
                            onClose={this.onDiscard}
                        />
                    </CCol>
                }
                { !loaded &&
                    <CRow className="center">
                        <CSpinner color={colorTypes.PRIMARY}/>
                    </CRow>
                }
            </CRow>
        )
    }
}

const mapStateToProps = state => {
    return {
        patient: state.patient
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(patientActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails)