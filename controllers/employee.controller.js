import Detail from "../models/employeeDetail.model.js";
import { errorHandler } from "../utils/error.js";

// Code of creating the user
export const createEmployee = async (req, res, next) => {
  const {
    employeeName,
    employeeID,
    designation,
    email,
    education,
    address,
    salary,
    joiningDate,
  } = req.body;
  if (!employeeName || !employeeID || !designation || !email || !salary) {
    return next(new errorHandler(400, "All required fields must be provided"));
  }

  const newEmployee = new Detail({
    employeeName,
    employeeID,
    designation,
    email,
    education,
    address,
    salary,
    joiningDate: joiningDate ? new Date(joiningDate) : new Date(),
  });
  try {
    await newEmployee.save();
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: newEmployee,
    });
  } catch (error) {
    next(error);
  }
};

// Code of deleting the user
export const deleteEmployee = async (req, res, next) => {
  try {
    const { employeeID } = req.params;
    //   console.log("Received employeeID:", employeeID);
    const deletedEmployee = await Detail.findOneAndDelete({ employeeID });

    if (!deletedEmployee) {
      return next(errorHandler(404, "Employee not found"));
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Code of updating the user
export const updateEmployee = async (req, res, next) => {
  try {
    const { employeeID } = req.params;

    const updatedEmployee = await Detail.findOneAndUpdate(
      { employeeID }, // Find employee by custom employeeID
      { $set: req.body }, // Update fields with new data
      { new: true, runValidators: true } // Return updated data & validate
    );

    if (!updatedEmployee) {
      return next(errorHandler(404, "Employee not found"));
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployee = async (req, res, next) => {
  try {
    const data = await Detail.find({});

    if (!data || data.length === 0) {
      return next(new errorHandler(400, "No data is available"));
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
