import React, { Component } from 'react'
import { 
    CButton,
    CCard, 
    CCardBody,
    CCol,
    CCollapse,
    CFormInput,
    CFormLabel,
    CFormSelect,
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
import { cilChevronRight, cilFilter, cilFilterX, cilMedicalCross, cilPencil, cilSearch, cilTrash } from '@coreui/icons'
import colorTypes from '../../services/models/others/colorTypes'
import Pagination from '../../components/common/Pagination'

export default class DoctorTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    onChangeVisible = () => {
        this.setState({visible: !this.state.visible});
    }

    onUpdate = (doctor) => {
        this.props.onUpdate(doctor);
    }

    onDelete = (doctor) => {
        this.props.onDelete(doctor);
    }
    
    onSelect = (doctor) => {
        this.props.onSelect(doctor);
    }

    render() {
        const { visible } = this.state;
        const { doctors, specialties, doctorsLength, pageSelected, pagination, searchParams, selectMode } = this.props;
        const style = 'mb-2 ' + (visible ? 'jc-sb' : 'jc-fe');

        return (
            <CCol xs="12">
                <CCard>
                    <CCardBody>
                        <CRow className={style}>
                            <CCol xs="10">
                                <CCollapse visible={visible}>
                                    <CRow className="mb-3">
                                        <CCol xs="6" md="3">
                                            <CRow>
                                                <CFormLabel htmlFor="code" className="col-form-label">Code</CFormLabel>
                                                <CCol>
                                                    <CFormInput type="text" id="code" value={searchParams.code} onChange={this.props.onChangeParams('code')}/>
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                        <CCol xs="6" md="3">
                                            <CRow>
                                                <CFormLabel htmlFor="name" className="col-form-label">Name or last name</CFormLabel>
                                                <CCol>
                                                    <CFormInput type="text" id="name" value={searchParams.name} onChange={this.props.onChangeParams('name')}/>
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                        <CCol xs="6" md="3">
                                            <CRow>
                                                <CFormLabel htmlFor="specialty" className="col-form-label">Specialty</CFormLabel>
                                                <CCol>
                                                    <CFormSelect aria-label="specialty" value={searchParams.specialtyId} onChange={this.props.onChangeParams('specialtyId')}>
                                                        <option value={""}>No selection</option>
                                                        { specialties.map(s => 
                                                            <option key={s._id} value={s._id}>{s.name}</option>
                                                        ) }
                                                    </CFormSelect>
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                        <CCol xs="6" md="3" style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: 'auto'}}>
                                            <CTooltip content={"Search"} placement="top">
                                                <CButton style={{color: 'white'}} onClick={this.props.onSearch}>
                                                    <CIcon icon={cilSearch} size="sm"/>
                                                </CButton>
                                            </CTooltip>
                                        </CCol>
                                    </CRow>
                                </CCollapse>
                            </CCol>
                            <CCol xs="2" style={{display: 'flex', justifyContent: 'flex-end', justifySelf: 'flex-end', alignSelf: 'flex-start', gap: '1rem'}}>
                                <CTooltip content={visible ? "Hide filters" : "Show filters"} placement="top">
                                    <CButton style={{color: 'white'}} onClick={this.onChangeVisible}>
                                        <CIcon icon={visible ? cilFilterX : cilFilter} size="sm"/>
                                    </CButton>
                                </CTooltip>
                                { !selectMode && 
                                    <CTooltip content="Add a new patient" placement="top">
                                        <CButton onClick={this.props.onAdd} style={{color: 'white'}}>
                                            <CIcon icon={cilMedicalCross} size="sm"/>
                                        </CButton>
                                    </CTooltip>
                                }
                            </CCol>
                        </CRow>
                        <CTable responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">CMP</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Specialty</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Sex</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                { doctors.map(d => 
                                    <CTableRow key={d._id}>
                                        <CTableDataCell>{d.doctorInfo.code}</CTableDataCell>
                                        <CTableDataCell>{d.doctorInfo.CMP}</CTableDataCell>
                                        <CTableDataCell>{d.personInfo.name}</CTableDataCell>
                                        <CTableDataCell>{d.personInfo.lastName}</CTableDataCell>
                                        <CTableDataCell>{d.doctorInfo.specialtyInfo.name}</CTableDataCell>
                                        <CTableDataCell>{d.personInfo.email}</CTableDataCell>
                                        <CTableDataCell>{d.personInfo.phone}</CTableDataCell>
                                        <CTableDataCell>{d.personInfo.sex}</CTableDataCell>
                                        <CTableDataCell>
                                            { selectMode ?
                                                <CTooltip content="Choose" placement="top">
                                                    <CButton color={colorTypes.PRIMARY} style={{marginRight: "1rem"}} onClick={() => this.onSelect(d)}>
                                                        <CIcon icon={cilChevronRight} size="sm"/>
                                                    </CButton>
                                                </CTooltip>
                                                :
                                                <>
                                                    <CTooltip content="Update" placement="top">
                                                        <CButton color={colorTypes.LIGHT} style={{marginRight: "1rem"}} onClick={() => this.onUpdate(d)}>
                                                            <CIcon icon={cilPencil} size="sm"/>
                                                        </CButton>
                                                    </CTooltip>
                                                    <CTooltip content="Delete" placement="top">
                                                        <CButton color={colorTypes.DANGER} onClick={() => this.onDelete(d)}>
                                                            <CIcon icon={cilTrash} size="sm"/>
                                                        </CButton>
                                                    </CTooltip>
                                                </>
                                            }
                                        </CTableDataCell>
                                    </CTableRow>
                                ) }
                            </CTableBody>
                        </CTable>
                        <Pagination itemsLength={doctorsLength} pageSelected={pageSelected} pagination={pagination} onClickPage={this.props.onClickPage}/>
                    </CCardBody>
                </CCard>
            </CCol>
        )
    }
}
