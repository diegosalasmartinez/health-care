import React, { Component } from 'react'
import { CButton, CCol, CFormCheck, CFormInput, CFormLabel, CFormSelect, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react'
import actionTypes from '../../services/models/others/actionTypes'
import DoctorModel, { validate } from '../../services/models/DoctorModel'
import colorTypes from '../../services/models/others/colorTypes'
import { objIsNull } from '../../utils/utils'
import cloneDeep from 'lodash/cloneDeep'

export default class DoctorDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            firstTime: true,
            doctor: new DoctorModel(),
            errors: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible})
            if (this.props.visible) {
                this.setState({doctor: this.props.mode === actionTypes.UPDATE ? cloneDeep(this.props.doctorSelected) : new DoctorModel()});
            }
        }
    }

    onChange = (key, isNumeric = false, isDate = false, isTime = false) => (e = {}) => {
        const { doctor } = this.state;
            let val = isNumeric ? parseInt(e.target.value || '0') : (isDate || isTime) ? e : e.target.value;
            let doctorUpdated = { ...doctor };
            const keys = key.split(".");
            if (keys.length > 1) {
                doctorUpdated[keys[0]][keys[1]] = val;
            } else {
                doctorUpdated[key] = val;
            }
            this.setState({doctor: doctorUpdated});
    }
    
    onSave = () => {
        this.setState({firstTime: false});
        const { mode } = this.props;
        const errors = validate(this.state.doctor, mode === actionTypes.CREATE);
        if (objIsNull(errors)) {
            this.props.onSave(this.state.doctor);
        }
        this.setState({errors: errors});
    }

    onClose = () => {
        this.setState({visible: false});
        this.props.onClose();
    }

    render() {
        const { visible, doctor, errors, firstTime } = this.state;
        const { mode, specialties } = this.props;
        const title = mode === actionTypes.CREATE ? "Add a new doctor" : "Update doctor";
        const txtButton = mode === actionTypes.CREATE ? "Register" : "Update";
        const color = mode === actionTypes.CREATE ? colorTypes.SUCCESS : colorTypes.WARNING;
        const validateCredentials = mode === actionTypes.CREATE;

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
                            <CFormInput type="text" id="dni" value={doctor.personInfo.DNI} onChange={this.onChange('personInfo.DNI', false, false)} invalid={!firstTime && errors.DNI !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="name" className="col-sm-4 col-form-label">Name</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="name" value={doctor.personInfo.name} onChange={this.onChange('personInfo.name', false, false)} invalid={!firstTime && errors.name !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="lastName" className="col-sm-4 col-form-label">Last Name</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="lastName" value={doctor.personInfo.lastName} onChange={this.onChange('personInfo.lastName', false, false)} invalid={!firstTime && errors.lastName !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="email" className="col-sm-4 col-form-label">Email</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="email" value={doctor.personInfo.email} onChange={this.onChange('personInfo.email', false, false)} invalid={!firstTime && errors.email !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="phone" className="col-sm-4 col-form-label">Phone</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="phone" value={doctor.personInfo.phone} onChange={this.onChange('personInfo.phone', false, false)} invalid={!firstTime && errors.phone !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="sex" className="col-sm-4 col-form-label">Sex</CFormLabel>
                        <CCol sm={8} style={{display: 'flex', alignItems: 'center'}}>
                            <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox1" checked={doctor.personInfo.sex === "F"} value="F" label="F" onChange={this.onChange('personInfo.sex', false, false)}/>
                            <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox2" checked={doctor.personInfo.sex === "M"} value="M" label="M" onChange={this.onChange('personInfo.sex', false, false)}/>
                        </CCol>
                    </CRow>
                    <CFormLabel className="col-sm-12 my-3" style={{fontWeight: 500}}>Professional Information</CFormLabel>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="code" className="col-sm-4 col-form-label">Code</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="code" value={doctor.doctorInfo.code} onChange={this.onChange('doctorInfo.code', false, false)} invalid={!firstTime && errors.code !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="CMP" className="col-sm-4 col-form-label">CMP</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="CMP" value={doctor.doctorInfo.CMP} onChange={this.onChange('doctorInfo.CMP', false, false)} invalid={!firstTime && errors.CMP !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="specialty" className="col-sm-4 col-form-label">Specialty</CFormLabel>
                        <CCol sm={8}>
                            <CFormSelect aria-label="specialty" value={doctor.doctorInfo.specialtyId} onChange={this.onChange('doctorInfo.specialtyId', false, false)} invalid={!firstTime && errors.specialty !== null}>
                                <option>Select a specialty</option>
                                { specialties.map(s => 
                                    <option key={s._id} value={s._id}>{s.name}</option>
                                ) }
                            </CFormSelect>
                        </CCol>
                    </CRow>
                    { mode === actionTypes.CREATE && 
                        <>
                            <CFormLabel className="col-sm-12 my-3" style={{fontWeight: 500}}>Credentials</CFormLabel>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="username" className="col-sm-4 col-form-label">Username</CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput type="text" id="username" value={doctor.username} onChange={this.onChange('username', false, false)} invalid={!firstTime && validateCredentials && errors.username !== null}/>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="password" className="col-sm-4 col-form-label">Password</CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput type="password" id="password" value={doctor.password} onChange={this.onChange('password', false, false)} invalid={!firstTime && validateCredentials && errors.password !== null}/>
                                </CCol>
                            </CRow>
                        </>
                    }
                    <CCol xs="12" className="right-side my-3">
                        <CButton color={colorTypes.LIGHT} style={{marginRight: "1rem"}} onClick={this.onClose}>Back</CButton>
                        <CButton color={color} onClick={this.onSave}>{txtButton}</CButton>
                    </CCol>
                </COffcanvasBody>
            </COffcanvas>
        )
    }
}
