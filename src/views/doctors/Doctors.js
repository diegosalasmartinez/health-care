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
import * as doctorActions from '../../services/redux/actions/doctorActions'
import colorTypes from '../../services/models/others/colorTypes'
import actionTypes from '../../services/models/others/actionTypes'
import notification from '../../services/models/others/notification'
import DoctorModel from '../../services/models/DoctorModel'
import DoctorDetails from './DoctorDetails'
import Notification from '../../components/common/Notification'
import DoctorTable from './DoctorTable'
import Confirmation from '../../components/common/Confirmation'

export class Doctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            doctorSelected: new DoctorModel(),
            showDoctorOffcanvas: false,
            showDoctorModal: false,
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
    
    onDeleteDoctor = (doctor) => {
        this.setState({showDoctorModal: true, mode: actionTypes.DELETE, doctorSelected: {...doctor}});
    }

    onUpdateDoctor = (doctor) => {
        this.setState({showDoctorOffcanvas: true, mode: actionTypes.UPDATE, doctorSelected: {...doctor}});
    }

    onCloseDoctor = () => {
        this.setState({showDoctorOffcanvas: false, showDoctorModal:false, mode: actionTypes.NONE, doctorSelected: new DoctorModel()});
    }

    saveDoctor = async (doctor) => {
        this.setState({loaded: false, failed: false});
        
        let bodyMessage = "";
        if (this.state.mode === actionTypes.CREATE) {
            await this.props.createDoctor(doctor);
            bodyMessage = "Doctor created";
        } else if(this.state.mode === actionTypes.UPDATE) {
            await this.props.updateDoctor(doctor);
            bodyMessage = "Doctor updated";
        } else {
            await this.props.deleteDoctor(doctor);
            bodyMessage = "Doctor deleted";
        }
        const failed = this.props.doctor.failed;
        let newNotification;
        if (failed) {
            newNotification = new notification(colorTypes.DANGER, 'Error', this.props.doctor.error); 
        } else {
            newNotification = new notification(colorTypes.SUCCESS, 'Success', bodyMessage);
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
        const { doctors, loaded, failed, error, notifications, showDoctorOffcanvas, showDoctorModal, mode, doctorSelected } = this.state;

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
                            <CTooltip content="Add a new doctor" placement="top">
                                <CButton onClick={this.onAddDoctor} style={{color: 'white'}}>
                                    <CIcon icon={cilMedicalCross} size="sm"/>
                                </CButton>
                            </CTooltip>
                        </CCol>
                        <DoctorTable 
                            doctors={doctors}
                            onUpdate={this.onUpdateDoctor}
                            onDelete={this.onDeleteDoctor}
                        />
                        <DoctorDetails 
                            visible={showDoctorOffcanvas} 
                            mode={mode} 
                            doctorSelected={doctorSelected}
                            onSave={this.saveDoctor}
                            onClose={this.onCloseDoctor}
                        />
                        <Confirmation
                            type="doctor"
                            mode={mode}
                            body={doctorSelected.doctorInfo.code + " - " + doctorSelected.personInfo.name + " " + doctorSelected.personInfo.lastName}
                            object={doctorSelected}
                            visible={showDoctorModal} 
                            onAccept={this.saveDoctor}
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
