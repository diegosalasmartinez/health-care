import React, { Component } from 'react'
import { 
    CButton,
    CCard, 
    CCardBody, 
    CCardHeader,
    CCol,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import colorTypes from '../../services/models/others/colorTypes'

export default class DoctorTable extends Component {
    onUpdate = (doctor) => {
        this.props.onUpdate(doctor);
    }

    onDelete = (doctor) => {
        this.props.onDelete(doctor);
    }

    render() {
        const { doctors } = this.props;

        return (
            <CCol xs="12">
                <CCard>
                    <CCardHeader>Doctors</CCardHeader>
                    <CCardBody>
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">CMP</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Specialty</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                { doctors.map(d => 
                                    <CTableRow key={d._id}>
                                        <CTableHeaderCell scope="row">{d.doctorInfo.code}</CTableHeaderCell>
                                        <CTableDataCell>{d.doctorInfo.CMP}</CTableDataCell>
                                        <CTableDataCell>{d.personInfo.name}</CTableDataCell>
                                        <CTableDataCell>{d.personInfo.lastName}</CTableDataCell>
                                        <CTableDataCell>{d.doctorInfo.specialty}</CTableDataCell>
                                        <CTableDataCell>{d.personInfo.email}</CTableDataCell>
                                        <CTableDataCell>{d.personInfo.phone}</CTableDataCell>
                                        <CTableDataCell>
                                            <CButton color={colorTypes.LIGHT} style={{marginRight: "1rem"}} onClick={() => this.onUpdate(d)}>
                                                <CIcon icon={cilPencil} size="sm"/>
                                            </CButton>
                                            <CButton color={colorTypes.DANGER} onClick={() => this.onDelete(d)}>
                                                <CIcon icon={cilTrash} size="sm"/>
                                            </CButton>
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
