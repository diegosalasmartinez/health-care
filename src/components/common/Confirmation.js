import React, { Component } from 'react'
import { 
    CButton, 
    CModal, 
    CModalBody, 
    CModalFooter, 
    CModalHeader, 
    CModalTitle 
} from '@coreui/react'
import colorTypes from 'src/services/models/others/colorTypes';

export default class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible})
        }
    }

    onClose = () => {
        this.setState({visible: false});
        this.props.onClose();
    }

    onDelete = () => {
        this.props.onDelete(this.props.doctorSelected);
    }

    render() {
        const { visible } = this.state;
        const { doctorSelected } = this.props;
        const doctorInfo = doctorSelected.doctorInfo.code + " - " + doctorSelected.personInfo.name + " " + doctorSelected.personInfo.lastName;

        return (
            <CModal visible={visible} onClose={this.onClose}>
                <CModalHeader>
                    <CModalTitle>Delete doctor</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Are you sure you want to delete doctor {doctorInfo}?
                </CModalBody>
                <CModalFooter>
                    <CButton color={colorTypes.LIGHT} onClick={this.onClose}>
                    Close
                    </CButton>
                    <CButton color={colorTypes.DANGER} onClick={this.onDelete}>Delete</CButton>
                </CModalFooter>
            </CModal>
        )
    }
}
