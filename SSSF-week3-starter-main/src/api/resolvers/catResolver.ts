import {Cat} from '../../interfaces/Cat';
import catModel from '../models/catModel';
import userModel from '../models/userModel';

export default {
  Query: {
    cats: async () => {
      return catModel.find().populate('owner');
    },
    catById: async (_parent: undefined, args: Cat) => {
      return catModel.findById(args.id).populate('owner');
    },
    catsByOwner: async (_parent: undefined, args: Cat) => {
      return catModel.find({owner: args.owner});
    },
    async catsByArea(root: any, cat: Cat) {
      return catModel.find().populate('owner');
    }
  },
  Mutation: {
    createCat: async (root: any, cat: Cat) => {
      const newCat = new catModel(cat);

      // Get owner
      const owner = await userModel.findById(cat.owner);
      if (!owner) {
        throw new Error('Cat has no owner');
      }
      newCat.owner = owner;
      await newCat.save();
      return newCat;
    },
    updateCat: async (root: any, cat: Cat) => {
      // Update cat
      const updatedCat = await catModel
        .findOneAndUpdate({_id: cat.id}, cat, {new: true})
        .populate('owner');
      if (!updatedCat) {
        throw new Error('Cat not found');
      }
      return updatedCat;
    },
    deleteCat: async (root: any, cat: Cat) => {
      return catModel.findOneAndDelete({_id: cat.id});
    }
  }
};