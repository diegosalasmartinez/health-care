import { CButton, CCard, CCardBody, CCol, CFormFeedback, CFormInput, CFormLabel, CRow, CSpinner } from '@coreui/react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../services/redux/actions/userActions'
import Confirmation from '../../components/common/Confirmation'
import colorTypes from '../../services/models/others/colorTypes'
import notification from '../../services/models/others/notification'
import Notification from '../../components/common/Notification'
import { validatePassword } from 'src/services/models/UserModel'
import { objIsNull } from 'src/utils/utils'

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                password: "",
                confirmPassword: "",
            },
            notifications: [],
            errors: {},
            loaded: true,
            failed: false,
            firstTime: true, 
            showConfirmationModal: false,
        }
    }

    onChange = (key, isNumeric = false, isDate = false) => (e = {}) => {
        const { user } = this.state;
        let val = isNumeric ? parseInt(e.target.value || '0') : (isDate) ? moment(e).format("YYYY-MM-DD") : e.target.value;
        let userUpdated = { ...user };
        userUpdated[key] = val;
        
        this.setState({user: userUpdated});
    }
    
    onAccept = () => {
        this.setState({firstTime: false});
        const { user } = this.state;
        const errors = validatePassword(user.password, user.confirmPassword);
        if (objIsNull(errors)) {
            this.setState({showConfirmationModal: true});
        }
        this.setState({errors: errors});
    }

    onSave = async () => {
        this.setState({loaded: false, failed: false});

        await this.props.changePassword(this.state.user);
        const failed = this.props.user.failed;
        let newNotification;
        if (failed) {
            newNotification = new notification(colorTypes.DANGER, 'Error', this.props.user.error); 
        } else {
            newNotification = new notification(colorTypes.SUCCESS, 'Success', "Password changed");
        }
        this.setState({
            loaded: true, 
            failed: false, 
            showConfirmationModal: false,
            notifications: [...this.state.notifications, newNotification]
        });
    }

    onCloseConfirmation = () => {
        this.setState({showConfirmationModal: false});
    }

    render() {
        const { user, firstTime, showConfirmationModal, notifications, failed, loaded, errors } = this.state;
        const { password, confirmPassword } = user;

        return (
            <CRow>
                { notifications.map((notification, index) => 
                    <Notification key={index} mode={notification.mode} title={notification.title} body={notification.body}></Notification>
                )}
                <CCol xs="12" md="8" xl="6" className='m-auto'>
                    <CCard className='mb-3'>
                        <CCardBody>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="password" className="col-sm-4 col-form-label">New Password</CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput type="password" id="password" value={password} onChange={this.onChange('password', false, false)} invalid={!firstTime && errors.password} />
                                    <CFormFeedback invalid>{errors.password}</CFormFeedback>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="confirmPassword" className="col-sm-4 col-form-label">Confirm Password</CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput type="password" id="confirmPassword" value={confirmPassword} onChange={this.onChange('confirmPassword', false, false)} invalid={!firstTime && errors.passwordConfirmation} />
                                    <CFormFeedback invalid>{errors.passwordConfirmation}</CFormFeedback>
                                </CCol>
                            </CRow>
                            <CCol xs="12" className="right-side my-3">
                                <CButton color={colorTypes.PRIMARY} onClick={this.onAccept}>
                                    { !loaded && 
                                        <CSpinner color={colorTypes.LIGHT} size='sm' style={{marginRight: '0.5rem'}}/>
                                    }
                                    Change Password
                                </CButton>
                            </CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
                <Confirmation
                    specialTextMessage={true}
                    titleTxt="Update password"
                    messageTxt="Are you sure you want to update your password?"
                    buttonTxt="Accept"
                    object={user}
                    visible={showConfirmationModal} 
                    onAccept={this.onSave}
                    onClose={this.onCloseConfirmation}
                />
            </CRow>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
