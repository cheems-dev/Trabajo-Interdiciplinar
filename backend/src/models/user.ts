import { Schema } from 'mongoose';//para el esquema
import uniqueValidator from 'mongoose-unique-validator';//para validar



const validRoles = {
    values: ['STUDENT_ROLE', 'TEACHER_ROLE']//comprobar el rol de estudiante o docente
}

const required = (field: String) => {
    return [true, `the ${field} is required` ]//comprobar que falta
}

export const userSchema: Schema = new Schema({//creacion del esquema
    name: {//nombre
        type: String,
        required: required('name')
    },
    surname: {//apellido
        type: String,
        required: required('surname')
    },
    phone: {//numero de telefono
        type: Number,
        required: false,
        min: 9
    },
    university: {//universidad
        type: String,
        default: 'UNSA',//por defecto UNSA
        required: required('university')
    },
    semestre: {//semestre
        type: String,
        required: false
    }, 
    year:{//año
        type: String,
        required: false
    },
    career: {//carrera
        type: String,
        required: false
    },
    email: {//email
        type: String,
        unique: true,
        required: required('email'),
        minlength: 10
    },
    password: {//contraseña
        type: String,
        required: required('password')
    },
    role: {//rol
        type: String,
        required: required('role'),
        default: 'STUDENT_ROLE',
        enum: validRoles
    },
    state: {//estado
        type: Boolean,
        required: true,
        default: true,
    }
});

userSchema.plugin(uniqueValidator, {//verificar
    message: '{PATH} debe ser único'
});


userSchema.methods.toJSON = function() {//para exportar a JSON
    let user = this; //pasar el usuario
    let userObject = user.toObject(); //devuelve un objeto de tipo user y lo asigna
    delete userObject.password; //pasar la contraseña
    return userObject; //retorna el usuario por medio de la variabale userObject
}