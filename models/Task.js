const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, default: new Date() },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do', },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userEmail: { type: String, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
