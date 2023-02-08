import express, { NextFunction, Request, Response } from 'express';
import { AssignmentModel } from '../03-models/assignment-model';
import assignmentsLogic from '../05-logic/assignment-logic';

const router = express.Router();

router.get('/assignments', async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const assignments = await assignmentsLogic.getAllAssignments();
        response.json(assignments);
    } catch (err: any) {
        next(err);
    }
}
);


router.get('/assignments/:clientId', async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const clientId = request.params.clientId;
        const assignmentsByclientId = await assignmentsLogic.getAssignmentsByClientId(clientId);

        response.json(assignmentsByclientId);
    } catch (err: any) {
        next(err);
    }
}
);


router.post('/assignment', async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        request.body.imageFile = request.files?.image
        const assignment = new AssignmentModel(request.body);
        const addedAssignments = await assignmentsLogic.addAssignment(assignment);

        response.json(addedAssignments);
    } catch (err: any) {
        next(err);
    }
}
);

export default router;