import express, { NextFunction, Request, Response } from 'express';
import { ClientModel } from '../03-models/client-model';
import clientLogic from '../05-logic/client-logic';

const router = express.Router();

router.get('/clients', async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const assignments = await clientLogic.getAllClients();
        response.status(200).json(assignments);
    } catch (err: any) {
        next(err);
    }
}
);


router.post('/client', async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const client = new ClientModel(request.body);
        const addedClient = await clientLogic.addClient(client);

        response.status(201).json(addedClient);
    } catch (err: any) {
        next(err);
    }
}
);

router.put('/client', async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const clientDetailsToUpdate = new ClientModel(request.body)
        const updatedClient = await clientLogic.updateClient(clientDetailsToUpdate);

        response.status(200).json(updatedClient);
    } catch (err: any) {
        next(err);
    }
}
);

router.delete('/client/:clientId', async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const { clientId } = request.params
        await clientLogic.deleteClient(clientId);

        response.sendStatus(204)
    } catch (err: any) {
        next(err);
    }
}
);

export default router;