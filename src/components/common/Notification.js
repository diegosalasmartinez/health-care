import React, { useEffect, useRef, useState } from 'react'
import {
    CToast,
    CToaster,
    CToastBody,
    CToastHeader,
} from '@coreui/react'
import colorTypes from '../../services/models/others/colorTypes'

export default function Notification(props) {
    const [toast, addToast] = useState(0)
    const toaster = useRef()
    const { title = "", body = "", mode = colorTypes.INFO } = props;

    useEffect(() => {
        const exampleToast = (
          <CToast color={mode}>
            <CToastHeader closeButton={true}><strong className="me-auto">{title}</strong></CToastHeader>
            <CToastBody>{body}</CToastBody>
          </CToast>
        )
        addToast(exampleToast);
    }, [title, body, mode]);

    return (
        <CToaster ref={toaster} push={toast} placement="top-end" />
    )
}
