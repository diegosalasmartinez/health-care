import { CButton, CCard, CCardBody, CCol, CFormInput, CFormLabel, CRow } from '@coreui/react'
import React, { Component } from 'react'
import colorTypes from 'src/services/models/others/colorTypes';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                password: "",
                confirmPassword: "",
            },
            firstTime: true, 
            showConfirmationModal: false,
        }
    }

    onChange = (key, isNumeric = false, isDate = false) => (e = {}) => {
        const { user } = this.state;
        let val = isNumeric ? parseInt(e.target.value || '0') : (isDate) ? moment(e).format("YYYY-MM-DD") : e.target.value;
        let userUpdated = { ...user };
        userUpdated[key] = val;
        
        this.setState({user: userUpdated});
    }

    onAccept = () => {
        this.setState({firstTime: false});
        const { user } = this.state;
        //Validations
        if (user.password !== "" || user.confirmPassword !== "") {
            this.setState({showConfirmationModal: true});
        }
    }

    render() {
        const { user, firstTime, showConfirmationModal } = this.state;
        const { password, confirmPassword } = user;
        return (
            <CRow>
                <CCol xs="12" md="8" xl="6" className='m-auto'>
                    <CCard className='mb-3'>
                        <CCardBody>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="password" className="col-sm-4 col-form-label">New Password</CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput type="password" id="password" value={password} onChange={this.onChange('password', false, false)} invalid={!firstTime && password === ""} />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="confirmPassword" className="col-sm-4 col-form-label">Confirm Password</CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput type="password" id="confirmPassword" value={confirmPassword} onChange={this.onChange('confirmPassword', false, false)} invalid={!firstTime && confirmPassword === ""} />
                                </CCol>
                            </CRow>
                            <CCol xs="12" className="right-side my-3">
                                <CButton color={colorTypes.PRIMARY} onClick={this.onAccept}>Change Password</CButton>
                            </CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}
