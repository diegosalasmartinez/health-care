import SimpleProperty from './SimpleProperty'

export default class SpecialtyModel extends SimpleProperty {
    _id = "";
    code = "";
    name = "";
    active = true;
}

const validate = (specialty) => {
    let errors = {
        code: null,
        name: null
    }

    if (!specialty.code) {
        errors.code = "Code is mandatory";
    }
    if (!specialty.name) {
        errors.name = "Name is mandatory";
    }

    return errors;
}

export { validate }