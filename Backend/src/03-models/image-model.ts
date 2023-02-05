import { Document, model, ObjectId, Schema } from 'mongoose';
import { UploadedFile } from 'express-fileupload';


export interface IImageModel extends Document {
    image: UploadedFile;
    encoding: string;
    mimetype: string;
    size: number;
    imageName: string;
    assaignment_id: Schema.Types.ObjectId;
}

export const ImageScheme = new Schema<IImageModel>(
    {
        image: {
            type: Buffer,
            required: true,
            max: 2 * 1024 * 1024,
        },
        imageName: {
            type: String,
            required: true,
            match: /\.(jpeg|jpg|png)$/,
        },
        encoding: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
            required: true,
            enum: ['image/jpeg', 'image/png'],
        },
        size: {
            type: Number,
            required: true,
            max: 2 * 1024 * 1024,
        },
        assaignment_id: {
            type: Schema.Types.ObjectId,
            required: true
        },

    },
    {
        versionKey: false,
        toJSON: { virtuals: true },
        id: false
    }
)


export const ImageModel = model<IImageModel>('ImageModel', ImageScheme, 'images');