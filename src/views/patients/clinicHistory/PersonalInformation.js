import React, { Component } from 'react'
import { 
    CCard,
    CCardBody,
    CCol,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CRow
} from '@coreui/react'

export default class PersonalInformation extends Component {
    render() {
        const { patient } = this.props;

        return (
            <CRow>
                <CCol xs="12">
                    <CCard className="mb-3">
                        <CCardBody>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="dni" className="col-sm-2 col-form-label">DNI</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="dni" value={patient.personInfo.DNI} readOnly={true}/>
                                </CCol>
                                <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Name</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="name" value={patient.personInfo.name} readOnly={true}/>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="lastName" value={patient.personInfo.lastName} readOnly={true}/>
                                </CCol>
                                <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">Email</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="email" value={patient.personInfo.email} readOnly={true}/>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="phone" className="col-sm-2 col-form-label">Phone</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="phone" value={patient.personInfo.phone} readOnly={true}/>
                                </CCol>
                                <CFormLabel htmlFor="sex" className="col-sm-2 col-form-label">Sex</CFormLabel>
                                <CCol sm={4} style={{display: 'flex', alignItems: 'center'}}>
                                    <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox1" checked={patient.personInfo.sex === "F"} value="F" label="F" readOnly={true}/>
                                    <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox2" checked={patient.personInfo.sex === "M"} value="M" label="M" readOnly={true}/>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}
