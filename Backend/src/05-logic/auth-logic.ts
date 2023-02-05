import { ICredentialsModel } from '../03-models/credentials-model';
import { IUserModel, UserModel } from '../03-models/user-model';
import ErrorModel from '../03-models/error-model';
import cyber from '../01-utils/cyber';

async function isUserIdFree(userId: number): Promise<boolean> {
  const count = await UserModel.countDocuments({ userId: userId }).exec();

  return count === 0;
}

async function register(user: IUserModel): Promise<string> {
  
  try {
    await user.validate();
  } catch (error) {
    throw new ErrorModel(400, error.message);
  }

  const existingUser = await isUserIdFree(user.userId);
  if (!existingUser) {
    throw new ErrorModel(400, `Sorry. ID ${user.userId} is not available.`)
  }


  user.password = cyber.hash(user.password);

  user.save();
  delete user.password;
  console.log('User stracture after delete password: ', user);

  const token = cyber.getNewToken(user);
  return token;
}


async function login(credentials: ICredentialsModel): Promise<string> {
  
  try {
    await credentials.validate();
  } catch (error) {
    throw new ErrorModel(400, error.message);
  }

  // Hash password:
  credentials.password = cyber.hash(credentials.password);

  const users = await UserModel.find({
    userId: credentials.userId,
    password: credentials.password,
  }).exec();
  console.log('users: ', users);

  if (users.length === 0) {
    throw new ErrorModel(401, 'Incorrect user ID or password');
  }

  const user = users[0];
  delete user.password;

  const token = cyber.getNewToken(user);
  return token;
}


export default {
  register,
  login,
};
