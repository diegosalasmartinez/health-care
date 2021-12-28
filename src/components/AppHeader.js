import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CHANGE_STATE } from './../services/redux/actions/actionTypes/changeStateActionTypes'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid className="first">
        <CHeaderToggler className="ps-1" onClick={() => dispatch({ type: CHANGE_STATE, sidebarShow: !sidebarShow })}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <AppBreadcrumb />
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid className="second">
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
