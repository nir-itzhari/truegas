import { Document, model, Schema } from 'mongoose';
import { UploadedFile } from 'express-fileupload';

export interface IAssignmentModel extends Document {
    description: string;
    userId: Schema.Types.ObjectId;
    client_id: Schema.Types.ObjectId;
    image_id: [Schema.Types.ObjectId];
    image: UploadedFile[];
}

const AssignmentSchema = new Schema<IAssignmentModel>({
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
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    image_id: [{
        type: Schema.Types.ObjectId,
    }],
    image: {
        type: [Object]
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
});


const virtuals = ['images', 'client', 'user'];

virtuals.forEach(virtual => {
    const modelName = `${virtual.charAt(0)}${virtual.slice(1)}Model`;

    AssignmentSchema.virtual(virtual, {
        ref: modelName,
        localField: `${virtual.slice(0, -1)}_id`,
        foreignField: '_id'
    });
});


export const AssignmentModel = model<IAssignmentModel>('AssignmentModel', AssignmentSchema, 'assignment');