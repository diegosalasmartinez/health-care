import DoctorModel from './DoctorModel'
import PatientModel from './PatientModel'
import UserModel from './UserModel'
import SimpleProperty from './SimpleProperty'
import moment from 'moment'

export default class AppointmentModel extends SimpleProperty {
    _id = "";
    doctorInfo = new DoctorModel();
    secretaryInfo = new UserModel();
    patientInfo = new PatientModel();
    floor = "";
    room = "";
    date = moment().format("YYYY-MM-DD");
    time = "";
    status = "";
    details = "";
}

const validate = (appointment) => {
    let errors = {
        doctorId: null,
        patientId: null,
        floor: null,
        room: null,
        date: null,
        time: null,
    }

    if (!appointment.doctorInfo._id) {
        errors.doctorId = "Doctor is mandatory";
    }
    if (!appointment.patientInfo._id) {
        errors.patientId = "Patient is mandatory";
    }
    if (!appointment.floor) {
        errors.floor = "Floor is mandatory";
    }
    if (!appointment.room) {
        errors.room = "Room is mandatory";
    }
    if (!appointment.date) {
        errors.date = "Date is mandatory";
    }
    if (!appointment.time) {
        errors.time = "Time is mandatory";
    }
    return errors;
}

export { validate }