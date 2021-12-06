import React, { Component } from 'react'
import { CButton, CCol, CFormInput, CFormLabel, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react'
import actionTypes from 'src/services/models/others/actionTypes';
import DoctorModel from 'src/services/models/DoctorModel';
import colorTypes from 'src/services/models/others/colorTypes';

export default class DoctorDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible})
        }
    }

    onChange = (key, isNumeric = false, isDate = false, isTime = false) => (e = {}) => {
        const { doctorSelected } = this.props;
            let val = isNumeric ? parseInt(e.target.value || '0') : (isDate || isTime) ? e : e.target.value;
            let doctorUpdated = { ...doctorSelected };
            const keys = key.split(".");
            if (keys.length > 1) {
                doctorUpdated[keys[0]][keys[1]] = val;
            } else {
                doctorUpdated[key] = val;
            }
            this.props.onChangeDoctor(doctorUpdated);
    }
    
    onClose = () => {
        this.setState({visible: false});
        this.props.onClose();
    }

    render() {
        const { visible } = this.state;
        const { mode } = this.props;
        const title = mode === actionTypes.CREATE ? "Add a new doctor" : "Update doctor";
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
                            <CFormInput type="text" id="dni" onChange={this.onChange('personInfo.DNI', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="name" className="col-sm-4 col-form-label">Name</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="name" onChange={this.onChange('personInfo.name', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="lastName" className="col-sm-4 col-form-label">Last Name</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="lastName" onChange={this.onChange('personInfo.lastName', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="email" className="col-sm-4 col-form-label">Email</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="email" onChange={this.onChange('personInfo.email', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="phone" className="col-sm-4 col-form-label">Phone</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="phone" onChange={this.onChange('personInfo.phone', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="sex" className="col-sm-4 col-form-label">Sex</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="sex" onChange={this.onChange('personInfo.sex', false, false)}/>
                        </CCol>
                    </CRow>
                    <CFormLabel className="col-sm-12 my-3" style={{fontWeight: 500}}>Professional Information</CFormLabel>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="code" className="col-sm-4 col-form-label">Code</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="code" onChange={this.onChange('doctorInfo.code', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="CMP" className="col-sm-4 col-form-label">CMP</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="CMP" onChange={this.onChange('doctorInfo.CMP', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="specialty" className="col-sm-4 col-form-label">Specialty</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="specialty" onChange={this.onChange('doctorInfo.specialty', false, false)}/>
                        </CCol>
                    </CRow>
                    <CFormLabel className="col-sm-12 my-3" style={{fontWeight: 500}}>Credentials</CFormLabel>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="username" className="col-sm-4 col-form-label">Username</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="username" onChange={this.onChange('username', false, false)}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="password" className="col-sm-4 col-form-label">Password</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="password" id="password" onChange={this.onChange('password', false, false)}/>
                        </CCol>
                    </CRow>
                    <CCol xs="12" className="right-side my-3">
                        <CButton color={colorTypes.SECONDARY} style={{marginRight: "1rem"}} onClick={this.onClose}>Back</CButton>
                        <CButton color={color} onClick={this.props.onSave}>{txtButton}</CButton>
                    </CCol>
                </COffcanvasBody>
            </COffcanvas>
        )
    }
}
