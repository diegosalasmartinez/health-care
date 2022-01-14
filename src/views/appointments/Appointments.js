import { CAlert, CButton, CCol, CRow, CSpinner } from '@coreui/react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appointmentActions from '../../services/redux/actions/appointmentActions'
import * as patientActions from '../../services/redux/actions/patientActions'
import Confirmation from '../../components/common/Confirmation'
import Notification from '../../components/common/Notification'
import AppointmentModel from '../../services/models/AppointmentModel'
import actionTypes from '../../services/models/others/actionTypes'
import colorTypes from '../../services/models/others/colorTypes'
import pagination from '../../services/models/others/pagination'
import AppointmentDetails from './AppointmentDetails'
import AppointmentTable from './AppointmentTable'
import notification from '../../services/models/others/notification'
import AppointmentCompletion from './AppointmentCompletion'

export class Appointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParams: {
                patient: '',
                doctor: ''
            },
            pagination: new pagination(0,10),
            pageSelected: 1,
            appointments: [],
            appointmentsLength: [],
            appointmentSelected: new AppointmentModel(),
            showOffcanvas: false,
            showConfirmationModal: false,
            showOffcanvasAppointment: false,
            showConfirmationModalAppointment: false,
            mode: actionTypes.NONE,
            notifications: [],
            loaded: false,
            failed: false,
            error: ""
        }
    }

    async componentDidMount() {
        await this.loadList();
    }

    loadList = async () => {
        this.setState({loaded: false, failed: false});
        await this.props.getAppointments(this.state.pagination, this.state.searchParams);
        const { appointment } = this.props;
        this.setState({
            appointments: [...appointment.appointments],
            appointmentsLength: appointment.length,
            loaded: appointment.loaded,
            failed: appointment.failed,
            error: appointment.error,
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

    onAdd = () => {
        this.setState({showOffcanvas: true, mode: actionTypes.CREATE});
    }
    
    onDelete = (appointment) => {
        this.setState({showConfirmationModal: true, mode: actionTypes.DELETE, appointmentSelected: {...appointment}});
    }

    onUpdate = (appointment) => {
        this.setState({showOffcanvas: true, mode: actionTypes.UPDATE, appointmentSelected: {...appointment}});
    }

    onAccept = (appointment) => {
        this.setState({showConfirmationModal: true, appointmentSelected: {...appointment}});
    }
    
    onAcceptAppointment = (appointment) => {
        this.setState({showConfirmationModalAppointment: true, appointmentSelected: {...appointment}});
    }
    
    onUpdateHistory = async (patient) => {
        await this.props.stagePatient(patient);
        this.props.history.push("/patients/history");
    }

    onComplete = (appointment) => {
        this.setState({showOffcanvasAppointment: true, appointmentSelected: {...appointment}});
    }

    onCloseOffcanvas = () => {
        this.setState({showOffcanvas: false, mode: actionTypes.NONE, appointmentSelected: new AppointmentModel()});
    }

    onCloseOffcanvasAppointment = () => {
        this.setState({showOffcanvasAppointment: false, mode: actionTypes.NONE, appointmentSelected: new AppointmentModel()});
    }
    
    onCloseConfirmation = () => {
        this.setState({showConfirmationModal:false});
    }
    
    onCloseConfirmationAppointment = () => {
        this.setState({showConfirmationModalAppointment:false});
    }

    onSave = async (appointment) => {
        this.setState({loaded: false, failed: false});
        
        let bodyMessage = "";
        if (this.state.mode === actionTypes.CREATE) {
            await this.props.createAppointment(appointment);
            bodyMessage = "Appointment created";
        } else if(this.state.mode === actionTypes.UPDATE) {
            await this.props.updateAppointment(appointment);
            bodyMessage = "Appointment updated";
        } else {
            await this.props.deleteAppointment(appointment);
            bodyMessage = "Appointment deleted";
        }
        const failed = this.props.appointment.failed;
        let newNotification;
        if (failed) {
            newNotification = new notification(colorTypes.DANGER, 'Error', this.props.appointment.error); 
        } else {
            newNotification = new notification(colorTypes.SUCCESS, 'Success', bodyMessage);
        }
        this.setState({
            loaded: true, 
            failed: false, 
            showOffcanvas: false,
            showConfirmationModal: false,
            mode: actionTypes.NONE, 
            appointmentSelected: new AppointmentModel(),
            appointments: [...this.props.appointment.appointments],
            notifications: [...this.state.notifications, newNotification]
        });
    }

    onSaveCompletion = async (appointment) => {
        this.setState({loaded: false, failed: false});
        
        let bodyMessage = "Appointment completed";
        await this.props.completeAppointment(appointment);

        const failed = this.props.appointment.failed;
        let newNotification;
        if (failed) {
            newNotification = new notification(colorTypes.DANGER, 'Error', this.props.appointment.error); 
        } else {
            newNotification = new notification(colorTypes.SUCCESS, 'Success', bodyMessage);
        }
        this.setState({
            loaded: true, 
            failed: false, 
            showOffcanvasAppointment: false,
            showConfirmationModalAppointment: false,
            mode: actionTypes.NONE, 
            appointmentSelected: new AppointmentModel(),
            appointments: [...this.props.appointment.appointments],
            notifications: [...this.state.notifications, newNotification]
        });
    }

    onSeeHistory = () => {
        this.props.history.push("/appointments/history");
    }

    render() {
        const { auth } = this.props;
        const { appointments, loaded, failed, error, notifications, showOffcanvas, showConfirmationModal, showOffcanvasAppointment, showConfirmationModalAppointment, mode, appointmentSelected, appointmentsLength, pageSelected, pagination, searchParams } = this.state;
        const doctorProfile = auth.user.role === "DOCTOR";

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
                        <AppointmentTable 
                            appointments={appointments}
                            appointmentsLength={appointmentsLength}
                            pageSelected={pageSelected}
                            pagination={pagination}
                            searchParams={searchParams}
                            doctorProfile={doctorProfile}
                            onClickPage={this.onClickPage}
                            onChangeParams={this.onChangeParams}
                            onAdd={this.onAdd}
                            onSearch={this.loadList}
                            onUpdate={this.onUpdate}
                            onDelete={this.onDelete}
                            onUpdateHistory={this.onUpdateHistory}
                            onComplete={this.onComplete}
                        />
                        <CCol xs="12" className='jc-fe'>
                            <CButton color={colorTypes.LIGHT} onClick={this.onSeeHistory}>
                                See history
                            </CButton>
                        </CCol>
                        <AppointmentDetails
                            visible={showOffcanvas} 
                            mode={mode} 
                            appointmentSelected={appointmentSelected}
                            onSave={this.onAccept}
                            onClose={this.onCloseOffcanvas}
                        />
                        <AppointmentCompletion
                            visible={showOffcanvasAppointment}
                            appointmentSelected={appointmentSelected}
                            onClose={this.onCloseOffcanvasAppointment}
                            onSave={this.onAcceptAppointment}
                        />
                        <Confirmation
                            type="appointment"
                            mode={mode}
                            body={appointmentSelected._id}
                            object={appointmentSelected}
                            visible={showConfirmationModal} 
                            onAccept={this.onSave}
                            onClose={this.onCloseConfirmation}
                        />
                        <Confirmation
                            specialTextMessage={true}
                            titleTxt="Complete appointment"
                            messageTxt="Are you sure you want to mark this appointment as completed?"
                            buttonTxt="Accept"
                            object={appointmentSelected}
                            visible={showConfirmationModalAppointment} 
                            onAccept={this.onSaveCompletion}
                            onClose={this.onCloseConfirmationAppointment}
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
        auth: state.auth,
        appointment: state.appointment
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(Object.assign({}, appointmentActions, patientActions), dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Appointments)
