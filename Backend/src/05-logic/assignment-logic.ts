import { IAssignmentModel, AssignmentModel } from '../03-models/assignment-model';
import { v4 as uuid } from 'uuid';
import { ImageModel } from '../03-models/image-model';
import { IFilterModel } from '../03-models/filter-model';
import path from 'path';
import ErrorModel from '../03-models/error-model';
import imageLogic from './image-logic';


// Get all assignments without the image data
async function getAllAssignments(): Promise<IAssignmentModel[]> {
    return AssignmentModel.find().select("-image").exec()
}


// Get all assignments for a specific client id without the image data
async function getAssignmentsByClientId(clientId: string): Promise<IAssignmentModel[]> {
    return AssignmentModel.find({ client_id: clientId }).select("-image").exec()
}


// Function to add an assignment
async function addAssignment(assignment: IAssignmentModel): Promise<IAssignmentModel> {

    try {
        await assignment.validate();
    } catch (error) {
        throw new ErrorModel(400, error.message);
    }


    // Only if images were sent.
    if (assignment.image && assignment.image.length) {

        for (const imageExt of assignment.image) {
            const extension = imageExt.name.substring(imageExt.name.lastIndexOf('.'));
            const imageName = `${uuid()}${extension}`;
            const absolutePath = path.join(
                __dirname,
                '..',
                'assets',
                'images',
                imageName
            );
            // Move the image to the specified directory
            await imageExt.mv(absolutePath);
            // Save the image in the ImageModel collection
            const newImage = new ImageModel({
                imageName: imageName,
                path: absolutePath
            });

            const savedImage = await newImage.save();
            // Add the id of the saved image to the assignment's image_id array
            assignment.image_id.push(savedImage._id);
        }
        // Remove the original images array
        delete assignment.image;
    }
    // Create a new assignment model with the data
    const newAssignment = new AssignmentModel(assignment);
    // Save and return the new assignment
    return newAssignment.save();
}


// Function to update an assignment
async function updateAssingment(assignment: IAssignmentModel): Promise<IAssignmentModel> {
    // Check if the assignment object is valid
    try {
        await assignment.validate();
    } catch (error) {
        throw new ErrorModel(400, error.message);
    }

    // Find the old assignment by its id
    const oldAssignment = await AssignmentModel.findById({ assignment: assignment._id });

    // Check if the client has sent an updated image
    if (assignment.image && assignment.image.length) {
        // Get the old image ids
        const oldImagesIds = oldAssignment.image_id;
        // Loop through the old image ids
        for (let i = 0; i < oldImagesIds.length; i++) {
            await imageLogic.updateImage(oldImagesIds[i], assignment.image[i]);
        }
    } else {
        // If the client has not sent an updated image, set the image_id to the old image ids
        assignment.image_id = oldAssignment.image_id;
    }
    // Update the assignment and get the new data
    const updatedAssignment = await AssignmentModel.findByIdAndUpdate(assignment._id, assignment, { new: true }).exec()
    if (!updatedAssignment) {
        // Throw an error if the assignment is not found
        throw new ErrorModel(404, `_id ${assignment._id} not found`);
    }
    // Return the updated assignment data
    return updatedAssignment;
}

// Function to delete an assignment
async function deleteAssignment(assignmentId: string): Promise<void> {
    // Find the assignment by its id
    const assignment = await AssignmentModel.findById(assignmentId);
    if (!assignment) {
        // Throw an error if the assignment is not found
        throw new ErrorModel(404, `Assignment with _id ${assignmentId} not found`);
    }
    // Get the image ids related to the assignment
    const imageIds = assignment.image_id;
    // Loop through the image ids
    for (let i = 0; i < imageIds.length; i++) {
        await imageLogic.deleteImage(imageIds[i])
    }
    //Delete the assignment based on its id
    await AssignmentModel.findByIdAndDelete(assignmentId).exec();
}

// Function to filering an assignments
async function filterAssignments(filters: IFilterModel): Promise<IAssignmentModel[]> {
    try {
        await filters.validate();
    } catch (error) {
        throw new ErrorModel(400, error.message);
    }

    let filterCriteria = {};

    // Iterate over filters and add each filter to the filterCriteria object
    for (const [key, value] of Object.entries(filters)) {
        filterCriteria[key] = value;
    }

    // Find all assignments that match the filter criteria
    return AssignmentModel.find(filterCriteria).select("-image").exec();
}

export default {
    getAllAssignments,
    getAssignmentsByClientId,
    addAssignment,
    updateAssingment,
    deleteAssignment,
    filterAssignments
}