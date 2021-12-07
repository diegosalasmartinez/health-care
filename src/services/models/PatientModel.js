import SimpleProperty from './SimpleProperty'
import PersonModel from './PersonModel'

export default class PatientModel extends SimpleProperty {
    clinicHistoryId = "";
    code = "";
    allergies = "";
    address = "";
    birthday = "";
    occupation = "";
    civilStatus = "";
    nationality = "";
    personInfo = new PersonModel();
    active = true;
}
