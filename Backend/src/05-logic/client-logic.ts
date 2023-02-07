import { ClientModel, IClientModel } from './../03-models/client-model';


async function getAllClients(): Promise<IClientModel[]> {
    return ClientModel.find().exec()
}


async function addClient(client: IClientModel): Promise<IClientModel> {
    return client.save()
}


async function updateClient(client: Partial<IClientModel>): Promise<IClientModel> {
    const { _id } = client;
    const updatedClient = await ClientModel.findByIdAndUpdate(_id, client, { new: true }).exec();
    return updatedClient;
}

async function deleteClient(_id: string): Promise<IClientModel> {
    const deletedClient = await ClientModel.findByIdAndDelete(_id).exec();
    return deletedClient;
}

export default {
    addClient,
    getAllClients,
    updateClient,
    deleteClient
}