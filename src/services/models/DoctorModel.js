import UserModel from './UserModel'
import SpecialtyModel from './SpecialtyModel'

export default class DoctorModel extends UserModel {
    doctorInfo = {
        _id: "",
        code: "",
        CMP: "",
        specialtyId: "",
        specialtyInfo: new SpecialtyModel()
    }
}

const validate = (doctor, validateCredentials) => {
    let errors = {
        DNI: null,
        name: null,
        lastName: null,
        email: null,
        phone: null,
        code: null,
        CMP: null,
        specialty: null,
        username: null,
        password: null
    }

    if (!doctor.personInfo.DNI) {
        errors.DNI = "DNI is mandatory";
    }
    if (!doctor.personInfo.name) {
        errors.name = "Name is mandatory";
    }
    if (!doctor.personInfo.lastName) {
        errors.lastName = "Last name is mandatory";
    }
    if (!doctor.personInfo.email) {
        errors.email = "Email is mandatory";
    }
    if (!doctor.personInfo.phone) {
        errors.phone = "Phone is mandatory";
    }
    if (!doctor.doctorInfo.code) {
        errors.code = "Code is mandatory";
    }
    if (!doctor.doctorInfo.CMP) {
        errors.CMP = "CMP is mandatory";
    }
    if (!doctor.doctorInfo.specialtyId) {
        errors.specialty = "Specialty is mandatory";
    }
    if (validateCredentials) {
        if (!doctor.username) {
            errors.username = "Username is mandatory";
        }
        if (!doctor.password) {
            errors.password = "Password is mandatory";
        }
    }
    return errors;
}

export { validate }