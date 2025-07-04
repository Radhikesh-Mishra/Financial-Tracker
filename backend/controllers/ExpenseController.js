import Expense from "../models/ExpenseModel.js";
import User from "../models/userModel.js";

const getAllExpenses = async (req, res) => {
  const userId = req.query.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found or unauthorized" });
    }

    const expenses = await Expense.find({ userId: user._id }).sort({ date: -1 });

    return res.status(200).json({ expenses, message: "Expenses fetched successfully" });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const addExpense = async (req, res) => {
  const { userId, formData } = req.body;

  console.log("Add Expense Request:", req.body);

  if (!formData || !formData.amount || !formData.category || !formData.date || !formData.paymentMethod) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not authorized." });
    }

    const categoryKey = formData.category.toLowerCase();

    if (!user.budget[categoryKey]) {
      return res.status(400).json({ error: `Invalid budget category: ${categoryKey}` });
    }

    const newExpense = new Expense({
      amount: formData.amount,
      category: formData.category,
      date: formData.date,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
      userId: user._id,
    });

    user.budget[categoryKey].spent += Number(formData.amount);

    await user.save();
    const savedExpense = await newExpense.save();

    return res.status(201).json({ message: 'Expense added successfully.', savedExpense });

  } catch (err) {
    console.error('Error adding expense:', err);
    return res.status(500).json({ error: 'Something went wrong while adding the expense.' });
  }
};


const editExpense = async (req, res) => {
  const { expenseId, userId, formData } = req.body;

  if (!expenseId) {
    return res.status(400).json({ error: 'Expense ID is required.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not authorized.' });
    }

    const existingExpense = await Expense.findById(expenseId);
    if (!existingExpense) {
      return res.status(404).json({ error: 'Original expense not found.' });
    }

    const oldCategoryKey = existingExpense.category.toLowerCase();
    const newCategoryKey = formData.category.toLowerCase();
    const oldAmount = existingExpense.amount;
    const newAmount = Number(formData.amount);

    if (user.budget[oldCategoryKey]) {
      user.budget[oldCategoryKey].spent -= oldAmount;
    }

    if (!user.budget[newCategoryKey]) {
      return res.status(400).json({ error: `Invalid budget category: ${newCategoryKey}` });
    }
    user.budget[newCategoryKey].spent += newAmount;

    await user.save();

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      { $set: formData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ message: 'Expense updated successfully.', updatedExpense });
  } catch (error) {
    console.error('Error updating expense:', error);
    return res.status(500).json({ error: 'Something went wrong while updating the expense.' });
  }
};


const deleteExpense = async (req, res) => {
  const { expenseId, userId } = req.query;

  if (!expenseId) {
    return res.status(400).json({ error: 'Expense ID is required.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not authorized.' });
    }

    const expenseToDelete = await Expense.findById(expenseId);
    if (!expenseToDelete) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    const categoryKey = expenseToDelete.category.toLowerCase();
    const amount = expenseToDelete.amount;

    if (user.budget[categoryKey]) {
      user.budget[categoryKey].spent -= amount;
    }

    await user.save(); 

    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    return res.status(200).json({ message: 'Expense deleted successfully.', deletedExpense });
  } catch (error) {
    console.error('Error deleting expense:', error);
    return res.status(500).json({ error: 'Failed to delete expense.' });
  }
};


export { getAllExpenses, addExpense, editExpense, deleteExpense };
