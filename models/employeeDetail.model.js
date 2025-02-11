import mongoose from "mongoose";

const detailSchema = mongoose.Schema({
  employeeName: {
    type: String,
  },
  employeeID: {
    type: Number,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  education: {
    type: String,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
});

const Detail = mongoose.model("Detail", detailSchema);
export default Detail;
