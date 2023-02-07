import { Document, model, Schema } from 'mongoose';


export interface IImageModel extends Document {
    // image: UploadedFile;
    // encoding: string;
    name: string;
    mimetype: string;
    size: number;
    assaignment_id: Schema.Types.ObjectId;
}

export const ImageScheme = new Schema<IImageModel>(
    {
        // image: {
        //     type: Object,
        //     required: true,
        //     max: 2 * 1024 * 1024,
        // },
        
        name: {
            type: String,
            required: true,
            match: /\.(jpeg|jpg|png)$/,
        },
        // encoding: {
        //     type: String,
        //     required: true,
        // },
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
        },

    },
    {
        versionKey: false,
        toJSON: { virtuals: true },
        id: false
    }
)


export const ImageModel = model<IImageModel>('ImageModel', ImageScheme, 'images');