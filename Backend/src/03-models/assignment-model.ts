import { Document, model, Schema } from 'mongoose';
import { UploadedFile } from 'express-fileupload';


export interface IAssignmentModel extends Document {
    date: Date;
    description: string;
    user_id: Schema.Types.ObjectId;
    client_id: Schema.Types.ObjectId;
    image_id: [Schema.Types.ObjectId];
    imageFile: UploadedFile[];
}

const AssignmentSchema = new Schema<IAssignmentModel>({
    date: {
        type: Date,
        required: true,
        validate: {
            validator: function (value: Date) {
                return value > new Date();
            },
            message: 'Date must be in the future.'
        }
    },
    description: {
        type: String,
        minlength: [2, 'Too short.'],
        maxlength: [10000, 'Too long.'],
        trim: true,
        required: true
    },
    client_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    image_id: [{
        type: Schema.Types.ObjectId,
    }],
    imageFile: {
        type: [Object]
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
});


const virtuals = ['client', 'user', 'image'];

virtuals.forEach(virtual => {
    const modelName = `${virtual.charAt(0).toUpperCase()}${virtual.slice(1)}Model`;
    console.log(`${virtual}_id`)
    AssignmentSchema.virtual(virtual, {
        ref: modelName,
        localField: `${virtual}_id`,
        foreignField: '_id',
        justOne: true
    });
});


export const AssignmentModel = model<IAssignmentModel>('AssignmentModel', AssignmentSchema, 'assignment');