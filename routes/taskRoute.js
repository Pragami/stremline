import express from "express";
import {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteRestoreTask,
  duplicateTask,
  getTask,
  getTasks,
  postTaskActivity,
  trashTask,
  updateTask,
  updateTaskStage,
  requestTaskCompletion, // ✅ Added
  approveTaskCompletion, // ✅ Added
} from "../controllers/taskController.js";
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, createTask);
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);
router.get("/:id", protectRoute, getTask);

router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
router.put("/change-stage/:id", protectRoute, updateTaskStage);
router.put("/:id", protectRoute, isAdminRoute, trashTask);

// ✅ Users request task completion (requires admin approval)
router.put("/:id/request-completion", protectRoute, requestTaskCompletion);

// ✅ Admins approve task completion
router.put("/:id/approve-completion", protectRoute, isAdminRoute, approveTaskCompletion);

router.delete(
  "/delete-restore/:id?",
  protectRoute,
  isAdminRoute,
  deleteRestoreTask
);

export default router;
