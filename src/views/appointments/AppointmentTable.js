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
import moment from 'moment'

export default class AppointmentTable extends Component {
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
        const { appointments, appointmentsLength, pageSelected, pagination, searchParams } = this.props;
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
                                                <CFormLabel htmlFor="patient" className="col-form-label">Patient</CFormLabel>
                                                <CCol>
                                                    <CFormInput type="text" id="patient" value={searchParams.patient} onChange={this.props.onChangeParams('patient')}/>
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                        <CCol xs="6" md="3">
                                            <CRow>
                                                <CFormLabel htmlFor="doctor" className="col-form-label">Doctor</CFormLabel>
                                                <CCol>
                                                    <CFormInput type="text" id="doctor" value={searchParams.doctor} onChange={this.props.onChangeParams('doctor')}/>
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
                                <CTooltip content="Add a new appointment" placement="top">
                                    <CButton onClick={this.props.onAdd} style={{color: 'white'}}>
                                        <CIcon icon={cilMedicalCross} size="sm"/>
                                    </CButton>
                                </CTooltip>
                            </CCol>
                        </CRow>
                        <CTable responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Patient</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Doctor</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Floor</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Room</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                { appointments.map(a => 
                                    <CTableRow key={a._id}>
                                        <CTableDataCell>{a.patientInfo.fullName}</CTableDataCell>
                                        <CTableDataCell>{a.doctorInfo.fullName}</CTableDataCell>
                                        <CTableDataCell>{moment(a.date).format("YYYY-MM-DD")}</CTableDataCell>
                                        <CTableDataCell>{a.time}</CTableDataCell>
                                        <CTableDataCell>{a.floor}</CTableDataCell>
                                        <CTableDataCell>{a.room}</CTableDataCell>
                                        <CTableDataCell>
                                            <CTooltip content="Update" placement="top">
                                                <CButton color={colorTypes.LIGHT} style={{marginRight: "1rem"}} onClick={() => this.onUpdate(a)}>
                                                    <CIcon icon={cilPencil} size="sm"/>
                                                </CButton>
                                            </CTooltip>
                                            <CTooltip content="Delete" placement="top">
                                                <CButton color={colorTypes.DANGER} onClick={() => this.onDelete(a)}>
                                                    <CIcon icon={cilTrash} size="sm"/>
                                                </CButton>
                                            </CTooltip>
                                        </CTableDataCell>
                                    </CTableRow>
                                ) }
                            </CTableBody>
                        </CTable>
                        <Pagination itemsLength={appointmentsLength} pageSelected={pageSelected} pagination={pagination} onClickPage={this.props.onClickPage}/>
                    </CCardBody>
                </CCard>
            </CCol>
        )
    }
}
