import React, { Component } from 'react'
import { 
    CAlert,
    CButton,
    CCol,
    CRow,
    CSpinner,
    CTooltip
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMedicalCross } from '@coreui/icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as patientActions from '../../services/redux/actions/patientActions'
import colorTypes from '../../services/models/others/colorTypes'
import actionTypes from '../../services/models/others/actionTypes'
import notification from '../../services/models/others/notification'
import Notification from '../../components/common/Notification'
import PatientTable from './PatientTable'
import PatientModel from '../../services/models/PatientModel'
import AppointmentModel from '../../services/models/AppointmentModel'
import Confirmation from '../../components/common/Confirmation'
import AppointmentDetails from '../appointments/AppointmentDetails'

export class Patients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            patientSelected: new PatientModel(),
            appointmentSelected: new AppointmentModel(),
            showModal: false,
            showModalAppointment: false,
            showOffcanvasAppointment: false,
            mode: actionTypes.NONE,
            notifications: [],
            loaded: false,
            failed: false,
            error: "",
        }
    }

    async componentDidMount() {
        await this.props.getPatients();
        this.setState({
            patients: [...this.props.patient.patients],
            loaded: this.props.patient.loaded,
            failed: this.props.patient.failed,
            error: this.props.patient.error,
        })
    }

    onCreateAppointment = (patient) => {
        this.setState({showOffcanvasAppointment: true, mode: actionTypes.CREATE, patientSelected: {...patient}});
    }

    onAddPatient = async () => {
        await this.props.stagePatient(new PatientModel());
        this.props.history.push("/patients/create");
    }
    
    onDeletePatient = (patient) => {
        this.setState({showModal: true, mode: actionTypes.DELETE, patientSelected: {...patient}});
    }
    
    onUpdatePatient = async (patient) => {
        await this.props.stagePatient(patient);
        this.props.history.push("/patients/update");
    }

    onClosePatient = () => {
        this.setState({showModal:false, mode: actionTypes.NONE, patientSelected: new PatientModel()});
    }

    deletePatient = async (patient) => {
        this.setState({loaded: false, failed: false});
        
        await this.props.deletePatient(patient);
        
        const failed = this.props.patient.failed;
        let newNotification;
        if (failed) {
            newNotification = new notification(colorTypes.DANGER, 'Error', this.props.patient.error); 
        } else {
            newNotification = new notification(colorTypes.SUCCESS, 'Success', "Patient deleted");
        }
        this.setState({
            loaded: true, 
            failed: false, 
            mode: actionTypes.NONE, 
            patientSelected: new PatientModel(),
            patients: [...this.props.patient.patients],
            notifications: [...this.state.notifications, newNotification]
        });
    }

    onAcceptAppointment = (appointment) => {
        this.setState({showModalAppointment: true, appointmentSelected: {...appointment}});
    }

    onCloseOffcanvasAppointment = () => {
        this.setState({showOffcanvasAppointment: false, mode: actionTypes.NONE, appointmentSelected: new AppointmentModel()});
    }
    
    onCloseModalAppointment = () => {
        this.setState({showModalAppointment: false});
    }

    onSaveAppointment = async (appointment) => {
        console.log(appointment);
    }

    render() {
        const { patients, loaded, failed, error, notifications, showModal, showOffcanvasAppointment, showModalAppointment, mode, patientSelected, appointmentSelected } = this.state;
        const { auth } = this.props;

        return (
            <>
                { failed && 
                    <CAlert color={colorTypes.DANGER}>{error}</CAlert>
                }
                { notifications.map((notification, index) => 
                    <Notification key={index} mode={notification.mode} title={notification.title} body={notification.body}></Notification>
                )}
                { loaded && !failed && 
                    <CRow>
                        <CCol xs="12" className="right-side mb-3">
                            <CTooltip content="Add a new patient" placement="top">
                                <CButton onClick={this.onAddPatient} style={{color: 'white'}}>
                                    <CIcon icon={cilMedicalCross} size="sm"/>
                                </CButton>
                            </CTooltip>
                        </CCol>
                        <PatientTable
                            patients={patients}
                            onUpdate={this.onUpdatePatient}
                            onDelete={this.onDeletePatient}
                            onCreateAppointment={this.onCreateAppointment}
                            role={auth.user.role}
                        />
                        <AppointmentDetails
                            visible={showOffcanvasAppointment} 
                            mode={mode} 
                            patientSelected={patientSelected}
                            onSave={this.onAcceptAppointment}
                            onClose={this.onCloseOffcanvasAppointment}
                        />
                        <Confirmation
                            type="patient"
                            mode={mode} 
                            body={patientSelected.code + " - " + patientSelected.personInfo.name + " " + patientSelected.personInfo.lastName}
                            object={patientSelected}
                            visible={showModal} 
                            onAccept={this.deletePatient}
                            onClose={this.onClosePatient}
                        />
                        <Confirmation
                            type="appointment"
                            mode={mode} 
                            object={appointmentSelected}
                            visible={showModalAppointment} 
                            onAccept={this.onSaveAppointment}
                            onClose={this.onCloseModalAppointment}
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
        patient: state.patient,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(patientActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Patients)
