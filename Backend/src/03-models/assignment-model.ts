import { Document, model, Schema } from 'mongoose';
import { UploadedFile } from 'express-fileupload';
import { ImageModel } from './image-model';


export interface IAssignmentModel extends Document {
    date: string;
    description: string;
    user_id: Schema.Types.ObjectId;
    client_id: Schema.Types.ObjectId;
    image_id: Schema.Types.ObjectId[];
    imageFile: UploadedFile[];
}

const AssignmentSchema = new Schema<IAssignmentModel>({
    date: {
        type: String,
    },
    description: {
        type: String,
        minlength: [2, 'Too short.'],
        maxlength: [10000, 'Too long.'],
        trim: true
    },
    client_id: {
        type: Schema.Types.ObjectId,
    },
    user_id: {
        type: Schema.Types.ObjectId,
    },
    image_id: {
        type: [Schema.Types.ObjectId],
        ref: ImageModel
    },
    imageFile: {
        type: [Object]
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true },
        id: false,

    });


const virtuals = ['client', 'user', 'image'];

virtuals.forEach(virtual => {
    const modelName = `${virtual.charAt(0).toUpperCase()}${virtual.slice(1)}Model`;
    AssignmentSchema.virtual(virtual, {
        ref: modelName,
        localField: `${virtual}_id`,
        foreignField: '_id',
    });

});


export const AssignmentModel = model<IAssignmentModel>('AssignmentModel', AssignmentSchema, 'assignment');