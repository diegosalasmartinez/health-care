import PersonModel from './PersonModel'
import SimpleProperty from './SimpleProperty'

export default class UserModel extends SimpleProperty {
    _id = "";
    personId = "";
    doctorId = "";
    role = "ADMIN";
    active = true;
    username = "";
    password = "";
    personInfo = new PersonModel();
}

const validate = (user, validateCredentials) => {
    let errors = {
        DNI: null,
        name: null,
        lastName: null,
        email: null,
        phone: null,
        username: null,
        password: null
    }
    if (!user.personInfo.DNI) {
        errors.DNI = "DNI is mandatory";
    }
    if (!user.personInfo.name) {
        errors.name = "Name is mandatory";
    }
    if (!user.personInfo.lastName) {
        errors.lastName = "Last name is mandatory";
    }
    if (!user.personInfo.email) {
        errors.email = "Email is mandatory";
    }
    if (!user.personInfo.phone) {
        errors.phone = "Phone is mandatory";
    }
    if (validateCredentials) {
        if (!user.username) {
            errors.username = "Username is mandatory";
        }
        if (!user.password) {
            errors.password = "Password is mandatory";
        }
    }
    return errors;
}

const validatePassword = (password, passwordConfirmation) => {
    let errors = {
        password: null,
        passwordConfirmation: null
    }
    if (password === "" || password.length < 8) {
        errors.password = "Your password must be at least 8 characters long";
    }
    if (passwordConfirmation === "" || passwordConfirmation.length < 8) {
        errors.passwordConfirmation = "Your password must be at least 8 characters long";
    }
    if (password !== passwordConfirmation) {
        errors.password = "The passwords entered do not match";
        errors.passwordConfirmation = "The passwords entered do not match";
    }
    return errors;
}

export { validate, validatePassword }