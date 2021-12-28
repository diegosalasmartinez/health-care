import React, { Component } from 'react'
import { CButton, CCol, CFormInput, CFormLabel, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react'
import actionTypes from '../../services/models/others/actionTypes'
import SpecialtyModel, { validate } from '../../services/models/SpecialtyModel'
import colorTypes from '../../services/models/others/colorTypes'
import { objIsNull } from '../../utils/utils'
import cloneDeep from 'lodash/cloneDeep'

export default class SpecialtyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            firstTime: true,
            specialty: new SpecialtyModel(),
            errors: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible})
            if (this.props.visible) {
                this.setState({specialty: this.props.mode === actionTypes.UPDATE ? cloneDeep(this.props.specialtySelected) : new SpecialtyModel()});
            }
        }
    }

    onChange = (key, isNumeric = false, isDate = false) => (e = {}) => {
        const { specialty } = this.state;
            let val = isNumeric ? parseInt(e.target.value || '0') : (isDate) ? moment(e).format("YYYY-MM-DD") : e.target.value;
            let specialtyUpdated = { ...specialty };
            const keys = key.split(".");
            if (keys.length > 1) {
                specialtyUpdated[keys[0]][keys[1]] = val;
            } else {
                specialtyUpdated[key] = val;
            }
            this.setState({specialty: specialtyUpdated});
    }
    
    onSave = () => {
        this.setState({firstTime: false});
        const errors = validate(this.state.specialty);
        if (objIsNull(errors)) {
            this.props.onSave(this.state.specialty);
        }
        this.setState({errors: errors});
    }

    onClose = () => {
        this.setState({visible: false});
        this.props.onClose();
    }

    render() {
        const { visible, specialty, errors, firstTime } = this.state;
        const { mode } = this.props;
        const title = mode === actionTypes.CREATE ? "Add a new specialty" : "Update specialty";
        const txtButton = mode === actionTypes.CREATE ? "Register" : "Update";
        const color = mode === actionTypes.CREATE ? colorTypes.SUCCESS : colorTypes.WARNING;

        return (
            <COffcanvas placement="end" visible={visible} onHide={this.onClose}>
                <COffcanvasHeader>
                    <COffcanvasTitle>{title}</COffcanvasTitle>
                </COffcanvasHeader>
                <COffcanvasBody>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="code" className="col-sm-4 col-form-label">Code</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="code" value={specialty.code} onChange={this.onChange('code', false, false)} invalid={!firstTime && errors.code !== null}/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="name" className="col-sm-4 col-form-label">Name</CFormLabel>
                        <CCol sm={8}>
                            <CFormInput type="text" id="name" value={specialty.name} onChange={this.onChange('name', false, false)} invalid={!firstTime && errors.name !== null}/>
                        </CCol>
                    </CRow>
                    <CCol xs="12" className="right-side my-3">
                        <CButton color={colorTypes.LIGHT} style={{marginRight: "1rem"}} onClick={this.onClose}>Back</CButton>
                        <CButton color={color} onClick={this.onSave}>{txtButton}</CButton>
                    </CCol>
                </COffcanvasBody>
            </COffcanvas>
        )
    }
}
