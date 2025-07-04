const initialState = {
  expenses: [], message: '', error: ''};

  const ExpenseReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_EXPENSE':
        return {
          ...state,
          expenses: [...state.expenses, action.payload],
          message: 'Expense added successfully',
          error: ''
        };

      case 'GET_ALL_EXPENSES':
        return {
          ...state,
          expenses: action.payload,
          message: 'Expenses fetched successfully',
          error: ''
        };

      case 'EDIT_EXPENSE':
        return {
          ...state,
          expenses: state.expenses.map(expense =>
            expense._id === action.payload._id ? action.payload : expense
          ),
          message: 'Expense edited successfully',
          error: ''
        };

      case 'DELETE_EXPENSE':
        return {
          ...state,
          expenses: state.expenses.filter(expense => expense._id !== action.payload._id),
          message: 'Expense deleted successfully',
          error: ''
        };

      default:
        return { ...state, message: 'Something went wrong', error: 'Unknown action type' };
    }
  }

  export default ExpenseReducer; 