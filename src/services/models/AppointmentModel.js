import DoctorModel from './DoctorModel';
import PatientModel from './PatientModel';
import SimpleProperty from './SimpleProperty'

export default class AppointmentModel extends SimpleProperty {
    _id = "";
    doctorId = "";
    doctorInfo = new DoctorModel();
    secretaryId = "";
    patientId = "";
    patientInfo = new PatientModel();
    floor = "";
    room = "";
    date = "";
    status = "";
}

const validate = (appointment) => {
    let errors = {
        doctorId: null,
        secretaryId: null,
        patientId: null,
        floor: null,
        room: null,
        date: null,
        status: null,
    }

    // if (!appointment.doctorId) {
    //     errors.doctorId = "Doctor is mandatory";
    // }
    // if (!appointment.patientId) {
    //     errors.patientId = "Patient is mandatory";
    // }
    // if (!appointment.floor) {
    //     errors.floor = "Floor is mandatory";
    // }
    // if (!appointment.room) {
    //     errors.room = "Room is mandatory";
    // }
    // if (!appointment.date) {
    //     errors.date = "Date is mandatory";
    // }
    // if (!appointment.status) {
    //     errors.status = "Status is mandatory";
    // }
    return errors;
}

export { validate }