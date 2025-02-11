import express from "express";
const router = express.Router();

import {
  createEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} from "../controllers/employee.controller.js";

router.get("/get-employee", getEmployee);
router.post("/create-employee", createEmployee);
router.delete("/delete-employee/:employeeID", deleteEmployee);
router.put("/update-employee/:employeeID", updateEmployee);

export default router;
