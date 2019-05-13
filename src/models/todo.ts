import mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Model = mongoose.Model;
import Document = mongoose.Document;

// Define Document properties
export interface TaskDocument extends Document {
  userId: string;
  caption: string;
  isChecked: boolean;
  createDate: Date;
  updateDate: Date;
}

// Define static methods for Model
interface ITaskModel extends Model<TaskDocument> {
  new(doc?: Object): TaskDocument;

  // Definitions of static methods
  // listTasks(userId: string, password: string): Promise<TaskDocument>;
  // createTask(userId: string, password: string, roles: string[]): Promise<TaskDocument>;
  // updateTask(userId: string): Promise<TaskDocument>;
  // removeTask(userId: string): Promise<TaskDocument>;
}

function createModel(): ITaskModel {
  // Define mongoose Schema
  let todoSchema: Schema = new Schema({
    userId: { type: String, requied: true },
    caption: { type: String, requied: true },
    isChecked: { type: Boolean, required: true },
    createDate: { type: Date, default: new Date() },
    updateDate: { type: Date, default: new Date() }
  });

  // Create mongoose Object with IUserModel and UserDocument
  let User = <ITaskModel>mongoose.model('TodoCollection', todoSchema);

  // Return Model
  return User;
}

export const Todo: ITaskModel = createModel();

//  Implementation of static method for Model
class TodoModel {
  //
  // Implimentation of static methods
  //
}
