import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ToDosSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task',
    unique: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('ToDos', ToDosSchema);
