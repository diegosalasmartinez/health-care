import React, { Component } from 'react'
import { 
    CAlert,
    CButton,
    CCol,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CSpinner,
    CTabContent,
    CTabPane
} from '@coreui/react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as patientActions from '../../services/redux/actions/patientActions'
import colorTypes from '../../services/models/others/colorTypes'
import actionTypes from '../../services/models/others/actionTypes'
import notification from '../../services/models/others/notification'
import Notification from '../../components/common/Notification'
import PatientModel from '../../services/models/PatientModel'
import Confirmation from '../../components/common/Confirmation'
import cloneDeep from 'lodash/cloneDeep'
import PersonalInformation from './clinicHistory/PersonalInformation'
import ExtraInformation from './clinicHistory/ExtraInformation'
import ClinicHistory from './clinicHistory/ClinicHistory'

export class PatientHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            firstTime: true, 
            patient: new PatientModel(),
            notifications: [],
            loaded: false,
            failed: false,
            error: "",
        }
    }

    componentDidMount() {
        const patient = this.props.patient.patientSelected;
        if (patient._id === "") {
            this.props.history.push("/");
        } else {
            this.setState({patient: cloneDeep(patient), loaded: true});
        }
    }
    
    goBack = () => {
        const { auth } = this.props;
        if (auth.user.role === "DOCTOR") {
            this.props.history.push("/appointments");
        } else {
            this.props.history.push("/patients");
        }
    }

    onSave = async (patient) => {
        this.setState({loaded: false, failed: false});
        
        await this.props.updatePatientHistory(patient);
        const failed = this.props.patient.failed;
        let newNotification;
        if (failed) {
            newNotification = new notification(colorTypes.DANGER, 'Error', this.props.patient.error); 
        } else {
            newNotification = new notification(colorTypes.SUCCESS, 'Success', "Patient history updated");             
        }
        this.setState({
            loaded: true, 
            failed: false, 
            patient: failed ? this.state.patient : patient,
            notifications: [...this.state.notifications, newNotification]
        });
    }

    render() {
        const { activeTab, patient, loaded, failed, notifications } = this.state;
        const { auth } = this.props;
        const editMode = auth.user.role !== "SECRETARY";

        return (
            <>
                { notifications.map((notification, index) => 
                    <Notification key={index} mode={notification.mode} title={notification.title} body={notification.body}></Notification>
                )}
                { loaded && !failed && 
                    <CRow>
                        <CCol xs="12">
                            <CNav variant='tabs' role="tablist">
                                <CNavItem>
                                    <CNavLink href="javascript:void(0);" active={activeTab === 1} onClick={() => this.setState({activeTab: 1})}>
                                        Personal Information
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="javascript:void(0);" active={activeTab === 2} onClick={() => this.setState({activeTab: 2})}>
                                        Extra Information
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="javascript:void(0);" active={activeTab === 3} onClick={() => this.setState({activeTab: 3})}>
                                        Clinic History
                                    </CNavLink>
                                </CNavItem>
                            </CNav>
                            <CTabContent>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeTab === 1}>
                                    <PersonalInformation patient={patient}></PersonalInformation>
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeTab === 2}>
                                    <ExtraInformation patient={patient}></ExtraInformation>
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeTab === 3}>
                                    <ClinicHistory patient={patient} editMode={editMode} goBack={this.goBack} onSave={this.onSave}></ClinicHistory>
                                </CTabPane>
                            </CTabContent>
                        </CCol>
                        <CCol xs="12" className='jc-fe'>
                            <CButton color={colorTypes.LIGHT} style={{marginRight: "1rem"}} onClick={this.goBack}>Back</CButton>
                        </CCol>
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
        ...bindActionCreators(Object.assign({}, patientActions), dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(PatientHistory)