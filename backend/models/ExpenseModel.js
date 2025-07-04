import { Schema, model } from 'mongoose';

const expenseSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Food', 'Rent', 'Entertainment', 'Travel', 'Utilities', 'Extras', 'Shopping', 'Health'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ['UPI', 'Credit Card', 'Debit Card', 'Cash', 'Net Banking', 'Others'],
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

const Expense = model('Expense', expenseSchema);
export default Expense;
