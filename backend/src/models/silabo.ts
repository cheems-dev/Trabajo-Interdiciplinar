import { Schema } from 'mongoose'; //esquema



const required = (field: String) => { //funcion para especificar que falta un campo
    return [true, `the ${field} is required`]
}

export const silaboSchema : Schema = new Schema({//creacion del esquema
    title: { //titulo
        type: String, //tipo
        required: required('title') //llama a la funcion required con el argumento que se requiere
    },
    year: { //año
        type: String,
        required: required('year')
    },
    semestre: { //semestre
        type: String,
        required: required('semestre')
    },
    pdfname: { //nombre del pdf
        type: String,
        required: true
    },
    pdfurl: { //la url del pdf
        type: String,
        required: true
    },
    user: { //usuario
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: required('user')
    },
    state: { //estado
        type: Boolean,
        required: true,
        default: true,
    }
})

