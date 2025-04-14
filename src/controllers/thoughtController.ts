import { Thoughts, User } from '../models/index.js';
import { Request, Response } from 'express';
import reactionThought from '../models/Thought.js';


  // TODO: Add comments to the functionality of the getApplications method
  export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // TODO: Add comments to the functionality of the getSingleApplication method
  export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thoughts.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

// TODO: Add comments to the functionality of the createApplication method
  export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thoughts.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      }

      res.json('Created the thought 🎉');
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
  }
  
  // TODO: Add comments to the functionality of the updateApplication method
  export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
  }

  // TODO: Add comments to the functionality of the deleteApplication method
  export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { applications: req.params.applicationId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created but no user with this id!',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

   // TODO: Add comments to the functionality of the addTag method
  export const addReaction = async (req: Request, res: Response) => {
    try {
      const reaction = await reactionThought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { tags: req.body } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(reaction);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // TODO: Add comments to the functionality of the addTag method
  export const removeReaction = async (req: Request, res: Response) => {
    try {
      const reaction = await reactionThought.findOneAndUpdate(
        { _id: req.params.reactionId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: 'No reaction with this id!' });
      }

      res.json(reaction);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

