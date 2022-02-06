import React, { Component } from 'react';
import { 
	CBadge,
	CCard, 
	CCardBody, 
	CCardHeader, 
	CCol,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from '@coreui/react'
import colorTypes from '../../services/models/others/colorTypes';

export default class BestDoctors extends Component {
	render() {
		const { bestDoctors } = this.props;

		return (
			<CCol xs="12">
                <CCard>
					<CCardHeader>
						Best Doctors {' '}
						<CBadge color={colorTypes.DARK} shape="rounded-pill">This month</CBadge>
					</CCardHeader>
                    <CCardBody>
                        <CTable responsive>
                            <CTableHead>
                                <CTableRow>
									<CTableHeaderCell scope="col">Code</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">CMP</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Specialty</CTableHeaderCell>
                                    <CTableHeaderCell scope="col"># Appointments</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                { bestDoctors.map(d => 
                                    <CTableRow key={d._id}>
                                        <CTableDataCell>{d.doctor.doctorInfo.code}</CTableDataCell>
                                        <CTableDataCell>{d.doctor.doctorInfo.CMP}</CTableDataCell>
                                        <CTableDataCell>{d.doctor.personInfo.name}</CTableDataCell>
                                        <CTableDataCell>{d.doctor.personInfo.lastName}</CTableDataCell>
                                        <CTableDataCell>{d.doctor.doctorInfo.specialtyInfo.name}</CTableDataCell>
                                        <CTableDataCell>{d.count}</CTableDataCell>
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
