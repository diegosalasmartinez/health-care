import React, { Component } from 'react'
import { 
    CCard,
    CCardBody,
    CCol,
    CFormInput,
    CFormLabel,
    CRow
} from '@coreui/react'
import moment from 'moment'

export default class ExtraInformation extends Component {
    render() {
        const { patient } = this.props;

        return (
            <CRow>
                <CCol xs="12">
                    <CCard className="mb-3">
                        <CCardBody>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="code" className="col-sm-2 col-form-label">Code</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="code" value={patient.code} readOnly={true}/>
                                </CCol>
                                <CFormLabel htmlFor="allergies" className="col-sm-2 col-form-label">Allergies</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="allergies" value={patient.allergies} readOnly={true}/>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="address" className="col-sm-2 col-form-label">Address</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="address" value={patient.address} readOnly={true}/>
                                </CCol>
                                <CFormLabel htmlFor="birthday" className="col-sm-2 col-form-label">Birthday</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="birthday" value={moment(patient.birthday).format("YYYY-MM-DD")} readOnly={true}/>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="occupation" className="col-sm-2 col-form-label">Occupation</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="occupation" value={patient.occupation} readOnly={true}/>
                                </CCol>
                                <CFormLabel htmlFor="civilStatus" className="col-sm-2 col-form-label">Civil Status</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="civilStatus" value={patient.civilStatus} readOnly={true}/>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="nationality" className="col-sm-2 col-form-label">Nationality</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="nationality" value={patient.nationality} readOnly={true}/>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}
