import { ClientModel, IClientModel } from './../03-models/client-model';


async function getAllClients(): Promise<IClientModel[]> {
    return ClientModel.find()
        .populate({
            path: 'assignment',
            select: '_id date description image_id',
            populate: {
                path: 'image_id',
                select: 'name'
            }
        })
        .select('-imageFile')
        .exec()
}

async function getClientById(_id: string): Promise<IClientModel> {
    return ClientModel.findById(_id).exec()
}

async function addClient(client: IClientModel): Promise<IClientModel> {
    return client.save()
}

async function updateClient(clientToUpdate: Partial<IClientModel>): Promise<IClientModel> {
    const { _id } = clientToUpdate
    const updatedClient = await ClientModel.findByIdAndUpdate(_id, { $set: clientToUpdate }, { new: true }).exec();
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