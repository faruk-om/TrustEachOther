const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
  sellerName: String,
  itemName: String,
  amount: Number,
  currency: {
    type: String,
    default: 'usd'
  },
  feeMode: {
    type: String,
    enum: ['buyer', 'seller', 'split'],
    default: 'split'
  },
  trackingNumber: String,
  trackingStatus: {
    type: String,
    default: 'Pending'
  },
  paid: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Deal', DealSchema);
