import { Router } from "express";
import TaskController from "./task.controller";
import { verifyUser } from "../../middleware/verifyUser";

const router = Router();

router.post("/:projectId", verifyUser, TaskController.createTask);

router.get("/:id", verifyUser, TaskController.getTaskById);

router.get("/project/:projectId", verifyUser, TaskController.getTasksByProject);

router.put("/:id/:projectId", verifyUser, TaskController.updateTask);

router.delete("/:id/:projectId", verifyUser, TaskController.deleteTask);

router.put("/:id", verifyUser, TaskController.completeTask);

export default router;
