import { CAlert, CButton, CCol, CRow, CSpinner } from '@coreui/react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appointmentActions from '../../services/redux/actions/appointmentActions'
import Confirmation from '../../components/common/Confirmation'
import Notification from '../../components/common/Notification'
import AppointmentModel from '../../services/models/AppointmentModel'
import actionTypes from '../../services/models/others/actionTypes'
import colorTypes from '../../services/models/others/colorTypes'
import pagination from '../../services/models/others/pagination'
import AppointmentTable from './AppointmentTable'
import notification from '../../services/models/others/notification'
import AppointmentCompletion from './AppointmentCompletion'


export class AppointmentsHistory extends Component {
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
            mode: actionTypes.NONE,
            showOffcanvas: false,
            showConfirmationModal: false,
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
        await this.props.getAppointmentsCompleted(this.state.pagination, this.state.searchParams);
        const { appointment } = this.props;
        this.setState({
            appointments: [...appointment.appointmentsCompleted],
            appointmentsLength: appointment.lengthCompleted,
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

    onComplete = (appointment) => {
        this.setState({showOffcanvas: true, appointmentSelected: {...appointment}});
    }

    onCloseOffcanvas = () => {
        this.setState({showOffcanvas: false, mode: actionTypes.NONE, appointmentSelected: new AppointmentModel()});
    }

    onAccept = (appointment) => {
        this.setState({showConfirmationModal: true, appointmentSelected: {...appointment}});
    }

    onSeeAppointments = () => {
        this.props.history.push("/appointments");
    }

    render() {
        const { auth } = this.props;
        const { appointments, loaded, failed, error, notifications, showOffcanvas, showConfirmationModal, mode, appointmentSelected, appointmentsLength, pageSelected, pagination, searchParams } = this.state;
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
                            historyMode={true}
                            appointments={appointments}
                            appointmentsLength={appointmentsLength}
                            pageSelected={pageSelected}
                            pagination={pagination}
                            searchParams={searchParams}
                            doctorProfile={doctorProfile}
                            onClickPage={this.onClickPage}
                            onChangeParams={this.onChangeParams}
                            onSearch={this.loadList}
                            onComplete={this.onComplete}
                        />
                        <CCol xs="12" className='jc-fe'>
                            <CButton color={colorTypes.LIGHT} onClick={this.onSeeAppointments}>
                                Back
                            </CButton>
                        </CCol>
                        <AppointmentCompletion
                            visible={showOffcanvas}
                            historyMode={true}
                            appointmentSelected={appointmentSelected}
                            onClose={this.onCloseOffcanvas}
                            onSave={this.onAccept}
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
        ...bindActionCreators(Object.assign({}, appointmentActions), dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsHistory)
