// modules/project/controllers/task.controller.ts

import { Request, Response } from "express";
import Task from "./task.models";
import Project from "../project/project.models";
import NotificationModel from "../notification/notification.models";
import { redisClient } from "../../config/redis";
import { io, userSockets } from "../../app";
import {
  cacheProjectData,
  getCachedProjectData,
  removeTaskFromCache,
  updatenewTaskInCache,
  updateTaskInCache,
} from "../../utils/radis.utils";
import { publishMessage } from "../../config/rabbitmq";

interface CustomRequest extends Request {
  userId?: string;
}

class TaskController {
  // Create a new task
  createTask = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { projectId } = req.params;
      console.log(projectId);
      const { taskName, description, priority, assignedTo } = req.body;
      console.log("assing", assignedTo);

      const project = await Project.findOne({
        _id: projectId.toString(),
        users: {
          $elemMatch: {
            userId: req.userId,
            role: { $in: ["admin", "manager"] },
          },
        },
      });

      if (!project) {
        res.status(403).json({
          message:
            "Unauthorized: Only project admins and managers can create tasks.",
        });
        return;
      }

      const task = await Task.create({
        taskName,
        description,
        assignedBy: req.userId,
        assignedTo,
        priority,
        projectId,
      });

      const populatedTask = await Task.findById(task._id)
        .populate("assignedBy", "name email")
        .populate("assignedTo", "name email");

      await NotificationModel.create({
        recipient: [assignedTo],
        sender: req.userId,
        projectId,
        taskId: task._id,
        message: `You have been assigned a new task: "${taskName}"`,
        type: "new-assignment",
        read: false,
      });

      const socketId = userSockets[assignedTo.toString()];
      if (socketId) {
        io.to(socketId).emit("new-notification", {
          message: `You have been assigned a new task: "${taskName}"`,
          sender: req.userId,
          taskId: task._id,
          type: "new-assignment",
          projectId,
        });
      }

      res.status(201).json(populatedTask);
    } catch (error) {
      res.status(500).json({ message: "Error creating task", error });
    }
  };

  getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error fetching task", error });
    }
  };

  getTasksByProject = async (
    req: CustomRequest,
    res: Response
  ): Promise<void> => {
    try {
      const projectId = req.params.projectId;

      const project = await Project.findOne({
        _id: projectId,
        // users: { $elemMatch: { userId: req.userId } },
      }).populate({
        path: "users.userId",
        select: "_id name email availability bio __v",
      });

      if (!project) {
        res
          .status(403)
          .json({ message: "Unauthorized: You must be part of the project." });
        return;
      }

      const tasks = await Task.find({ projectId })
        .populate({
          path: "assignedBy",
          select: "_id name email",
        })
        .populate({
          path: "assignedTo",
          select: "_id name email",
        })
        .lean();

      const projectData = {
        ...project.toObject(),
        tasks,
      };

      res.status(200).json(projectData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching tasks", error });
    }
  };

  // Update a task
  // updateTask = async (req: CustomRequest, res: Response): Promise<void> => {
  //   try {
  //     const { projectId, id: taskId } = req.params;
  //     const { userId } = req;

  //     const project = await Project.findOne({
  //       _id: projectId,
  //       users: {
  //         $elemMatch: {
  //           userId: userId,
  //           role: { $in: ["admin", "manager", "developer"] },
  //         },
  //       },
  //     });

  //     if (!project) {
  //       res.status(403).json({
  //         message:
  //           "Unauthorized: Only project admins, managers, or the assigned user can update tasks.",
  //       });
  //       return;
  //     }

  //     const task = await Task.findById(taskId);
  //     if (!task) {
  //       res.status(404).json({ message: "Task not found." });
  //       return;
  //     }

  //     if (task.assignedTo.toString() === userId) {
  //       const allowedFields = ["status"];
  //       const fieldsToUpdate = Object.keys(req.body);

  //       const hasRestrictedFields = fieldsToUpdate.some(
  //         (field) => !allowedFields.includes(field)
  //       );

  //       if (hasRestrictedFields) {
  //         res.status(403).json({
  //           message: "Unauthorized: You can only update the task status.",
  //         });
  //         return;
  //       }
  //     }

  //     const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
  //       new: true,
  //     });

  //     if (!updatedTask) {
  //       res.status(404).json({ message: "Task not found." });
  //       return;
  //     }

  //     const populatedTask = await Task.findById(updatedTask._id)
  //       .populate("assignedBy", "name email")
  //       .populate("assignedTo", "name email");

  //     const adminsAndManagers = project.users.filter((user) =>
  //       ["admin", "manager"].includes(user.role)
  //     );

  //     const notificationPromises = adminsAndManagers
  //       .filter((user) => user.userId.toString() !== userId)
  //       .map((user) => {
  //         return NotificationModel.create({
  //           recipient: [user.userId],
  //           sender: userId,
  //           projectId,
  //           taskId: updatedTask._id,
  //           message: `Task "${updatedTask.taskName}" has been updated by ${userId}`,
  //           type: "task-update",
  //           read: false,
  //         });
  //       });
  //     await Promise.all(notificationPromises);

  //     adminsAndManagers
  //       .filter((user) => user.userId.toString() !== userId)
  //       .forEach((user) => {
  //         const socketId = userSockets[user.userId.toString()];
  //         if (socketId) {
  //           io.to(socketId).emit("new-notification", {
  //             message: `Task "${updatedTask.taskName}" has been updated by ${userId}`,
  //             sender: userId,
  //             taskId: updatedTask._id,
  //             type: "task-update",
  //             projectId,
  //           });
  //         }
  //       });

  //     // // Send a notification message (assuming the function exists)
  //     // const notificationMessage = {
  //     //   type: "task-update",
  //     //   projectId,
  //     //   taskId: updatedTask._id,
  //     //   message: `Task "${updatedTask.taskName}" has been updated by ${userId}`,
  //     //   recipients: [updatedTask.assignedTo], // Notify the assigned user
  //     //   timestamp: new Date(),
  //     // };

  //     // // Publish the notification to RabbitMQ
  //     // await publishMessage("projectQueue", notificationMessage);

  //     res.status(200).json(populatedTask);
  //   } catch (error) {
  //     res.status(500).json({ message: "Error updating task", error });
  //   }
  // };


  updateTask = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { projectId, id: taskId } = req.params;
      const { userId } = req;
  
      // Find project and ensure user has the correct role
      const project = await Project.findOne({
        _id: projectId,
        users: {
          $elemMatch: {
            userId: userId,
            role: { $in: ["admin", "manager", "developer"] },
          },
        },
      });
  
      if (!project) {
        res.status(403).json({
          message: "Unauthorized: Only project admins, managers, or the assigned user can update tasks.",
        });
        return
      }
  
      // Ensure task exists
      const task = await Task.findById(taskId);
      if (!task) {
         res.status(404).json({ message: "Task not found." });
         return
      }
  
      // Check if user is assigned and can update
      if (task.assignedTo.toString() === userId) {
        const allowedFields = ["status"];
        const fieldsToUpdate = Object.keys(req.body);
        const hasRestrictedFields = fieldsToUpdate.some(
          (field) => !allowedFields.includes(field)
        );
        if (hasRestrictedFields) {
          res.status(403).json({
            message: "Unauthorized: You can only update the task status.",
          });
          return
        }
      }
  
      // Update task with only allowed fields
      const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true,
        runValidators: true,
      }).populate("assignedBy", "name email")
        .populate("assignedTo", "name email");
  
      if (!updatedTask) {
         res.status(404).json({ message: "Task not found." });
         return
      }
  
      // Get project admins and managers for notifications
      const adminsAndManagers = project.users.filter((user) =>
        ["admin", "manager"].includes(user.role)
      );
  
      // Bulk notification creation
      const notificationPromises = adminsAndManagers
        .filter((user) => user.userId.toString() !== userId)
        .map((user) => {
          return NotificationModel.create({
            recipient: [user.userId],
            sender: userId,
            projectId,
            taskId: updatedTask._id,
            message: `Task has been updated`,
            type: "task-update",
            read: false,
          });
        });
  
      // Emit socket notifications in bulk
      const socketEmitPromises = adminsAndManagers
        .filter((user) => user.userId.toString() !== userId)
        .map((user) => {
          const socketId = userSockets[user.userId.toString()];
          if (socketId) {
            return io.to(socketId).emit("new-notification", {
              message: `Task "${updatedTask.taskName}" has been updated by ${userId}`,
              sender: userId,
              taskId: updatedTask._id,
              type: "task-update",
              projectId,
            });
          }
          return Promise.resolve(); // No action if socketId not found
        });
  
      // Run notification creation and socket emissions in parallel
      await Promise.all([Promise.all(notificationPromises), Promise.all(socketEmitPromises)]);
  
      // Send back the populated task
        res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
       res.status(500).json(error);
    }
  };
  

  deleteTask = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { projectId, id } = req.params;
      const project = await Project.findOne({
        _id: req.params.projectId,
        users: {
          $elemMatch: {
            userId: req.userId,
            role: { $in: ["admin", "manager"] },
          },
        },
      });

      if (!project) {
        res.status(403).json({
          message:
            "Unauthorized: Only project admins and managers can delete tasks.",
        });
        return;
      }

      const deletedTask = await Task.findByIdAndDelete(id);

      if (!deletedTask) {
        res.status(404).json({ message: "Task not found." });
        return;
      }

      // await removeTaskFromCache(projectId, id);

      res.status(200).json({ message: "Task deleted successfully.", id });
    } catch (error) {
      res.status(500).json({ message: "Error deleting task", error });
    }
  };

  completeTask = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const taskId = req.params.id;

      const task = await Task.findById(taskId);
      if (!task) {
        res.status(404).json({ message: "Task not found." });
        return;
      }

      const project = await Project.findOne({
        _id: task.projectId,
        users: {
          $elemMatch: {
            userId: req.userId,
            role: { $in: ["admin", "manager", "developer"] },
          },
        },
      });

      if (!project) {
        res
          .status(403)
          .json({ message: "Unauthorized: You must be part of the project." });
        return;
      }

      if (task.assignedTo.toString() !== req.userId) {
        res.status(403).json({
          message: "Unauthorized: You can only complete tasks assigned to you.",
        });
        return;
      }

      task.status = "completed";
      task.completedAt = new Date();
      await task.save();

      res.status(200).json({ message: "Task marked as completed.", task });
    } catch (error) {
      res.status(500).json({ message: "Error completing task", error });
    }
  };
}

export default new TaskController();
