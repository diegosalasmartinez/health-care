import React, { Component } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as specialtyActions from '../services/redux/actions/specialtyActions'
import * as authActions from '../services/redux/actions/authActions'

export class DefaultLayout extends Component {
  async componentDidMount() {
    if (!this.props.auth.user.role && this.props.auth.user.role !== "DOCTOR") {
      await this.props.getSpecialties();
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.auth.token || this.props.auth.token !== prevProps.auth.token) {
      this.props.history.push("/login");
    }
  }

  onLogout = async () => {
    await this.props.logout();
  }

  render() {
    return (
      <div>
        <AppSidebar onLogout={this.onLogout}/>
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <AppContent />
          </div>
          <AppFooter />
        </div>
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
      ...bindActionCreators(Object.assign({}, specialtyActions, authActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout)
