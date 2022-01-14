import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Specialties = React.lazy(() => import('./views/specialties/Specialties'))
const Doctors = React.lazy(() => import('./views/doctors/Doctors'))
const Patients = React.lazy(() => import('./views/patients/Patients'))
const PatientDetails = React.lazy(() => import('./views/patients/PatientDetails'))
const PatientHistory = React.lazy(() => import('./views/patients/PatientHistory'))
const Users = React.lazy(() => import('./views/users/Users'))
const Appointments = React.lazy(() => import('./views/appointments/Appointments'))
const AppointmentsHistory = React.lazy(() => import('./views/appointments/AppointmentsHistory'))

const allRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/specialties', name: 'Specialties', component: Specialties },
  { path: '/doctors', name: 'Doctors', component: Doctors },
  { path: '/patients', name: 'Patients', component: Patients, exact: true },
  { path: '/patients/create', name: 'Create Patient', component: PatientDetails },
  { path: '/patients/update', name: 'Update Patient', component: PatientDetails },
  { path: '/patients/history', name: 'Patient Information', component: PatientHistory },
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
  { path: '/patients/create', name: 'Create Patient', component: PatientDetails },
  { path: '/patients/update', name: 'Update Patient', component: PatientDetails },
  { path: '/patients/history', name: 'Patient History', component: PatientHistory },
  { path: '/users', name: 'Users', component: Users },
  { path: '/appointments', name: 'Appointments', component: Appointments, exact: true },
  { path: '/appointments/history', name: 'Appointments History', component: AppointmentsHistory }
]

const routesDoctor = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/appointments', name: 'My Appointments', component: Appointments, exact: true },
  { path: '/appointments/history', name: 'Appointments History', component: AppointmentsHistory },
  { path: '/patients/history', name: 'Patient Information', component: PatientHistory },
]

const routesSecretary = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/specialties', name: 'Specialties', component: Specialties },
  { path: '/doctors', name: 'Doctors', component: Doctors },
  { path: '/patients', name: 'Patients', component: Patients, exact: true },
  { path: '/patients/create', name: 'Create Patient', component: PatientDetails },
  { path: '/patients/update', name: 'Update Patient', component: PatientDetails },
  { path: '/patients/history', name: 'Patient Information', component: PatientHistory },
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
