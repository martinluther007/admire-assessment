import { Schema, model, Types, Document } from "mongoose";

interface IApplication extends Document {
  id: Types.ObjectId;
  studentName: string;
  universityName: string;
  universityCourse: string;
}
const applicationSchema = new Schema<IApplication>({
  studentName: {
    type: String,
    required: [true, "An application must have a student name"],
    unique: true,
  },
  universityName: {
    type: String,
    required: [true, "An application must have a university name"],
  },
  universityCourse: {
    type: String,
    required: [true, "An application must have a course"],
  },
});

const Application = model("application", applicationSchema);
export default Application;
