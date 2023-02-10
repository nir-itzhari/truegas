import { IAssignmentModel, AssignmentModel } from '../03-models/assignment-model';
import { v4 as uuid } from 'uuid';
import { ImageModel } from '../03-models/image-model';
import { IFilterModel } from '../03-models/filter-model';
import path from 'path';
import ErrorModel from '../03-models/error-model';
import imageLogic from './image-logic';
import { ClientModel } from '../03-models/client-model';
import { ObjectId } from 'mongoose';


// Get all assignments without the image data
async function getAllAssignments(): Promise<IAssignmentModel[]> {
    const assignments = await AssignmentModel.find().select("-imageFile -image")
        .populate({ path: 'user', select: '-_id user_id' })
        .populate({ path: 'client', select: '-_id -assignment_id' })
        .populate({ path: 'image', select: '-_id name' }).lean().exec();
    return assignments as IAssignmentModel[];
}


// Get all assignments for a specific client id without the image data
async function getAssignmentsByClientId(clientId: string): Promise<IAssignmentModel[]> {
    return AssignmentModel.find({ client_id: clientId }).exec()
}


// Function to add an assignment
async function addAssignment(assignment: IAssignmentModel): Promise<IAssignmentModel> {
    try {
        await assignment.validate();
    } catch (error) {
        throw new ErrorModel(400, error.message);
    }

    if (assignment.imageFile && assignment.imageFile.length) {
        const image_id: ObjectId[] = [];
        for (const imageExt of assignment.imageFile) {
            const extension = imageExt.name.substring(imageExt.name.lastIndexOf('.'));
            const imageName = `${uuid()}${extension}`;
            const absolutePath = path.join(__dirname, '..', 'assets', 'images', imageName);

            await imageExt.mv(absolutePath);

            const savedImage = await new ImageModel({
                name: imageName,
                mimetype: imageExt.mimetype,
                size: imageExt.size,
                assignment_id: assignment._id
            }).save();

            image_id.push(savedImage._id);
        }
        assignment.image_id = image_id;
        assignment.imageFile = []
    }

    const savedAssignment = await new AssignmentModel(assignment).save();

    await ClientModel.updateMany({ _id: assignment.client_id }, { $push: { assignment_id: savedAssignment._id } }).exec();

    return AssignmentModel.findById(savedAssignment._id)
        .populate({ path: 'user', select: '-_id user_id' })
        .populate({ path: 'client', select: '-_id -assignment_id' })
        .populate({ path: 'image', select: '-_id name' }).exec();
}



// Function to update an assignment
async function updateAssingment(assignment: IAssignmentModel): Promise<IAssignmentModel> {

    try {
        await assignment.validate();
    } catch (error) {
        throw new ErrorModel(400, error.message);
    }

    const oldAssignment = await AssignmentModel.findById({ assignment: assignment._id }).exec();

    const updatedAssignment: any = {};
    for (const key in assignment) {
        if (key === 'imageFile' && assignment.imageFile && assignment.imageFile.length) {
            const oldImagesIds = oldAssignment.image_id;
            // Loop through the old image ids
            for (let i = 0; i < oldImagesIds.length; i++) {
                await imageLogic.updateImage(oldImagesIds[i], assignment.imageFile[i]);
            }
        } else if (assignment[key] !== oldAssignment[key]) {
            updatedAssignment[key] = assignment[key];
        }
    }

    // If the client has not sent an updated image, set the image_id to the old image ids
    if (!updatedAssignment.image_id) {
        updatedAssignment.image_id = oldAssignment.image_id;
    }

    const updated = await AssignmentModel.findByIdAndUpdate(assignment._id, updatedAssignment, { new: true }).exec()
    if (!updated) {
        throw new ErrorModel(404, `_id ${assignment._id} not found`);
    }
    return updated;
}

// Function to delete an assignment
async function deleteAssignment(assignmentId: string): Promise<void> {
    const assignment = await AssignmentModel.findById(assignmentId);
    if (!assignment) {
        throw new ErrorModel(404, `Assignment with _id ${assignmentId} not found`);
    }
    const imageIds = assignment.image_id;

    for (let i = 0; i < imageIds.length; i++) {
        await imageLogic.deleteImage(imageIds[i])
    }

    await AssignmentModel.findByIdAndDelete(assignmentId).exec();
}

// Function to filter assignments
async function filterAssignments(filters: IFilterModel): Promise<IAssignmentModel[]> {

    try {
        await filters.validate();
    } catch (error) {
        throw new ErrorModel(400, error.message);
    }

    let filterCriteria = {};

    // Iterate over the filters and add each filter to the filterCriteria object
    for (const [key, value] of Object.entries(filters)) {
        filterCriteria[key] = value;
    }


    return AssignmentModel.find(filterCriteria).select("-imageFile").exec();
}

export default {
    getAllAssignments,
    getAssignmentsByClientId,
    addAssignment,
    updateAssingment,
    deleteAssignment,
    filterAssignments
}