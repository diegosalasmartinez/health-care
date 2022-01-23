import React, { Component } from 'react'
import { 
    CButton,
    CCard, 
    CCardBody, 
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTooltip
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMedicalCross, cilPencil, cilTrash } from '@coreui/icons'
import colorTypes from '../../services/models/others/colorTypes'
import Pagination from '../../components/common/Pagination'

export default class SpecialtyTable extends Component {
    onUpdate = (specialty) => {
        this.props.onUpdate(specialty);
    }

    onDelete = (specialty) => {
        this.props.onDelete(specialty);
    }

    render() {
        const { specialties, specialtiesLength, pageSelected, pagination } = this.props;

        return (
            <CCol xs="12">
                <CCard>
                    <CCardBody>
                        <CRow className='mb-2 jc-sb'>
                            <CCol xs="10">
                            </CCol>
                            <CCol xs="2" style={{display: 'flex', justifyContent: 'flex-end', justifySelf: 'flex-end', alignSelf: 'flex-start', gap: '1rem'}}>
                                <CTooltip content="Add a new specialty" placement="top">
                                    <CButton onClick={this.props.onAdd} style={{color: 'white'}}>
                                        <CIcon icon={cilMedicalCross} size="sm"/>
                                    </CButton>
                                </CTooltip>
                            </CCol>
                        </CRow>
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
                        <Pagination itemsLength={specialtiesLength} pageSelected={pageSelected} pagination={pagination} onClickPage={this.props.onClickPage}/>
                    </CCardBody>
                </CCard>
            </CCol>
        )
    }
}
