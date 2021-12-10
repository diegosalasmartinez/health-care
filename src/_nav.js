import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilHospital,
  cilPencil,
  cilPeople,
  cilSpeedometer,
  cilStar,
  cilUser
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Specialties',
    to: '/specialties',
    icon: <CIcon icon={cilHospital} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Doctors',
    to: '/doctors',
    icon: <CIcon icon={cilHospital} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Patients',
    to: '/patients',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />
  }
]

export default _nav
