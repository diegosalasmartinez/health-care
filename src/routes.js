import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Specialties = React.lazy(() => import('./views/specialties/Specialties'))
const Doctors = React.lazy(() => import('./views/doctors/Doctors'))
const Patients = React.lazy(() => import('./views/patients/Patients'))
const Users = React.lazy(() => import('./views/users/Users'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/specialties', name: 'Specialties', component: Specialties },
  { path: '/doctors', name: 'Doctors', component: Doctors },
  { path: '/patients', name: 'Patients', component: Patients },
  { path: '/users', name: 'Users', component: Users }
]

export default routes
