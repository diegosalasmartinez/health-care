import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Specialties = React.lazy(() => import('./views/specialties/Specialties'))
const Doctors = React.lazy(() => import('./views/doctors/Doctors'))
const Patients = React.lazy(() => import('./views/patients/Patients'))
const PatientDetails = React.lazy(() => import('./views/patients/PatientDetails'))
const Users = React.lazy(() => import('./views/users/Users'))
const Appointments = React.lazy(() => import('./views/appointments/Appointments'))
const AppointmentsHistory = React.lazy(() => import('./views/appointments/AppointmentsHistory'))

const allRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/specialties', name: 'Specialties', component: Specialties },
  { path: '/doctors', name: 'Doctors', component: Doctors },
  { path: '/patients', name: 'Patients', component: Patients, exact: true },
  { path: '/patients/create', name: 'Patient Details', component: PatientDetails },
  { path: '/patients/update', name: 'Patient Details', component: PatientDetails },
  { path: '/users', name: 'Users', component: Users },
  { path: '/appointments', name: 'Appointments', component: Appointments },
  { path: '/appointments/history', name: 'Appointments History', component: AppointmentsHistory }
]

const routesAdmin = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/specialties', name: 'Specialties', component: Specialties },
  { path: '/doctors', name: 'Doctors', component: Doctors },
  { path: '/patients', name: 'Patients', component: Patients, exact: true },
  { path: '/patients/create', name: 'Patient Details', component: PatientDetails },
  { path: '/patients/update', name: 'Patient Details', component: PatientDetails },
  { path: '/users', name: 'Users', component: Users },
  { path: '/appointments', name: 'Appointments', component: Appointments, exact: true },
  { path: '/appointments/history', name: 'Appointments History', component: AppointmentsHistory }
]

const routesDoctor = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/patients', name: 'Patients', component: Patients, exact: true },
  { path: '/patients/create', name: 'Patient Details', component: PatientDetails },
  { path: '/patients/update', name: 'Patient Details', component: PatientDetails },
  { path: '/appointments', name: 'My Appointments', component: Appointments, exact: true },
  { path: '/appointments/history', name: 'Appointments History', component: AppointmentsHistory }
]

const routesSecretary = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/specialties', name: 'Specialties', component: Specialties },
  { path: '/doctors', name: 'Doctors', component: Doctors },
  { path: '/patients', name: 'Patients', component: Patients, exact: true },
  { path: '/patients/create', name: 'Patient Details', component: PatientDetails },
  { path: '/patients/update', name: 'Patient Details', component: PatientDetails },
  { path: '/users', name: 'Users', component: Users },
  { path: '/appointments', name: 'Appointments', component: Appointments, exact: true },
  { path: '/appointments/history', name: 'Appointments History', component: AppointmentsHistory }
]

export {
  allRoutes,
  routesAdmin,
  routesDoctor,
  routesSecretary
}
