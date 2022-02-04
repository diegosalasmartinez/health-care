import React, { Component } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
} from '@coreui/react'

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
            <CCard>
                <CCardHeader>
                Best Specialties
                </CCardHeader>
                <CCardBody>
                    {/* <CRow className='mb-3'>
                        <CCol>
                            <h4 id="traffic" className="card-title mb-0">
                                Best Specialties
                            </h4>
                        </CCol>
                    </CRow> */}
                    <CRow>
                        { bestSpecialties.map((s, index) => 
                            <CCol xs="4" key={index}>
                                <div className={"border-start border-start-4 py-1 px-3 " + this.getColor(index)}>
                                    <div className="text-medium-emphasis small">{"# Appointments: " + s.count}</div>
                                    <div className="fs-5 fw-semibold">{s.specialty.name}</div>
                                </div>
                                {/* <CWidgetStatsA
                                    className="mb-4 pb-2"
                                    color="primary"
                                    value={<>{s.specialty.name + ' '}</>}
                                    title={"# Appointments: " + s.count}
                                /> */}
                            </CCol>
                        )}
                    </CRow>
                </CCardBody>
            </CCard>
        )
    }
}
