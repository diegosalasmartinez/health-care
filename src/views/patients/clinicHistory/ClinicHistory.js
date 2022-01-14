import React, { Component } from 'react'
import { 
    CButton,
    CCard,
    CCardBody,
    CCol,
    CFormInput,
    CFormLabel,
    CRow
} from '@coreui/react'
import PatientModel, { validateClinicHistory } from '../../../services/models/PatientModel'
import cloneDeep from 'lodash/cloneDeep'
import Confirmation from '../../../components/common/Confirmation';
import colorTypes from '../../../services/models/others/colorTypes';
import { objIsNull } from '../../../utils/utils';

export default class ClinicHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: new PatientModel(),
            firstTime: true, 
            showConfirmationModal: false,
            errors: {},
        }
    }

    componentDidMount() {
        this.setState({patient: cloneDeep(this.props.patient)});
    }

    onChange = (key, isNumeric = false, isDate = false) => (e = {}) => {
        const { patient } = this.state;
        let val = isNumeric ? parseInt(e.target.value || '0') : (isDate) ? moment(e).format("YYYY-MM-DD") : e.target.value;
        let patientUpdated = { ...patient };
        const keys = key.split(".");
        if (keys.length > 1) {
            patientUpdated[keys[0]][keys[1]] = val;
        } else {
            patientUpdated[key] = val;
        }
        
        this.setState({patient: patientUpdated});
    }

    onAccept = () => {
        this.setState({firstTime: false});
        const errors = validateClinicHistory(this.state.patient);
        if (objIsNull(errors)) {
            this.setState({showConfirmationModal: true});
        }
        this.setState({errors: errors});
    }

    onSave = () => {
        this.props.onSave(this.state.patient);
    }
    
    onClose = () => {
        this.props.goBack();
    }

    onCloseConfirmation = () => {
        this.setState({showConfirmationModal: false});
    }

    render() {
        const { patient, errors, firstTime, showConfirmationModal } = this.state;
        const { completed } = this.props;

        return (
            <CRow>
                <CCol xs="12">
                    <CCard className="mb-3">
                        <CCardBody>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="reason" className="col-sm-2 col-form-label">Reason</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="reason" value={patient.clinicHistory.reason} onChange={this.onChange('clinicHistory.reason', false, false)} invalid={!firstTime && errors.reason !== null}/>
                                </CCol>
                                <CFormLabel htmlFor="currentIllness" className="col-sm-2 col-form-label">Current Illness</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="currentIllness" value={patient.clinicHistory.currentIllness} onChange={this.onChange('clinicHistory.currentIllness', false, false)} invalid={!firstTime && errors.currentIllness !== null}/>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="historyDesease" className="col-sm-2 col-form-label">History Desease</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="historyDesease" value={patient.clinicHistory.historyDesease} onChange={this.onChange('clinicHistory.historyDesease', false, false)} invalid={!firstTime && errors.historyDesease !== null}/>
                                </CCol>
                                <CFormLabel htmlFor="alcohol" className="col-sm-2 col-form-label">Alcohol</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="alcohol" value={patient.clinicHistory.alcohol} onChange={this.onChange('clinicHistory.alcohol', false, false)} invalid={!firstTime && errors.alcohol !== null}/>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="smoke" className="col-sm-2 col-form-label">Smoke</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="smoke" value={patient.clinicHistory.smoke} onChange={this.onChange('clinicHistory.smoke', false, false)} invalid={!firstTime && errors.smoke !== null}/>
                                </CCol>
                                <CFormLabel htmlFor="drugs" className="col-sm-2 col-form-label">Drugs</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="drugs" value={patient.clinicHistory.drugs} onChange={this.onChange('clinicHistory.drugs', false, false)} invalid={!firstTime && errors.drugs !== null}/>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="sexuality" className="col-sm-2 col-form-label">Sexuality</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="sexuality" value={patient.clinicHistory.sexuality} onChange={this.onChange('clinicHistory.sexuality', false, false)} invalid={!firstTime && errors.sexuality !== null}/>
                                </CCol>
                                <CFormLabel htmlFor="others" className="col-sm-2 col-form-label">Others</CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="text" id="others" value={patient.clinicHistory.others} onChange={this.onChange('clinicHistory.others', false, false)} invalid={!firstTime && errors.others !== null}/>
                                </CCol>
                            </CRow>
                            <CCol xs="12" className="right-side my-3">
                                <CButton color={colorTypes.LIGHT} style={{marginRight: "1rem"}} onClick={this.onClose}>Back</CButton>
                                <CButton color={colorTypes.PRIMARY} onClick={this.onAccept} disabled={completed}>Save</CButton>
                            </CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
                <Confirmation
                    specialTextMessage={true}
                    titleTxt="Update clinic history"
                    messageTxt="Are you sure you want to update this patient clinic history?"
                    buttonTxt="Accept"
                    object={patient}
                    visible={showConfirmationModal} 
                    onAccept={this.onSave}
                    onClose={this.onCloseConfirmation}
                />
            </CRow>
        )
    }
}
