import {User} from '../../interfaces/User';
import userModel from '../models/userModel';

export default {
  Query: {
    users: async () => {
      return userModel.find();
    },
    userById: async (_parent: undefined, args: User) => {
      return userModel.findById(args.id);
    }
  },
  Mutation: {
    createUser: async (_parent: undefined, args: User) => {
      const newUser = new userModel({
        user_name: args.user_name,
        email: args.email
      });
      return await newUser.save();
    },
    updateUser: async (_parent: undefined, args: User) => {
      if (args.id) {
        return userModel.findByIdAndUpdate(
          args.id,
          {
            user_name: args.user_name,
            email: args.email
          },
          {new: true}
        );
      } else {
        return null;
      }
    },
    deleteUser: async (_parent: undefined, args: User) => {
      return userModel.findByIdAndDelete(args.id);
    }
  }
};

