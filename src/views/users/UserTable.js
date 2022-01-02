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
import { cilFilter, cilFilterX, cilSearch, cilPencil, cilTrash } from '@coreui/icons'
import colorTypes from '../../services/models/others/colorTypes'
import { userTypes } from 'src/utils/userUtils'
import Pagination from '../../components/common/Pagination'

export default class UserTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    onChangeVisible = () => {
        this.setState({visible: !this.state.visible});
    }

    onUpdate = (user) => {
        this.props.onUpdate(user);
    }

    onDelete = (user) => {
        this.props.onDelete(user);
    }

    render() {
        const { visible } = this.state;
        const { users, usersLength, pageSelected, pagination, searchParams } = this.props;
        
        return (
            <CCol xs="12">
                <CCard>
                    <CCardBody>
                        <div style={{marginBottom: '1rem'}} className={visible ? 'jc-sb' : 'jc-fe'}>
                            <CCollapse visible={visible}>
                                <CRow className="mb-3">
                                    <CCol xs="3">
                                        <CRow>
                                            <CFormLabel htmlFor="dni" className="col-form-label">DNI</CFormLabel>
                                            <CCol>
                                                <CFormInput type="text" id="dni" value={searchParams.dni} onChange={this.props.onChangeParams('dni')}/>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                    <CCol xs="3">
                                        <CRow>
                                            <CFormLabel htmlFor="name" className="col-form-label">Name or last name</CFormLabel>
                                            <CCol>
                                                <CFormInput type="text" id="name" value={searchParams.name} onChange={this.props.onChangeParams('name')}/>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                    <CCol xs="3">
                                        <CRow>
                                            <CFormLabel htmlFor="role" className="col-form-label">Role</CFormLabel>
                                            <CCol>
                                                <CFormSelect aria-label="role" value={searchParams.role} onChange={this.props.onChangeParams('role')}>
                                                    <option value={""}>Both</option>
                                                    <option value={"ADMIN"}>Admin</option>
                                                    <option value={"SECRETARY"}>Secretary</option>
                                                </CFormSelect>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                    <CCol xs="3" style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: 'auto'}}>
                                        <CTooltip content={"Search"} placement="top">
                                            <CButton style={{color: 'white'}} onClick={this.props.onSearch}>
                                                <CIcon icon={cilSearch} size="sm"/>
                                            </CButton>
                                        </CTooltip>
                                    </CCol>
                                </CRow>
                            </CCollapse>
                            <div>
                                <CTooltip content={visible ? "Hide filters" : "Show filters"} placement="top">
                                    <CButton style={{color: 'white'}} onClick={this.onChangeVisible}>
                                        <CIcon icon={visible ? cilFilterX : cilFilter} size="sm"/>
                                    </CButton>
                                </CTooltip>
                            </div>
                        </div>
                        <CTable responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">DNI</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Sex</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                { users.map(u => 
                                    <CTableRow key={u._id}>
                                        <CTableDataCell>{u.personInfo.DNI}</CTableDataCell>
                                        <CTableDataCell>{u.personInfo.name}</CTableDataCell>
                                        <CTableDataCell>{u.personInfo.lastName}</CTableDataCell>
                                        <CTableDataCell>{u.personInfo.email}</CTableDataCell>
                                        <CTableDataCell>{u.personInfo.phone}</CTableDataCell>
                                        <CTableDataCell>{u.personInfo.sex}</CTableDataCell>
                                        <CTableDataCell>{userTypes[u.role]}</CTableDataCell>
                                        <CTableDataCell>
                                            <CTooltip content="Update" placement="top">
                                                <CButton color={colorTypes.LIGHT} style={{marginRight: "1rem"}} onClick={() => this.onUpdate(u)}>
                                                    <CIcon icon={cilPencil} size="sm"/>
                                                </CButton>
                                            </CTooltip>
                                            <CTooltip content="Delete" placement="top">
                                                <CButton color={colorTypes.DANGER} onClick={() => this.onDelete(u)}>
                                                    <CIcon icon={cilTrash} size="sm"/>
                                                </CButton>
                                            </CTooltip>
                                        </CTableDataCell>
                                    </CTableRow>
                                ) }
                            </CTableBody>
                        </CTable>
                        <Pagination itemsLength={usersLength} pageSelected={pageSelected} pagination={pagination} onClickPage={this.props.onClickPage}/>
                    </CCardBody>
                </CCard>
            </CCol>
        )
    }
}
