import { Schema } from 'mongoose';



const required = (field: String) => {
    return [true, `the ${field} is required`]
}

export const silaboSchema : Schema = new Schema({
    title: {
        type: String,
        required: required('title')
    },
    year: {
        type: String,
        required: required('year')
    },
    semestre: {
        type: String,
        required: required('semestre')
    },
    pdfname: {
        type: String,
        required: true
    },
    pdfurl: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: required('user')
    },
    state: {
        type: Boolean,
        required: true,
        default: true,
    }
})

