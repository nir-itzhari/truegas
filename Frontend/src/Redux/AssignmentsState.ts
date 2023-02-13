import AssignmentModel from '../Models/AssignmentModel';

export class AssignmentsState {
    public assignmetns: AssignmentModel[] = [];

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

export const addAssignmentAction = (vacation: AssignmentModel): AssignmentAction => {
    return { type: AssignmentsActionType.AddAssignment, payload: vacation };
}
export const updateAssignmentAction = (vacation: AssignmentModel): AssignmentAction => {
    return { type: AssignmentsActionType.UpdateAssignment, payload: vacation };
}
export const deleteAssignmentAction = (vacationId: string): AssignmentAction => {
    return { type: AssignmentsActionType.DeleteAssignment, payload: vacationId };
}


export const AssignmentsReducer = (currentState = new AssignmentsState(), action: AssignmentAction): AssignmentsState => {
    const newState = { ...currentState };

    switch (action.type) {
        case AssignmentsActionType.FetchAssignments:
            newState.assignmetns = action.payload;
            break;
        case AssignmentsActionType.AddAssignment:
            newState.assignmetns.push(action.payload);
            break;
        case AssignmentsActionType.UpdateAssignment:
            const indexToUpdate = newState.assignmetns.findIndex(a => a.assignmentId === action.payload.assignmentId);
            if (indexToUpdate >= 0) {
                newState.assignmetns[indexToUpdate] = action.payload;
            }
            break;
        case AssignmentsActionType.DeleteAssignment:
            const indexToDelete = newState.assignmetns.findIndex(a => a.assignmentId === action.payload);
            if (indexToDelete >= 0) {
                newState.assignmetns.splice(indexToDelete, 1);
            }
    }

    return newState;
}