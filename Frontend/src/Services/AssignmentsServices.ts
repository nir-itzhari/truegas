import { fetchAssignmentsAction, addAssignmentAction, deleteAssignmentAction, updateAssignmentAction } from '../Redux/AssignmentsState';
import axios from "axios";
import store from "../Redux/Store";
import config from "../Utils/Config";
import dayjs from 'dayjs';
import AssignmentModel from '../Models/AssignmentModel';

class AssignmentsService {

    public async fetchAssignments(): Promise<AssignmentModel[]> {

        if (store.getState().AssignmentsState.assignments.length === 0) {
            const response = await axios.get<AssignmentModel[]>(config.assignmentsUrl);
            const assignments = response.data;
            store.dispatch(fetchAssignmentsAction(assignments));
        }
        return store.getState().AssignmentsState.assignments;
    }

    public async getOneAssignment(assignmentId: string): Promise<AssignmentModel> {
        let assignment = store.getState().AssignmentsState.assignments.find(a => a.assignmentId === assignmentId);
        if (!assignment) {
            const response = await axios.get<AssignmentModel>(config.assignmentsUrl + assignmentId);
            assignment = response.data;
        }
        return assignment;
    }

    // public async addNewVacation(vacation: AssignmentModel): Promise<AssignmentModel> {

    //     const formData = new FormData();
    //     formData.append('destination', vacation.destination);
    //     formData.append('description', vacation.description);
    //     formData.append('fromDate', dayjs(vacation.fromDate).format("YYYY-MM-DD"));
    //     formData.append('toDate', dayjs(vacation.toDate).format("YYYY-MM-DD"));
    //     formData.append('price', vacation.price.toString());
    //     formData.append('image', vacation.image.item(0));

    //     const response = await axios.post<AssignmentModel>(config.vacationsUrl, formData);
    //     const addedVacation = response.data;

    //     store.dispatch(addVacationAction(addedVacation));

    //     return addedVacation;
    // }

    // public async updateVacation(vacation: AssignmentModel): Promise<AssignmentModel> {
    //     const formData = new FormData();
    //     formData.append('destination', vacation.destination);
    //     formData.append('description', vacation.description);
    //     formData.append('fromDate', dayjs(vacation.fromDate).format("YYYY-MM-DD"));
    //     formData.append('toDate', dayjs(vacation.toDate).format("YYYY-MM-DD"));
    //     formData.append('price', vacation.price.toString());
    //     formData.append('image', vacation.image.item(0));


    //     const response = await axios.put<VacationModel>(config.vacationsUrl + vacation.vacationId, formData);
    //     const updatedVacation = response.data;
    //     store.dispatch(updateVacationAction(updatedVacation));
    //     return updatedVacation;
    // }

    // public async deleteOneVacation(vacationId: string): Promise<void> {
    //     await axios.delete(config.vacationsUrl + vacationId);
    //     store.dispatch(deleteVacationAction(vacationId));
    // }
}
const assignmentsService = new AssignmentsService();

export default assignmentsService
