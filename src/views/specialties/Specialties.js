import React, { Component } from 'react'
import { CAlert, CRow, CSpinner } from '@coreui/react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as specialtyActions from '../../services/redux/actions/specialtyActions'
import colorTypes from '../../services/models/others/colorTypes'
import actionTypes from '../../services/models/others/actionTypes'
import notification from '../../services/models/others/notification'
import Notification from '../../components/common/Notification'
import SpecialtyTable from './SpecialtyTable'
import SpecialtyModel from '../../services/models/SpecialtyModel'
import Confirmation from '../../components/common/Confirmation'
import SpecialtyDetails from './SpecialtyDetails'
import pagination from '../../services/models/others/pagination'

export class Specialties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: new pagination(0,10),
            pageSelected: 1,
            specialties: [],
            specialtiesSelected: [],
            specialtySelected: new SpecialtyModel(),
            showOffcanvas: false,
            showConfirmationModal: false,
            mode: actionTypes.NONE,
            notifications: [],
            loaded: false,
            failed: false,
            error: "",
        }
    }

    async componentDidMount() {
        this.setState({loaded: false, failed: false});
        await this.props.getSpecialties();
        this.setState({
            specialties: [...this.props.specialty.specialties],
            loaded: this.props.specialty.loaded,
            failed: this.props.specialty.failed,
            error: this.props.specialty.error,
        }, () => {
            this.loadList();
        })
    }

    loadList = async () => {
        const { pagination, specialties } = this.state;
        const specialtiesCopy = [...specialties];
        const specialtiesSelected = specialtiesCopy.splice(pagination.offset, pagination.offset + pagination.limit);
        this.setState({specialtiesSelected})
    }

    onClickPage = (indexPage) => {
        const { pagination } = this.state;
        let paginationUpdated = {...pagination};
        paginationUpdated.offset = paginationUpdated.limit * (indexPage - 1);
        this.setState({ pagination: paginationUpdated, pageSelected: indexPage }, async function(){
            await this.loadList();
        })
    }

    onAdd = () => {
        this.setState({showOffcanvas: true, mode: actionTypes.CREATE});
    }
    
    onDelete = (specialty) => {
        this.setState({showConfirmationModal: true, mode: actionTypes.DELETE, specialtySelected: {...specialty}});
    }

    onUpdate = (specialty) => {
        this.setState({showOffcanvas: true, mode: actionTypes.UPDATE, specialtySelected: {...specialty}});
    }

    onAccept = (specialty) => {
        this.setState({showConfirmationModal: true, specialtySelected: {...specialty}});
    }

    onCloseOffcanvas = () => {
        this.setState({showOffcanvas: false, mode: actionTypes.NONE, specialtySelected: new SpecialtyModel()});
    }

    onCloseConfirmation = () => {
        this.setState({showConfirmationModal:false});
    }

    onSave = async (specialty) => {
        this.setState({loaded: false, failed: false});
        
        let bodyMessage = "";
        if (this.state.mode === actionTypes.CREATE) {
            await this.props.createSpecialty(specialty);
            bodyMessage = "Specialty created";
        } else if(this.state.mode === actionTypes.UPDATE) {
            await this.props.updateSpecialty(specialty);
            bodyMessage = "Specialty updated";
        } else {
            await this.props.deleteSpecialty(specialty);
            bodyMessage = "Specialty deleted";
        }
        const failed = this.props.specialty.failed;
        let newNotification;
        if (failed) {
            newNotification = new notification(colorTypes.DANGER, 'Error', this.props.specialty.error); 
        } else {
            newNotification = new notification(colorTypes.SUCCESS, 'Success', bodyMessage);
        }
        this.setState({
            loaded: true, 
            failed: false, 
            showOffcanvas: false,
            showConfirmationModal: false,
            mode: actionTypes.NONE, 
            specialtySelected: new SpecialtyModel(),
            specialties: [...this.props.specialty.specialties],
            notifications: [...this.state.notifications, newNotification]
        });
    }

    render() {
        const { specialties, loaded, failed, error, notifications, showOffcanvas, showConfirmationModal, mode, specialtySelected, pageSelected, pagination, specialtiesSelected } = this.state;

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
                        <SpecialtyTable
                            specialties={specialtiesSelected}
                            specialtiesLength={specialties.length}
                            pageSelected={pageSelected}
                            pagination={pagination}
                            onClickPage={this.onClickPage}
                            onAdd={this.onAdd}
                            onUpdate={this.onUpdate}
                            onDelete={this.onDelete}
                        />
                        <SpecialtyDetails
                            visible={showOffcanvas} 
                            mode={mode} 
                            specialtySelected={specialtySelected}
                            onSave={this.onAccept}
                            onClose={this.onCloseOffcanvas}
                        />
                        <Confirmation
                            type="specialty"
                            mode={mode} 
                            body={specialtySelected.code + " - " + specialtySelected.name}
                            object={specialtySelected}
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
        specialty: state.specialty
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(specialtyActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Specialties)
