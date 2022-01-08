import React, { Component } from 'react'
import { 
    CAlert,
    CRow,
    CSpinner,
} from '@coreui/react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as doctorActions from '../../services/redux/actions/doctorActions'
import colorTypes from '../../services/models/others/colorTypes'
import actionTypes from '../../services/models/others/actionTypes'
import notification from '../../services/models/others/notification'
import pagination from '../../services/models/others/pagination'
import DoctorModel from '../../services/models/DoctorModel'
import DoctorDetails from './DoctorDetails'
import Notification from '../../components/common/Notification'
import DoctorTable from './DoctorTable'
import Confirmation from '../../components/common/Confirmation'

export class Doctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParams: {
                code: '',
                name: '',
                specialtyId: ''
            },
            pagination: new pagination(0,10),
            pageSelected: 1,
            doctors: [],
            doctorsLength: [],
            doctorSelected: new DoctorModel(),
            showOffcanvas: false,
            showConfirmationModal: false,
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
        await this.props.getDoctors(this.state.pagination, this.state.searchParams);
        const { doctor } = this.props;
        this.setState({
            doctors: [...doctor.doctors],
            doctorsLength: doctor.length,
            loaded: doctor.loaded,
            failed: doctor.failed,
            error: doctor.error,
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
    
    onDelete = (doctor) => {
        this.setState({showConfirmationModal: true, mode: actionTypes.DELETE, doctorSelected: {...doctor}});
    }

    onUpdate = (doctor) => {
        this.setState({showOffcanvas: true, mode: actionTypes.UPDATE, doctorSelected: {...doctor}});
    }

    onAccept = (doctor) => {
        this.setState({showConfirmationModal: true, doctorSelected: {...doctor}});
    }

    onCloseOffcanvas = () => {
        this.setState({showOffcanvas: false, mode: actionTypes.NONE, doctorSelected: new DoctorModel()});
    }

    onCloseConfirmation = () => {
        this.setState({showConfirmationModal:false});
    }

    onSave = async (doctor) => {
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
            showOffcanvas: false,
            showConfirmationModal: false,
            mode: actionTypes.NONE, 
            doctorSelected: new DoctorModel(),
            doctors: [...this.props.doctor.doctors],
            notifications: [...this.state.notifications, newNotification]
        });
    }

    render() {
        const { specialties } = this.props;
        const { doctors, loaded, failed, error, notifications, showOffcanvas, showConfirmationModal, mode, doctorSelected, doctorsLength, pageSelected, pagination, searchParams } = this.state;

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
                        <DoctorTable 
                            doctors={doctors}
                            specialties={specialties}
                            doctorsLength={doctorsLength}
                            pageSelected={pageSelected}
                            pagination={pagination}
                            searchParams={searchParams}
                            onClickPage={this.onClickPage}
                            onChangeParams={this.onChangeParams}
                            onAdd={this.onAdd}
                            onSearch={this.loadList}
                            onUpdate={this.onUpdate}
                            onDelete={this.onDelete}
                        />
                        <DoctorDetails 
                            visible={showOffcanvas} 
                            mode={mode} 
                            doctorSelected={doctorSelected}
                            specialties={specialties}
                            onSave={this.onAccept}
                            onClose={this.onCloseOffcanvas}
                        />
                        <Confirmation
                            type="doctor"
                            mode={mode}
                            body={doctorSelected.doctorInfo.code + " - " + doctorSelected.personInfo.name + " " + doctorSelected.personInfo.lastName}
                            object={doctorSelected}
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
        doctor: state.doctor,
        specialties: state.specialty.specialties
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(doctorActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Doctors)
