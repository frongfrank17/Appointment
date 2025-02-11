const mongoose = require('mongoose');


// Add a pre-save hook to update the `updatedAt` field before saving

const MedicSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true
    },
    fullname: {
      type: String,
      required: true
    },
    specialization: {
        type: String,
        required: true
      }

  });


const userSchema = new mongoose.Schema({
    username :   { type: String, required: true }, 
    fullname: { type: String, required: true },
    email: { type: String, required: false , default :"-" },
    birthdate : {type : Date , required: true } ,  
    phone: { type: String, required: true },
  })
const AppointmentSchema = new mongoose.Schema({
    _id : {
        type : String
    },
    user: {
      type : userSchema , 
      required: true
    },
    medic: {
      type : MedicSchema , 
     required: true
    },
    slot: {
      type: String, // Example: "9:00 AM"
      required: true
    },
    date: {
      type: Date, // Appointment date
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'], // Appointment statuses
      default: 'pending'
    },
    notes: {
      type: String, // Optional notes for the appointment
      default: ''
    },
  
  } ,{ timestamps: { createdAt : "created_at" , updatedAt: "updated_at"}});
  
module.exports = mongoose.model('Appointment', AppointmentSchema);
