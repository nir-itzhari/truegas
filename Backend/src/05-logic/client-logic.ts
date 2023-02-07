import { ClientModel, IClientModel } from './../03-models/client-model';


async function getAllClients(): Promise<IClientModel[]> {
    return ClientModel.find().exec()
}

async function getClientById(_id: string): Promise<IClientModel> {
    return ClientModel.findById(_id).exec()
}

async function addClient(client: IClientModel): Promise<IClientModel> {
    return client.save()
}

async function updateClient(id: string, clientToUpdate: Partial<IClientModel>): Promise<IClientModel> {
    const updatedClient = await ClientModel.findByIdAndUpdate(id, { $set: clientToUpdate }, { new: true }).exec();
    return updatedClient;
  }

async function deleteClient(_id: string): Promise<IClientModel> {
    const deletedClient = await ClientModel.findByIdAndDelete(_id).exec();
    return deletedClient;
}

export default {
    getAllClients,
    getClientById,
    addClient,
    updateClient,
    deleteClient
}