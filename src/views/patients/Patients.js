import React, { Component } from 'react'
import { 
    CAlert,
    CRow,
    CSpinner
} from '@coreui/react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as patientActions from '../../services/redux/actions/patientActions'
import * as appointmentActions from '../../services/redux/actions/appointmentActions'
import colorTypes from '../../services/models/others/colorTypes'
import actionTypes from '../../services/models/others/actionTypes'
import notification from '../../services/models/others/notification'
import pagination from '../../services/models/others/pagination'
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
            searchParams: {
                code: '',
                dni: '',
                name: ''
            },
            pagination: new pagination(0,10),
            pageSelected: 1,
            patients: [],
            patientsLength: 0,
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
        await this.loadList();
    }

    loadList = async () => {
        this.setState({loaded: false, failed: false});
        await this.props.getPatients(this.state.pagination, this.state.searchParams);
        const { patient } = this.props;
        this.setState({
            patients: [...patient.patients],
            patientsLength: patient.length,
            loaded: patient.loaded,
            failed: patient.failed,
            error: patient.error,
        })
    }


    onClickPage = (indexPage) => {
        const { pagination } = this.state;
        let paginationUpdated = {...pagination};
        paginationUpdated.offset = paginationUpdated.limit * (indexPage - 1);
        this.setState({ pagination: paginationUpdated, pageSelected: indexPage }, async function(){
            await this.loadList();
        })
    }

    onChangeParams = (key) => (e = {}) => {
        const { searchParams } = this.state;
        let val = e.target.value;
        let searchParamsUpdated = { ...searchParams };
        searchParamsUpdated[key] = val;
        this.setState({searchParams: searchParamsUpdated});
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
        this.setState({loaded: false, failed: false});

        await this.props.createAppointment(appointment);
        const failed = this.props.appointment.failed;
        let newNotification;
        if (failed) {
            newNotification = new notification(colorTypes.DANGER, 'Error', this.props.appointment.error); 
        } else {
            newNotification = new notification(colorTypes.SUCCESS, 'Success', "Appointment created");
        }
        this.setState({
            loaded: true, 
            failed: false, 
            showOffcanvas: false,
            showOffcanvasAppointment: false,
            showModalAppointment: false,
            mode: actionTypes.NONE, 
            patientSelected: new PatientModel(),
            appointmentSelected: new AppointmentModel(),
            notifications: [...this.state.notifications, newNotification]
        });
    }

    render() {
        const { patients, loaded, failed, error, notifications, showModal, showOffcanvasAppointment, showModalAppointment, mode, patientSelected, appointmentSelected, patientsLength, pageSelected, pagination,searchParams } = this.state;
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
                        <PatientTable
                            patients={patients}
                            patientsLength={patientsLength}
                            pageSelected={pageSelected}
                            pagination={pagination}
                            searchParams={searchParams}
                            onClickPage={this.onClickPage}
                            onChangeParams={this.onChangeParams}
                            onAddPatient={this.onAddPatient}
                            onSearch={this.loadList}
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
        appointment: state.appointment,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(Object.assign({}, patientActions, appointmentActions), dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Patients)
