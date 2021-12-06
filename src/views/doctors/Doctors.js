import React, { Component } from 'react'
import { 
    CAlert,
    CCard, 
    CCardBody, 
    CCardHeader,
    CSpinner,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as doctorActions from '../../services/redux/actions/doctorActions'

export class Doctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            loaded: false,
            failed: false,
            error: ""
        }
    }

    async componentDidMount() {
        await this.props.getDoctors();
        this.setState({
            doctors: [...this.props.doctor.doctors],
            loaded: this.props.doctor.loaded,
            failed: this.props.doctor.failed,
            error: this.props.doctor.error,
        })
    }

    render() {
        const { doctors, loaded, failed, error } = this.state;

        return (
            <>
                { failed && 
                    <CAlert variant="warning">{error}</CAlert>
                }
                { loaded && !failed && 
                    <CCard>
                        <CCardHeader>Doctors</CCardHeader>
                        <CCardBody>
                            <CTable>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Specialty</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    { doctors.map(d => 
                                        <CTableRow>
                                            <CTableHeaderCell key={d._id} scope="row">{d.doctorInfo.code}</CTableHeaderCell>
                                            <CTableDataCell>{d.personInfo.name}</CTableDataCell>
                                            <CTableDataCell>{d.personInfo.lastName}</CTableDataCell>
                                            <CTableDataCell>{d.personInfo.email}</CTableDataCell>
                                            <CTableDataCell>{d.personInfo.phone}</CTableDataCell>
                                            <CTableDataCell>{d.doctorInfo.specialty}</CTableDataCell>
                                        </CTableRow>
                                    ) }
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                }
                { !loaded &&
                    <CSpinner color="primary"/>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        doctor: state.doctor
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(doctorActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Doctors)
