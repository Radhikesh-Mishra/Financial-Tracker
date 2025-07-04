import * as ExpenseApi from '../api/ExpenseApi';

export const addExpense = (userId, formData) => async (dispatch) => {
  try {
    const { data } = await ExpenseApi.addExpense(userId, formData);
    dispatch({ type: 'ADD_EXPENSE', payload: data });
  } catch (error) {
    console.error("Error adding expense:", error);
  }
}

export const getAllExpenses = (userId) => async (dispatch) => {
  try {
    const { data } = await ExpenseApi.getAllExpenses(userId);
    dispatch({ type: 'GET_ALL_EXPENSES', payload: data });
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
}

export const editExpense = (expenseId, userId, formData) => async (dispatch) => {
  try {
    const { data } = await ExpenseApi.editExpense(expenseId, userId, formData);
    dispatch({ type: 'EDIT_EXPENSE', payload: data });
  } catch (error) {
    console.error("Error editing expense:", error);
  }
}

export const deleteExpense = (expenseId, userId) => async (dispatch) => {
  try {
    const { data } = await ExpenseApi.deleteExpense(expenseId, userId);
    dispatch({ type: 'DELETE_EXPENSE', payload: data });
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
}