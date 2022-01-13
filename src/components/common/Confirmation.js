import React, { Component } from 'react'
import { 
    CButton, 
    CModal, 
    CModalBody, 
    CModalFooter, 
    CModalHeader, 
    CModalTitle 
} from '@coreui/react'
import colorTypes from '../../services/models/others/colorTypes'
import actionTypes from '../../services/models/others/actionTypes'

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

    onAccept = () => {
        this.props.onAccept(this.props.object);
    }

    getConfirmationTitle = () => {
        switch(this.props.mode) {
            case actionTypes.CREATE:
                return "Create " + this.props.type;
            case actionTypes.DELETE:
                return "Delete " + this.props.type;
            case actionTypes.UPDATE:
                return "Update " + this.props.type;
            default:
                return "";
        }
    }

    getConfirmationMessage = () => {
        switch(this.props.mode) {
            case actionTypes.CREATE:
                return "Are you sure you want to create a new " + this.props.type + "?";
            case actionTypes.DELETE:
                return "Are you sure you want to delete " + this.props.type + " " + this.props.body + "?";
            case actionTypes.UPDATE:
                return "Are you sure you want to update " + this.props.type + " " + this.props.body + "?";
            default:
                return "";
        }
    }

    getConfirmationButton = () => {
        switch(this.props.mode) {
            case actionTypes.CREATE:
                return "Create";
            case actionTypes.DELETE:
                return "Delete";
            case actionTypes.UPDATE:
                return "Update";
            default:
                return "";
        }
    }

    getConfirmationColor = () => {
        switch(this.props.mode) {
            case actionTypes.DELETE:
                return colorTypes.DANGER;
            default:
                return colorTypes.PRIMARY;
        }
    }

    render() {
        const { specialTextMessage, titleTxt, messageTxt, buttonTxt } = this.props;
        const { visible } = this.state;
        const title = specialTextMessage ? titleTxt : this.getConfirmationTitle();
        const message = specialTextMessage ? messageTxt : this.getConfirmationMessage();
        const button = specialTextMessage ? buttonTxt : this.getConfirmationButton();
        const color = this.getConfirmationColor();

        return (
            <CModal visible={visible} onClose={this.onClose} backdrop="static">
                <CModalHeader>
                    <CModalTitle>{title}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {message}
                </CModalBody>
                <CModalFooter>
                    <CButton color={colorTypes.LIGHT} onClick={this.onClose}>
                        Close
                    </CButton>
                    <CButton color={color} onClick={this.onAccept}>{button}</CButton>
                </CModalFooter>
            </CModal>
        )
    }
}
