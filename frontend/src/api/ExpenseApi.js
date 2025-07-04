import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:9000' });

export const addExpense = ( userId, formData ) => API.post("/api/expenses", { userId, formData });

export const getAllExpenses = (userId) =>
  API.get(`/api/expenses?userId=${userId}`);


export const editExpense = ( expenseId, userId, formData ) => API.put('/api/expenses', { expenseId, userId, formData });

export const deleteExpense = (expenseId, userId) =>
  API.delete(`/api/expenses?expenseId=${expenseId}&userId=${userId}`);
