import React, { Component, lazy } from 'react'
import {
  CRow,
  CSpinner
} from '@coreui/react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dashboardActions from '../../services/redux/actions/dashboardActions'
import colorTypes from '../../services/models/others/colorTypes'

const BestDoctors = lazy(() => import('./BestDoctors'))
const BestSpecialties = lazy(() => import('./BestSpecialties'))
const AppointmentHistory = lazy(() => import('./AppointmentHistory'))

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        bestSpecialties: [],
        bestDoctors: [],
        history: [],
        notifications: [],
        loaded: false,
        failed: false,
        error: ""
    }
  }

  async componentDidMount() {
    this.setState({loaded: false, failed: false});
    const bestSpecialties = await this.props.getBestSpecialties();
    const bestDoctors = await this.props.getBestDoctors();
    const history = await this.props.getDashboardHistory();
    this.setState({bestSpecialties, bestDoctors, history, loaded: true, failed: false});
  }
 
  random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  render() {
    const { loaded, failed, notifications, bestSpecialties, bestDoctors, history } = this.state;

    return (
      <>
        { loaded && !failed && 
          <>
            <BestSpecialties bestSpecialties={bestSpecialties}/>
            <AppointmentHistory history={history}/>
            <BestDoctors bestDoctors={bestDoctors}/>
          </>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
      ...bindActionCreators(dashboardActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
