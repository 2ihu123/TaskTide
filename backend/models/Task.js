const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    email :{
        type: String,
        required:true
    },
  title: 
       { type: String, 
        required: true 
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'], // Define priority levels
        default: 'Medium', // Default value
      },
   description: String,
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  completionDate: Date,
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);