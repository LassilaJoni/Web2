import mongoose from 'mongoose';
import {User} from '../../interfaces/User';

const Schema = mongoose.Schema;

export const UserSchema = new Schema<User>({
  user_name: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  password: {
    type: String,
  },
});

export default mongoose.model<User>('User', UserSchema);
