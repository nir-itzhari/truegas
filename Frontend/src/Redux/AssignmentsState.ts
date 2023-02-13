import AssignmentModel from '../Models/AssignmentModel';

export class AssignmentsState {
    public assignments: AssignmentModel[] = [];

}

export enum AssignmentsActionType {
    FetchAssignments = "FetchAssignments",
    AddAssignment = "AddAssignment",
    UpdateAssignment = "UpdateAssignment",
    DeleteAssignment = "DeleteAssignment",
}

export interface AssignmentAction {
    type: AssignmentsActionType;
    payload: any;
}

export const fetchAssignmentsAction = (assignments: AssignmentModel[]): AssignmentAction => {
    return { type: AssignmentsActionType.FetchAssignments, payload: assignments };
}

export const addAssignmentAction = (assignment: AssignmentModel): AssignmentAction => {
    return { type: AssignmentsActionType.AddAssignment, payload: assignment };
}
export const updateAssignmentAction = (assignment: AssignmentModel): AssignmentAction => {
    return { type: AssignmentsActionType.UpdateAssignment, payload: assignment };
}
export const deleteAssignmentAction = (assignmentId: string): AssignmentAction => {
    return { type: AssignmentsActionType.DeleteAssignment, payload: assignmentId };
}


export const AssignmentsReducer = (currentState = new AssignmentsState(), action: AssignmentAction): AssignmentsState => {
    const newState = { ...currentState };

    switch (action.type) {
        case AssignmentsActionType.FetchAssignments:
            newState.assignments = action.payload;
            break;
        case AssignmentsActionType.AddAssignment:
            newState.assignments.push(action.payload);
            break;
        case AssignmentsActionType.UpdateAssignment:
            const indexToUpdate = newState.assignments.findIndex(a => a.assignmentId === action.payload.assignmentId);
            if (indexToUpdate >= 0) {
                newState.assignments[indexToUpdate] = action.payload;
            }
            break;
        case AssignmentsActionType.DeleteAssignment:
            const indexToDelete = newState.assignments.findIndex(a => a.assignmentId === action.payload);
            if (indexToDelete >= 0) {
                newState.assignments.splice(indexToDelete, 1);
            }
    }

    return newState;
}