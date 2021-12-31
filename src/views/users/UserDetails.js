import React, { Component } from 'react'
import { CButton, CCol, CFormCheck, CFormInput, CFormLabel, CFormSelect, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react'
import actionTypes from '../../services/models/others/actionTypes'
import UserModel, { validate } from '../../services/models/UserModel'
import colorTypes from '../../services/models/others/colorTypes'
import { objIsNull } from '../../utils/utils'
import cloneDeep from 'lodash/cloneDeep'

export default class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            firstTime: true,
            user: new UserModel(),
            errors: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible})
            if (this.props.visible) {
                this.setState({user: this.props.mode === actionTypes.UPDATE ? cloneDeep(this.props.userSelected) : new UserModel()});
            }
        }
    }

    onChange = (key, isNumeric = false, isDate = false, isTime = false) => (e = {}) => {
        const { user } = this.state;
            let val = isNumeric ? parseInt(e.target.value || '0') : (isDate || isTime) ? e : e.target.value;
            let userUpdated = { ...user };
            const keys = key.split(".");
            if (keys.length > 1) {
                userUpdated[keys[0]][keys[1]] = val;
            } else {
                userUpdated[key] = val;
            }
            this.setState({user: userUpdated});
    }
    
    onSave = () => {
        this.setState({firstTime: false});
        const { mode } = this.props;
        const errors = validate(this.state.user, mode === actionTypes.CREATE);
        if (objIsNull(errors)) {
            this.props.onSave(this.state.user);
        }
        this.setState({errors: errors});
    }

    onClose = () => {
        this.setState({visible: false});
        this.props.onClose();
    }

    render() {
        const { visible, user, firstTime, errors } = this.state;
        const { mode } = this.props;
        const title = mode === actionTypes.CREATE ? "Add a new user" : "Update user";
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
                            <CFormInput type="text" id="dni" value={user.personInfo.DNI} onChange={this.onChange('personInfo.DNI', false, false)} invalid={!firstTime && errors.DNI !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="name" className="col-sm-4 col-form-label">Name</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="name" value={user.personInfo.name} onChange={this.onChange('personInfo.name', false, false)} invalid={!firstTime && errors.name !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="lastName" className="col-sm-4 col-form-label">Last Name</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="lastName" value={user.personInfo.lastName} onChange={this.onChange('personInfo.lastName', false, false)} invalid={!firstTime && errors.lastName !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="email" className="col-sm-4 col-form-label">Email</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="email" value={user.personInfo.email} onChange={this.onChange('personInfo.email', false, false)} invalid={!firstTime && errors.email !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="phone" className="col-sm-4 col-form-label">Phone</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="phone" value={user.personInfo.phone} onChange={this.onChange('personInfo.phone', false, false)} invalid={!firstTime && errors.phone !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="sex" className="col-sm-4 col-form-label">Sex</CFormLabel>
                        <CCol sm={8} style={{display: 'flex', alignItems: 'center'}}>
                            <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox1" checked={user.personInfo.sex === "F"} value="F" label="F" onChange={this.onChange('personInfo.sex', false, false)}/>
                            <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox2" checked={user.personInfo.sex === "M"} value="M" label="M" onChange={this.onChange('personInfo.sex', false, false)}/>
                        </CCol>
                    </CRow>
                    <CFormLabel className="col-sm-12 my-3" style={{fontWeight: 500}}>Credentials</CFormLabel>
                    { mode === actionTypes.CREATE && 
                        <>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="username" className="col-sm-4 col-form-label">Username</CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput type="text" id="username" value={user.username} onChange={this.onChange('username', false, false)} invalid={!firstTime && validateCredentials && errors.username !== null}/>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="password" className="col-sm-4 col-form-label">Password</CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput type="password" id="password" value={user.password} onChange={this.onChange('password', false, false)} invalid={!firstTime && validateCredentials && errors.password !== null}/>
                                </CCol>
                            </CRow>
                        </>
                    }
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="role" className="col-sm-4 col-form-label">Role</CFormLabel>
                        <CCol sm={8}>
                            <CFormSelect aria-label="role" value={user.role} onChange={this.onChange('role', false, false)}>
                                <option value={"ADMIN"}>Admin</option>
                                <option value={"SECRETARY"}>Secretary</option>
                            </CFormSelect>
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
