import { Schema } from 'mongoose';//para crear el esquema

export const cursoSchema: Schema = new Schema({//modelo o esquema del curso
    //nombre de tipo string y es obligatorio
    name: {
        type: String,
        required: [true, 'the name is required']
    },
    //docente 
    teacher: {
        type: Schema.Types.ObjectId, //tipo de docente
        ref: 'User',
        required: true
    },
    //silabo
    silabo: [
        {
            type: Schema.Types.ObjectId, //tipo de silabo
            ref: 'Silabo',
            required: true
        }
    ],
    //estudiante
    student: [
        {
            type: Schema.Types.ObjectId, //tipo de estudiante
            ref: 'User',
            required: false
        }
    ]

})

