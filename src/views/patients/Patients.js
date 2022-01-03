import React, { Component } from 'react'
import { 
    CAlert,
    CRow,
    CSpinner
} from '@coreui/react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as patientActions from '../../services/redux/actions/patientActions'
import colorTypes from '../../services/models/others/colorTypes'
import actionTypes from '../../services/models/others/actionTypes'
import notification from '../../services/models/others/notification'
import pagination from '../../services/models/others/pagination'
import Notification from '../../components/common/Notification'
import PatientTable from './PatientTable'
import PatientModel from '../../services/models/PatientModel'
import Confirmation from '../../components/common/Confirmation'

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
            showPatientModal: false,
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
        const { patients, loaded, failed, error, notifications, showPatientModal, mode, patientSelected, patientsLength, pageSelected, pagination,searchParams } = this.state;

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
