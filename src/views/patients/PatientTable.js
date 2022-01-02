import React, { Component } from 'react'
import { 
    CButton,
    CCard, 
    CCardBody, 
    CCol,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTooltip
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAddressBook, cilPencil, cilTrash } from '@coreui/icons'
import colorTypes from '../../services/models/others/colorTypes'

export default class PatientTable extends Component {
    onUpdate = (patient) => {
        this.props.onUpdate(patient);
    }

    onDelete = (patient) => {
        this.props.onDelete(patient);
    }
    
    onCreateAppointment = (patient) => {
        this.props.onCreateAppointment(patient);
    }

    render() {
        const { patients, role } = this.props;

        return (
            <CCol xs="12">
                <CCard>
                    <CCardBody>
                        <CTable responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">DNI</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Sex</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                { patients.map(p => 
                                    <CTableRow key={p._id}>
                                        <CTableDataCell>{p.code}</CTableDataCell>
                                        <CTableDataCell>{p.personInfo.DNI}</CTableDataCell>
                                        <CTableDataCell>{p.personInfo.name}</CTableDataCell>
                                        <CTableDataCell>{p.personInfo.lastName}</CTableDataCell>
                                        <CTableDataCell>{p.personInfo.email}</CTableDataCell>
                                        <CTableDataCell>{p.personInfo.phone}</CTableDataCell>
                                        <CTableDataCell>{p.personInfo.sex}</CTableDataCell>
                                        <CTableDataCell>
                                            { role === "ADMIN" && 
                                                <CTooltip content="Create Appointment" placement="top">
                                                    <CButton color={colorTypes.INFO} style={{marginRight: "1rem"}} onClick={() => this.onCreateAppointment(p)}>
                                                        <CIcon icon={cilAddressBook} size="sm"/>
                                                    </CButton>
                                                </CTooltip>
                                            }
                                            <CTooltip content="Update" placement="top">
                                                <CButton color={colorTypes.LIGHT} style={{marginRight: "1rem"}} onClick={() => this.onUpdate(p)}>
                                                    <CIcon icon={cilPencil} size="sm"/>
                                                </CButton>
                                            </CTooltip>
                                            <CTooltip content="Delete" placement="top">
                                                <CButton color={colorTypes.DANGER} onClick={() => this.onDelete(p)}>
                                                    <CIcon icon={cilTrash} size="sm"/>
                                                </CButton>
                                            </CTooltip>
                                        </CTableDataCell>
                                    </CTableRow>
                                ) }
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        )
    }
}
