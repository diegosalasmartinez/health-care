import PersonModel from './PersonModel'
import SimpleProperty from './SimpleProperty'

export default class UserModel extends SimpleProperty {
    _id = "";
    personId = "";
    doctorId = "";
    role = "";
    active = true;
    username = "";
    password = "";
    personInfo = new PersonModel();
}
