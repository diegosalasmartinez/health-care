import React, { Component } from 'react'
import { 
    CAlert,
    CRow,
    CSpinner
} from '@coreui/react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../services/redux/actions/userActions'
import colorTypes from '../../services/models/others/colorTypes'
import actionTypes from '../../services/models/others/actionTypes'
import notification from '../../services/models/others/notification'
import pagination from '../../services/models/others/pagination'
import UserDetails from './UserDetails'
import Notification from '../../components/common/Notification'
import UserTable from './UserTable'
import Confirmation from '../../components/common/Confirmation'
import UserModel from '../../services/models/UserModel'

export class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParams: {
                dni: '',
                name: '',
                role: ''
            },
            pagination: new pagination(0,10),
            pageSelected: 1,
            users: [],
            usersLength: 0,
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
        await this.loadList();
    }

    loadList = async () => {
        this.setState({loaded: false, failed: false});
        await this.props.getUsers(this.state.pagination, this.state.searchParams);
        const { user } = this.props;
        this.setState({
            users: [...user.users],
            usersLength: user.length,
            loaded: user.loaded,
            failed: user.failed,
            error: user.error,
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
            showConfirmationModal: false,
            mode: actionTypes.NONE, 
            userSelected: new UserModel(),
            users: [...this.props.user.users],
            notifications: [...this.state.notifications, newNotification]
        });
    }

    render() {
        const { users, loaded, failed, error, notifications, showOffcanvas, showConfirmationModal, mode, userSelected, usersLength, pageSelected, pagination, searchParams } = this.state;

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
                        <UserTable 
                            users={users}
                            usersLength={usersLength}
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
