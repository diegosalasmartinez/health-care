import React, { Component } from 'react'
import { 
    CAlert,
    CButton,
    CCard, 
    CCardBody, 
    CCardHeader,
    CCol,
    CRow,
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
import colorTypes from '../../services/models/others/colorTypes'
import actionTypes from '../../services/models/others/actionTypes'
import notification from '../../services/models/others/notification'
import DoctorModel from '../../services/models/DoctorModel'
import DoctorDetails from './DoctorDetails'
import Notification from '../../components/common/Notification'

export class Doctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            doctorSelected: new DoctorModel(),
            showDoctorOffcanvas: false,
            mode: actionTypes.NONE,
            notifications: [],
            loaded: false,
            failed: false,
            error: "",
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

    onAddDoctor = () => {
        this.setState({showDoctorOffcanvas: true, mode: actionTypes.CREATE});
    }

    onCloseDoctor = () => {
        this.setState({showDoctorOffcanvas: false, mode: actionTypes.NONE, doctorSelected: new DoctorModel()});
    }

    onChangeDoctor = (doctor) => {
        this.setState({doctorSelected: doctor});
    }

    onSaveDoctor = async () => {
        this.setState({loaded: false, failed: false});
        
        await this.props.createDoctor(this.state.doctorSelected);
        const failed = this.props.doctor.failed;
        let newNotification;
        if (failed) {
            newNotification = new notification(colorTypes.DANGER, 'Error', this.props.doctor.error); 
        } else {
            newNotification = new notification(colorTypes.SUCCESS, 'Success', 'Doctor created.');
        }
        this.setState({
            loaded: true, 
            failed: false, 
            doctors: [...this.props.doctor.doctors],
            notifications: [...this.state.notifications, newNotification]
        });
    }

    render() {
        const { doctors, loaded, failed, error, notifications, showDoctorOffcanvas, mode, doctorSelected } = this.state;

        return (
            <>
                { failed && 
                    <CAlert variant={colorTypes.DANGER}>{error}</CAlert>
                }
                { notifications.map((notification, index) => 
                    <Notification key={index} mode={notification.mode} title={notification.title} body={notification.body}></Notification>
                )}
                { loaded && !failed && 
                    <CRow>
                        <CCol xs="12" className="right-side mb-3">
                            <CButton onClick={this.onAddDoctor}>Add a doctor</CButton>
                        </CCol>
                        <CCol xs="12">
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
                                                <CTableRow key={d._id}>
                                                    <CTableHeaderCell scope="row">{d.doctorInfo.code}</CTableHeaderCell>
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
                        </CCol>
                        <DoctorDetails 
                            visible={showDoctorOffcanvas} 
                            mode={mode} 
                            doctorSelected={doctorSelected}
                            onChangeDoctor={this.onChangeDoctor}
                            onSave={this.onSaveDoctor}
                            onClose={this.onCloseDoctor}
                        />
                    </CRow>
                }
                { !loaded &&
                    <CRow className="center">
                        <CSpinner color={colorTypes.PRIMARY}/>
                    </CRow>
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
