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

export class Patients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            patientSelected: new PatientModel(),
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

    onAddPatient = async () => {
        await this.props.stagePatient(new PatientModel());
        this.props.history.push("/patients/create");
    }
    
    onDeletePatient = (patient) => {
        this.setState({showPatientModal: true, mode: actionTypes.DELETE, patientSelected: {...patient}});
    }
    
    onUpdatePatient = async (patient) => {
        await this.props.stagePatient(patient);
        this.props.history.push("/patients/create");
    }

    onClosePatient = () => {
        this.setState({showPatientModal:false, mode: actionTypes.NONE, patientSelected: new PatientModel()});
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

    render() {
        const { patients, loaded, failed, error, notifications, showPatientModal, mode, patientSelected } = this.state;

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
                        <Confirmation
                            type="patient"
                            mode={mode} 
                            body={patientSelected.code + " - " + patientSelected.personInfo.name + " " + patientSelected.personInfo.lastName}
                            object={patientSelected}
                            visible={showPatientModal} 
                            onAccept={this.deletePatient}
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
