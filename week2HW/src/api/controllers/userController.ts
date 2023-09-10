import {Request, Response, NextFunction} from 'express';
import {User, UserOutput} from '../../interfaces/User';
import CustomError from '../../classes/CustomError';
import userModel from '../models/userModel';
const bcrypt = require('bcrypt');

const userGet = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (user) {
      const outputUser: UserOutput = {
        _id: user._id,
        user_name: user.user_name,
        email: user.email,
      };
      return res.json(outputUser);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const userListGet = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    if (users) {
      const output = users.map((user: User) => {
        const outputUser: UserOutput = {
          _id: user._id,
          user_name: user.user_name,
          email: user.email,
        };
        return outputUser;
      });
      return res.json(output);
    } else {
      res.status(404).json({message: 'Users not found'});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const userPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password!, salt);
    user.password = hash;
    const newUser: User = await userModel.create(user);
    if (newUser) {
      res.json({message: 'user added', data: newUser});
    }
  } catch (err) {
    next(err);
  }
};

const userPutCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User = req.user as User;
  const {user_name, email, password} = req.body;
  const updatedUser: User = await userModel.findByIdAndUpdate(
    user._id,
    {user_name, email, password},
    {new: true}
  );
  if (!updatedUser) {
    next(new CustomError('User not updated', 400));
    return;
  }
  res.json({message: 'user updated', data: updatedUser});
};

const userDeleteCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User = req.user as User;
  const deletedUser: User = await userModel.findByIdAndDelete(user._id);
  if (!deletedUser) {
    next(new CustomError('User not deleted', 400));
    return;
  }
  res.json({message: 'user deleted', data: deletedUser});
};

const checkToken = async (req: Request, res: Response) => {
  // Check token

  const user = req.user as User;
  try {
    if (!user) {
      return res.status(401).json({message: 'Token not valid'});
    }
    const output = {
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
    };
    return res.json(output);
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  userGet,
  userListGet,
  userPost,
  userPutCurrent,
  userDeleteCurrent,
  checkToken,
};
