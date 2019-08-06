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
  // Task: add property
  // add property author (not required) to the schema
  // property should consist of object with properties:
  // name (only letters, first letter upper
  // - you can use regexp for string validation  /^[A-Za-z]$/),
  // or just make a string with all letters and check against it (custom validator)
  // surname (only letters, first letter upper),
  // age (only positives less than 100)
  // you can use custom or build in validators
  // update class_ToDo in model in the frontend accordingly
  // https://mongoosejs.com/docs/validation.html#built-in-validators
});

mongoose.model('ToDos', ToDosSchema);
