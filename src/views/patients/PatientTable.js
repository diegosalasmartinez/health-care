import React, { Component } from 'react'
import { 
    CButton,
    CCard, 
    CCardBody, 
    CCol,
    CCollapse,
    CFormInput,
    CFormLabel,
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
import { cilFilter, cilFilterX, cilSearch, cilAddressBook, cilPencil, cilTrash, cilMedicalCross, cilChevronRight } from '@coreui/icons'
import colorTypes from '../../services/models/others/colorTypes'
import Pagination from '../../components/common/Pagination'

export default class PatientTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    onChangeVisible = () => {
        this.setState({visible: !this.state.visible});
    }

    onUpdate = (patient) => {
        this.props.onUpdate(patient);
    }

    onDelete = (patient) => {
        this.props.onDelete(patient);
    }
    
    onCreateAppointment = (patient) => {
        this.props.onCreateAppointment(patient);
    }

    onSelect = (patient) => {
        this.props.onSelect(patient);
    }

    render() {
        const { visible } = this.state;
        const { patients, role, patientsLength, pageSelected, pagination, searchParams, selectMode } = this.props;
        const style = 'mb-2 ' + (visible ? 'jc-sb' : 'jc-fe');

        return (
            <CCol xs="12">
                <CCard>
                    <CCardBody>
                        <CRow className={style}>
                            <CCol xs="10">
                                <CCollapse visible={visible} >
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
                                                <CFormLabel htmlFor="dni" className="col-form-label">DNI</CFormLabel>
                                                <CCol>
                                                    <CFormInput type="text" id="dni" value={searchParams.dni} onChange={this.props.onChangeParams('dni')}/>
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
                                        <CButton onClick={this.props.onAddPatient} style={{color: 'white'}}>
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
                                            { selectMode ?
                                                <CTooltip content="Choose" placement="top">
                                                    <CButton color={colorTypes.PRIMARY} style={{marginRight: "1rem"}} onClick={() => this.onSelect(p)}>
                                                        <CIcon icon={cilChevronRight} size="sm"/>
                                                    </CButton>
                                                </CTooltip>
                                                :
                                                <>
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
                                                </>
                                            }
                                        </CTableDataCell>
                                    </CTableRow>
                                ) }
                            </CTableBody>
                        </CTable>
                        <Pagination itemsLength={patientsLength} pageSelected={pageSelected} pagination={pagination} onClickPage={this.props.onClickPage}/>
                    </CCardBody>
                </CCard>
            </CCol>
        )
    }
}
