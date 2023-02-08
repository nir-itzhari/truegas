import { Document, model, Schema } from 'mongoose';

export interface ICredentialsModel extends Document {
  user_id: number;
  password: string;
}

const CredentialsSchema = new Schema<ICredentialsModel>(
  {
    user_id: {
      type: Number,
      required: [true, 'Missing user Id'],
      minlength: [4, 'user Id Too Short.'],
      maxlength: [100, 'user Id Too long.'],
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
