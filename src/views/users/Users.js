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
import * as userActions from '../../services/redux/actions/userActions'
import colorTypes from '../../services/models/others/colorTypes'
import actionTypes from '../../services/models/others/actionTypes'
import notification from '../../services/models/others/notification'
import UserDetails from './UserDetails'
import Notification from '../../components/common/Notification'
import UserTable from './UserTable'
import Confirmation from '../../components/common/Confirmation'
import UserModel from '../../services/models/UserModel'

export class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userSelected: new UserModel(),
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
        await this.props.getUsers();
        this.setState({
            users: [...this.props.user.users],
            loaded: this.props.user.loaded,
            failed: this.props.user.failed,
            error: this.props.user.error,
        })
    }

    onAdd = () => {
        this.setState({showOffcanvas: true, mode: actionTypes.CREATE});
    }
    
    onDelete = (user) => {
        this.setState({showConfirmationModal: true, mode: actionTypes.DELETE, userSelected: {...user}});
    }

    onUpdate = (user) => {
        this.setState({showOffcanvas: true, mode: actionTypes.UPDATE, userSelected: {...user}});
    }

    onAccept = (user) => {
        this.setState({showConfirmationModal: true, userSelected: {...user}});
    }

    onCloseOffcanvas = () => {
        this.setState({showOffcanvas: false, mode: actionTypes.NONE, userSelected: new UserModel()});
    }

    onCloseConfirmation = () => {
        this.setState({showConfirmationModal:false});
    }

    onSave = async (user) => {
        this.setState({loaded: false, failed: false});
        
        let bodyMessage = "";
        if (this.state.mode === actionTypes.CREATE) {
            await this.props.createUser(user);
            bodyMessage = "User created";
        } else if(this.state.mode === actionTypes.UPDATE) {
            await this.props.updateUser(user);
            bodyMessage = "User updated";
        } else {
            await this.props.deleteUser(user);
            bodyMessage = "User deleted";
        }
        const failed = this.props.user.failed;
        let newNotification;
        if (failed) {
            newNotification = new notification(colorTypes.DANGER, 'Error', this.props.user.error); 
        } else {
            newNotification = new notification(colorTypes.SUCCESS, 'Success', bodyMessage);
        }
        this.setState({
            loaded: true, 
            failed: false, 
            showOffcanvas: false,
            mode: actionTypes.NONE, 
            userSelected: new UserModel(),
            users: [...this.props.user.users],
            notifications: [...this.state.notifications, newNotification]
        });
    }

    render() {
        const { users, loaded, failed, error, notifications, showOffcanvas, showConfirmationModal, mode, userSelected } = this.state;

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
                        <CCol xs="12" className="right-side mb-3">
                            <CTooltip content="Add a new user" placement="top">
                                <CButton onClick={this.onAdd} style={{color: 'white'}}>
                                    <CIcon icon={cilMedicalCross} size="sm"/>
                                </CButton>
                            </CTooltip>
                        </CCol>
                        <UserTable 
                            users={users}
                            onUpdate={this.onUpdate}
                            onDelete={this.onDelete}
                        />
                        <UserDetails 
                            visible={showOffcanvas} 
                            mode={mode} 
                            userSelected={userSelected}
                            onSave={this.onAccept}
                            onClose={this.onCloseOffcanvas}
                        />
                        <Confirmation
                            type="user"
                            mode={mode}
                            body={userSelected.personInfo.DNI + " - " + userSelected.personInfo.name + " " + userSelected.personInfo.lastName}
                            object={userSelected}
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
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(userActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Users)
