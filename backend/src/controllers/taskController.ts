import { Request, Response } from "express";
import Task, { ITask } from "../models/Task";

// Fetch all tasks
export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const task: ITask = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
  return;
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
  return;
};
