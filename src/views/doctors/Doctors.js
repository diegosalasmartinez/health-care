import React, { Component } from 'react'
import { 
    CAlert,
    CButton,
    CCol,
    CRow,
    CSpinner
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
import DoctorTable from './DoctorTable'

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
    
    onUpdateDoctor = (doctor) => {
        this.setState({showDoctorOffcanvas: true, mode: actionTypes.UPDATE, doctorSelected: {...doctor}});
    }

    onCloseDoctor = () => {
        this.setState({showDoctorOffcanvas: false, mode: actionTypes.NONE, doctorSelected: new DoctorModel()});
    }

    saveDoctor = async (doctor) => {
        this.setState({loaded: false, failed: false});
        
        if (this.state.mode === actionTypes.CREATE) {
            await this.props.createDoctor(doctor);
        } else {
            await this.props.updateDoctor(doctor);
        }
        const failed = this.props.doctor.failed;
        let newNotification;
        if (failed) {
            newNotification = new notification(colorTypes.DANGER, 'Error', this.props.doctor.error); 
        } else {
            const titleMessage = this.state.mode === actionTypes.CREATE ? 'Doctor created' : 'Doctor updated';
            newNotification = new notification(colorTypes.SUCCESS, 'Success', titleMessage);
        }
        this.setState({
            loaded: true, 
            failed: false, 
            showDoctorOffcanvas: false,
            mode: actionTypes.NONE, 
            doctorSelected: new DoctorModel(),
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
                        <DoctorTable 
                            doctors={doctors}
                            onUpdate={this.onUpdateDoctor}
                        />
                        <DoctorDetails 
                            visible={showDoctorOffcanvas} 
                            mode={mode} 
                            doctorSelected={doctorSelected}
                            onSave={this.saveDoctor}
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
