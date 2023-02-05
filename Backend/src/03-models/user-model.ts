import { Document, model, Schema } from 'mongoose';

export interface IUserModel extends Document {
  userId: number;
  password: string;
  isAdmin: boolean;
}

const UserSchema = new Schema<IUserModel>(
  {
    userId: {
      type: Number,
      required: [true, 'Missing User Id'],
      minlength: [7, 'Id Too Short.'],
      maxlength: [14, 'Id Too long.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Missing Password'],
      minlength: [4, 'Password Too Short.'],
      maxlength: [150, 'Password Too long.'],
      trim: true,
    },
    isAdmin: Boolean,
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

export const UserModel = model<IUserModel>('UserModel', UserSchema, 'users');
