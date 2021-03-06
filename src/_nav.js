import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAddressBook,
  cilHospital,
  cilPeople,
  cilSpeedometer,
  cilUser
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const navAdmin = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
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
    name: 'Appointments',
    to: '/appointments',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'My Profile',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />
  }
]

const navDoctor = [
  {
    component: CNavItem,
    name: 'My Appointments',
    to: '/appointments',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'My Profile',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />
  }
]

const navSecretary= [
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
    name: 'Appointments',
    to: '/appointments',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'My Profile',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />
  }
]

export {
  navAdmin,
  navDoctor,
  navSecretary
}
