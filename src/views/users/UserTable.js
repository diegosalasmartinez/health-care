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
import { userTypes } from 'src/utils/userUtils'
import Pagination from '../../components/common/Pagination'

export default class UserTable extends Component {
    onUpdate = (user) => {
        this.props.onUpdate(user);
    }

    onDelete = (user) => {
        this.props.onDelete(user);
    }

    render() {
        const { users, usersLength, pageSelected, pagination } = this.props;

        return (
            <CCol xs="12">
                <CCard>
                    <CCardBody>
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
