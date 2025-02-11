import Employee from "../models/employee.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { employeename, email, password } = req.body;

  if (
    !employeename ||
    !email ||
    !password ||
    employeename === "" ||
    email === "" ||
    password === ""
  ) {
    return next(new errorHandler(400, "All fields are required"));
  }
  const hashPassword = bcryptjs.hashSync(password, 10);

  const newEmployee = new Employee({
    employeename,
    email,
    password: hashPassword,
  });

  try {
    await newEmployee.save();
    res.json({ success: true, message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(new errorHandler(400, "All fields are required"));
  }

  try {
    const validEmployee = await Employee.findOne({ email });
    if (!validEmployee) {
      return next(new errorHandler(400, "Employee not found"));
    }

    const validPassword = bcryptjs.compareSync(
      password,
      validEmployee.password
    );
    if (!validPassword) {
      return next(new errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign(
      {
        id: validEmployee._id,
      },
      process.env.JWT_SECRET
    );

    const { password:hashedPassword, ...rest } = validEmployee._doc; // exlude the password from validEmployee data
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
