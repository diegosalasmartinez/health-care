import SimpleProperty from './SimpleProperty'
import PersonModel from './PersonModel'
import moment from 'moment';

export default class PatientModel extends SimpleProperty {
    _id = "";
    clinicHistoryId = "";
    code = "";
    allergies = "";
    address = "";
    birthday = moment().format("YYYY-MM-DD");
    occupation = "";
    civilStatus = "";
    nationality = "";
    personInfo = new PersonModel();
    active = true;
}
