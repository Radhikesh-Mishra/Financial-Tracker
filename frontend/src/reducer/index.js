import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ExpenseReducer from './ExpenseReducer';

export const reducers = combineReducers({
    auth: AuthReducer,
    expense: ExpenseReducer
});