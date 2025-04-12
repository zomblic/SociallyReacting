import { User, Application } from '../models/index.js';
import { Request, Response } from 'express';


  // Get all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get a single user
  export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // create a new user
  export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Delete a user and associated apps
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await User.deleteMany({ _id: { $in: user } });
      res.json({ message: 'User and associated apps deleted!' })
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }


export const addFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;

  // Check if the user exists

  // We can ADD the friendId value to the current uer's friends array
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { friends: friendId } },
      { new: true }
    );
    // validate if the user exists
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error adding friend' });
  }
};

