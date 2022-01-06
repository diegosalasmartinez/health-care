import SimpleProperty from './SimpleProperty'
import PersonModel from './PersonModel'
import moment from 'moment';

export default class PatientModel extends SimpleProperty {
    _id = "";
    personInfo = new PersonModel();
    clinicHistory = {
        reason: "",
        currentIllness: "",
        historyDesease: "",
        alcohol: "",
        smoke: "",
        drugs: "",
        sexuality: "",
        others: ""
    };
    code = "";
    allergies = "";
    address = "";
    fullName = "";
    birthday = moment().format("YYYY-MM-DD");
    occupation = "";
    civilStatus = "";
    nationality = "";
    active = true;
}

const validate = (patient) => {
    let errors = {
        DNI: null,
        name: null,
        lastName: null,
        email: null,
        phone: null,
        code: null,
        address: null,
        occupation: null,
        civilStatus: null,
        nationality: null
    }
    if (!patient.personInfo.DNI) {
        errors.DNI = "DNI is mandatory";
    }
    if (!patient.personInfo.name) {
        errors.name = "Name is mandatory";
    }
    if (!patient.personInfo.lastName) {
        errors.lastName = "Last name is mandatory";
    }
    if (!patient.personInfo.email) {
        errors.email = "Email is mandatory";
    }
    if (!patient.personInfo.phone) {
        errors.phone = "Phone is mandatory";
    }
    
    if (!patient.code) {
        errors.code = "Code is mandatory";
    }
    if (!patient.address) {
        errors.address = "Address is mandatory";
    }
    if (!patient.civilStatus) {
        errors.civilStatus = "Civil Status is mandatory";
    }
    if (!patient.occupation) {
        errors.occupation = "Occupation is mandatory";
    }
    if (!patient.nationality) {
        errors.nationality = "Nationality is mandatory";
    }

    return errors;
}

export { validate }