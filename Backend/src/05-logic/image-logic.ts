import { UploadedFile } from 'express-fileupload';
import { unlinkSync } from 'fs';
import { Schema, Connection } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IImageModel, ImageModel } from '../03-models/image-model';
import path from 'path';
import ErrorModel from "../03-models/error-model";



async function updateImage(oldImageId: Schema.Types.ObjectId, newImage: UploadedFile): Promise<IImageModel> {
    const oldImage = await ImageModel.findById(oldImageId).lean().exec();
    if (!oldImage) {
        throw new ErrorModel(404, `Image with _id ${oldImageId} not found`);
    }
    const oldImageName = oldImage.name;
    const oldImageAbsolutePath = path.join(
        __dirname,
        '..',
        'assets',
        'images',
        oldImageName
    );

    const extension = newImage.name.substring(newImage.name.lastIndexOf('.'));
    const imageUrl = `${uuid()}${extension}`;
    const absolutePath = path.join(
        __dirname,
        '..',
        'assets',
        'images',
        imageUrl
    );

    await new Promise<void>((resolve, reject) => {
        newImage.mv(absolutePath, error => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });

    const session = await ImageModel.db.startSession();
    session.startTransaction();
    try {
        unlinkSync(oldImageAbsolutePath);
        const updatedImage = await ImageModel.findByIdAndUpdate(oldImageId, { imageUrl, path: absolutePath }, { new: true }).session(session).exec();
        await session.commitTransaction();
        session.endSession();
        return updatedImage;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new ErrorModel(500, "Failed to delete old file");
    }
}

async function deleteImage(imageId: Schema.Types.ObjectId) {
    let connection: Connection
    const session = await connection.startSession();
    session.startTransaction();

    try {
        const imageToDelete = await ImageModel.findById(imageId).session(session).exec();
        if (!imageToDelete) {
            throw new ErrorModel(404, `Image with _id ${imageId} not found`);
        }

        const absolutePath = path.join(
            __dirname,
            '..',
            'assets',
            'images',
            imageToDelete.name
        );

        unlinkSync(absolutePath);

        await ImageModel.findByIdAndDelete(imageId).session(session).exec();

        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new ErrorModel(500, `Failed to delete file`);
    }
}

export default {
    updateImage,
    deleteImage
}

