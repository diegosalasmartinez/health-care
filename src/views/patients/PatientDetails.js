import React, { Component } from 'react'
import { CButton, CCol, CFormInput, CFormLabel, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react'
import actionTypes from '../../services/models/others/actionTypes'
import PatientModel from '../../services/models/PatientModel'
import colorTypes from '../../services/models/others/colorTypes'

export default class PatientDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            patient: new PatientModel()
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible})
            if (this.props.visible) {
                this.setState({patient: this.props.mode === actionTypes.UPDATE ? {...this.props.patientSelected} : new PatientModel()});
            }
        }
    }

    onChange = (key, isNumeric = false, isDate = false, isTime = false) => (e = {}) => {
        const { patient } = this.state;
            let val = isNumeric ? parseInt(e.target.value || '0') : (isDate || isTime) ? e : e.target.value;
            let patientUpdated = { ...patient };
            const keys = key.split(".");
            if (keys.length > 1) {
                patientUpdated[keys[0]][keys[1]] = val;
            } else {
                patientUpdated[key] = val;
            }
            this.setState({patient: patientUpdated});
    }
    
    onSave = () => {
        this.props.onSave(this.state.patient);
    }

    onClose = () => {
        this.setState({visible: false});
        this.props.onClose();
    }

    render() {
        const { visible, patient } = this.state;
        const { mode } = this.props;
        const title = mode === actionTypes.CREATE ? "Add a new patient" : "Update patient";
        const txtButton = mode === actionTypes.CREATE ? "Register" : "Update";
        const color = mode === actionTypes.CREATE ? colorTypes.SUCCESS : colorTypes.WARNING;

        return (
            <COffcanvas placement="end" visible={visible} onHide={this.onClose}>
                <COffcanvasHeader>
                    <COffcanvasTitle>{title}</COffcanvasTitle>
                </COffcanvasHeader>
                <COffcanvasBody>
                    <CFormLabel className="col-sm-12 mb-3" style={{fontWeight: 500}}>Personal Information</CFormLabel>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="dni" className="col-sm-4 col-form-label">DNI</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="dni" value={patient.personInfo.DNI} onChange={this.onChange('personInfo.DNI', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="name" className="col-sm-4 col-form-label">Name</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="name" value={patient.personInfo.name} onChange={this.onChange('personInfo.name', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="lastName" className="col-sm-4 col-form-label">Last Name</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="lastName" value={patient.personInfo.lastName} onChange={this.onChange('personInfo.lastName', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="email" className="col-sm-4 col-form-label">Email</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="email" value={patient.personInfo.email} onChange={this.onChange('personInfo.email', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="phone" className="col-sm-4 col-form-label">Phone</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="phone" value={patient.personInfo.phone} onChange={this.onChange('personInfo.phone', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="sex" className="col-sm-4 col-form-label">Sex</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="sex" value={patient.personInfo.sex} onChange={this.onChange('personInfo.sex', false, false)}/>
                        </CCol>
                    </CRow>
                    <CFormLabel className="col-sm-12 my-3" style={{fontWeight: 500}}>Extra Information</CFormLabel>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="code" className="col-sm-4 col-form-label">Code</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="code" value={patient.code} onChange={this.onChange('code', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="allergies" className="col-sm-4 col-form-label">Allergies</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="allergies" value={patient.allergies} onChange={this.onChange('allergies', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="address" className="col-sm-4 col-form-label">Address</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="address" value={patient.address} onChange={this.onChange('address', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="birthday" className="col-sm-4 col-form-label">Birthday</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="birthday" value={patient.birthday} onChange={this.onChange('birthday', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="occupation" className="col-sm-4 col-form-label">Occupation</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="occupation" value={patient.occupation} onChange={this.onChange('occupation', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="civilStatus" className="col-sm-4 col-form-label">Civil Status</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="civilStatus" value={patient.civilStatus} onChange={this.onChange('civilStatus', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="nationality" className="col-sm-4 col-form-label">Nationality</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="nationality" value={patient.nationality} onChange={this.onChange('nationality', false, false)}/>
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
