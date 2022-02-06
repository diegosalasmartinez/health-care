import React, { Component } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CBadge,
} from '@coreui/react'
import colorTypes from '../../services/models/others/colorTypes';

export default class BestSpecialties extends Component {
    getColor = (index) => {
        switch(index){
            case 0:
                return "border-start-info";
            case 1:
                return "border-start-warning";
            case 2:
                return "border-start-light";
            default:
                return "border-start-info";
        }
    }

    render() {
        const { bestSpecialties = [] } = this.props;
        return (
            <CCard className='mb-4'>
                <CCardHeader>
                    Best Specialties {' '}
                    <CBadge color={colorTypes.DARK} shape="rounded-pill">This month</CBadge>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        { bestSpecialties.map((s, index) => 
                            <CCol xs="4" key={index}>
                                <div className={"border-start border-start-4 py-1 px-3 " + this.getColor(index)}>
                                    <div className="text-medium-emphasis small">{"# Appointments: " + s.count}</div>
                                    <div className="fs-5 fw-semibold">{s.specialty.name}</div>
                                </div>
                            </CCol>
                        )}
                    </CRow>
                </CCardBody>
            </CCard>
        )
    }
}
