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
import { cilPencil, cilTrash } from '@coreui/icons'
import colorTypes from '../../services/models/others/colorTypes'

export default class SpecialtyTable extends Component {
    onUpdate = (specialty) => {
        this.props.onUpdate(specialty);
    }

    onDelete = (specialty) => {
        this.props.onDelete(specialty);
    }

    render() {
        const { specialties } = this.props;

        return (
            <CCol xs="12">
                <CCard>
                    <CCardBody>
                        <CTable responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col"># Doctors</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                { specialties.map(s => 
                                    <CTableRow key={s._id}>
                                        <CTableDataCell>{s.code}</CTableDataCell>
                                        <CTableDataCell>{s.name}</CTableDataCell>
                                        <CTableDataCell>{s.numDoctors}</CTableDataCell>
                                        <CTableDataCell style={{width: '150px'}}>
                                            <CTooltip content="Update" placement="top">
                                                <CButton color={colorTypes.LIGHT} style={{marginRight: "1rem"}} onClick={() => this.onUpdate(s)}>
                                                    <CIcon icon={cilPencil} size="sm"/>
                                                </CButton>
                                            </CTooltip>
                                            <CTooltip content="Delete" placement="top">
                                                <CButton color={colorTypes.DANGER} onClick={() => this.onDelete(s)}>
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
