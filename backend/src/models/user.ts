import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';



const validRoles = {
    values: ['STUDENT_ROLE', 'TEACHER_ROLE']
}

const required = (field: String) => {
    return [true, `the ${field} is required` ]
}

export const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: required('name')
    },
    surname: {
        type: String,
        required: required('surname')
    },
    phone: {
        type: Number,
        required: false,
        min: 9
    },
    university: {
        type: String,
        default: 'UNSA',
        required: required('university')
    },
    semestre: {
        type: String,
        required: false
    }, 
    year:{
        type: String,
        required: false
    },
    career: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: required('email'),
        minlength: 10
    },
    password: {
        type: String,
        required: required('password')
    },
    role: {
        type: String,
        required: required('role'),
        default: 'STUDENT_ROLE',
        enum: validRoles
    },
    state: {
        type: Boolean,
        required: true,
        default: true,
    }
});

userSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});


userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}