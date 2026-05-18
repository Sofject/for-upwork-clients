const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return !this.isCustomAppointment;
    }
  },
  barberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barber',
    required: true
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  }, // Null for home service
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  reschedule: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ['shop', 'home_service'],
    required: true
  },
  // Additional fields for status tracking
  cancelledAt: {
    type: Date,
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  },
  // Reminder tracking
  reminderSentAt: {
    type: Date,
    default: null
  },
  barberReminderSentAt: {
    type: Date,
    default: null
  },
  // Reason for cancellation (optional)
  cancellationReason: {
    type: String,
    default: null
  },
  // Custom appointment fields
  isCustomAppointment: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: function() {
      return this.isCustomAppointment;
    }
  },
  notes: {
    type: String,
    default: null
  }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: false }
});

module.exports = mongoose.model('Appointment', appointmentSchema);

