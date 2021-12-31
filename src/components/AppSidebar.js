import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CHANGE_STATE } from './../services/redux/actions/actionTypes/changeStateActionTypes'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import { navAdmin, navDoctor, navSecretary } from '../_nav'

const AppSidebar = ({onLogout}) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.changeState.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)
  const userRole = useSelector((state) => state.auth.user.role);
  const navigation = userRole === "ADMIN" ? navAdmin : userRole === "DOCTOR" ? navDoctor : userRole === "SECRETARY" ? navSecretary : [];

  return (
    <CSidebar position="fixed" unfoldable={unfoldable} visible={sidebarShow} onVisibleChange={(visible) => { dispatch({ type: CHANGE_STATE, sidebarShow: visible })}}>
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} onLogout={onLogout}/>
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler className="d-none d-lg-flex" onClick={() => dispatch({ type: CHANGE_STATE, sidebarUnfoldable: !unfoldable })}/>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
