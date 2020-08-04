import { Schema } from 'mongoose';

export const cursoSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'the name is required']
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    silabo: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Silabo',
            required: true
        }
    ],
    student: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    ]

})

