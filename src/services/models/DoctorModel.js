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
