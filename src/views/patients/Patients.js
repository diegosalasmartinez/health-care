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
import Confirmation from '../../components/common/Confirmation'
import PatientDetails from './PatientDetails'

export class Patients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            patientSelected: new PatientModel(),
            showPatientOffcanvas: false,
            showPatientModal: false,
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

    onAddPatient = () => {
        this.setState({showPatientOffcanvas: true, mode: actionTypes.CREATE});
    }
    
    onDeletePatient = (patient) => {
        this.setState({showPatientModal: true, mode: actionTypes.DELETE, patientSelected: {...patient}});
    }

    onUpdatePatient = (patient) => {
        this.setState({showPatientOffcanvas: true, mode: actionTypes.UPDATE, patientSelected: {...patient}});
    }

    onClosePatient = () => {
        this.setState({showPatientOffcanvas: false, showPatientModal:false, mode: actionTypes.NONE, patientSelected: new PatientModel()});
    }

    savePatient = async (patient) => {
        this.setState({loaded: false, failed: false});
        
        let bodyMessage = "";
        if (this.state.mode === actionTypes.CREATE) {
            await this.props.createPatient(patient);
            bodyMessage = "Patient created";
        } else if(this.state.mode === actionTypes.UPDATE) {
            await this.props.updatePatient(patient);
            bodyMessage = "Patient updated";
        } else {
            await this.props.deletePatient(patient);
            bodyMessage = "Patient deleted";
        }
        const failed = this.props.patient.failed;
        let newNotification;
        if (failed) {
            newNotification = new notification(colorTypes.DANGER, 'Error', this.props.patient.error); 
        } else {
            newNotification = new notification(colorTypes.SUCCESS, 'Success', bodyMessage);
        }
        this.setState({
            loaded: true, 
            failed: false, 
            showPatientOffcanvas: false,
            mode: actionTypes.NONE, 
            patientSelected: new PatientModel(),
            patients: [...this.props.patient.patients],
            notifications: [...this.state.notifications, newNotification]
        });
    }

    render() {
        const { patients, loaded, failed, error, notifications, showPatientOffcanvas, showPatientModal, mode, patientSelected } = this.state;

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
                        />
                        <PatientDetails
                            visible={showPatientOffcanvas} 
                            mode={mode} 
                            patientSelected={patientSelected}
                            onSave={this.savePatient}
                            onClose={this.onClosePatient}
                        />
                        <Confirmation
                            type="patient"
                            mode={mode} 
                            body={patientSelected.code + " - " + patientSelected.personInfo.name + " " + patientSelected.personInfo.lastName}
                            object={patientSelected}
                            visible={showPatientModal} 
                            onAccept={this.savePatient}
                            onClose={this.onClosePatient}
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
        patient: state.patient
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(patientActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Patients)
