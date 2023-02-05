import { Document, model, Schema } from 'mongoose';


export interface IFilterModel extends Document {
  city: string;
  street: string;
  buildingNumber: number;
  fullName: string;
}

const filterSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  buildingNumber: {
    type: Number,
    required: true
  },
  fullName: {
    type: String,
    required: true
  }
});

export const FilterModel = model<IFilterModel>("FilterModel", filterSchema, 'filter');