import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../../services/redux/actions/authActions'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import { cilLockLocked, cilUser } from '@coreui/icons'
import colorTypes from '../../../services/models/others/colorTypes'
import notification from '../../../services/models/others/notification'
import Notification from '../../../components/common/Notification'

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: ""
      },
      notifications: [],
      loaded: true,
      failed: false,
      error: "",
    }
  }

  onChange = (key) => (e = {}) => {
    const { user } = this.state;
    let val = e.target.value;
    let userUpdated = { ...user };
    userUpdated[key] = val;
    
    this.setState({user: userUpdated});
  }

  onLogin = async () => {
    this.setState({loaded: false, failed: false});
    
    await this.props.login(this.state.user);
    const failed = this.props.auth.failed;
    if (failed) {
      const newNotification = new notification(colorTypes.DANGER, 'Error', this.props.auth.error); 
      this.setState({
        loaded: true, 
        failed: false, 
        notifications: [...this.state.notifications, newNotification]
      });
    } else {
      this.props.history.push("/");
      return;
    }
  }

  render(){
    const { loaded, notifications } = this.state;

    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          { notifications.map((notification, index) => 
            <Notification key={index} mode={notification.mode} title={notification.title} body={notification.body}></Notification>
          )}
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="Username" autoComplete="username" onChange={this.onChange("username")}/>
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput type="password" placeholder="Password" autoComplete="current-password" onChange={this.onChange("password")}/>
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-3" disabled={!loaded} onClick={this.onLogin}>
                            { !loaded && 
                              <CSpinner color={colorTypes.LIGHT} size='sm' style={{marginRight: '0.5rem'}}/>
                            }
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
