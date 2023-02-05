import { Document, model, Schema } from 'mongoose';

export interface ICredentialsModel extends Document {
  userId: number;
  password: string;
}

const CredentialsSchema = new Schema<ICredentialsModel>(
  {
    userId: {
      type: Number,
      required: [true, 'Missing userId'],
      minlength: [4, 'userId Too Short.'],
      maxlength: [100, 'userId Too long.'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Missing Password'],
      minlength: [4, 'Password Too Short.'],
      maxlength: [20, 'Password Too long.'],
      trim: true,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

export const CredentialsModel = model<ICredentialsModel>('CredentialsModel', CredentialsSchema, 'users');
