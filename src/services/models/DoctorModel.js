import UserModel from './UserModel'

export default class DoctorModel extends UserModel {
    doctorInfo = {
        _id: "",
        code: "",
        CMP: "",
        specialty: ""
    }
}
