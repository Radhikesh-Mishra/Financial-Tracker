import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllExpenses,
  addExpense,
  editExpense,
  deleteExpense,
} from "../action/ExpenseAction";
// import { smartSuggestions } from "../action/FlaskAction";

const Expenses = () => {
  const expenseData = useSelector((state) => state.expense.expenses);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [ suggestion, setSuggestion ] = useState('');


  useEffect(() => {
    if (expenseData && Array.isArray(expenseData.expenses)) {
      setExpenses(expenseData.expenses);
    }
  }, [expenseData, dispatch, user]);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getAllExpenses(user._id));
    }
  }, [dispatch, user]);

//   useEffect(() => {
//   if (expenses.length > 0) {
//     dispatch(smartSuggestions(expenses))
//       .then((data) => {
        
//         setSuggestion(data.suggestions);
//       })
//       .catch((err) => {
//         console.error("Error while getting smart suggestions in component:", err);
//       });
//   }
// }, [expenses, dispatch]);


  const filteredExpenses = categoryFilter
    ? expenses.filter((expense) => expense.category === categoryFilter)
    : expenses;

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (expenseId) => {
    if (user && user._id && expenseId) {
      dispatch(deleteExpense(expenseId, user._id)).then(() =>
        dispatch(getAllExpenses(user._id))
      );
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setSelectedExpense({ ...selectedExpense, [name]: value });
  };

  const handleSave = () => {
    if (!user || !user._id || !selectedExpense) return;

    const { amount, category, date, paymentMethod, notes } = selectedExpense;
    const formData = { amount, category, date, paymentMethod, notes };

    if (isEditing) {
      dispatch(editExpense(selectedExpense._id, user._id, formData)).then(() =>
        dispatch(getAllExpenses(user._id))
      );
    } else {
      dispatch(addExpense(user._id, formData)).then(() =>
        dispatch(getAllExpenses(user._id))
      );
    }

    setShowModal(false);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        My Expenses
      </h2>
      {
        suggestion && (
          <div className="bg-blue-100 text-blue-800 p-4 rounded mb-4">
            <h3 className="font-semibold">Smart Suggestion</h3>
            { suggestion.map((item, index) => (
              <p key={index} className="text-sm">
                {item}
              </p>
))         }
          </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="categoryFilter" className="text-gray-700 font-medium">
            Filter by Category:
          </label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            {[
              "Food",
              "Rent",
              "Entertainment",
              "Travel",
              "Utilities",
              "Extras",
              "Shopping",
              "Health",
            ].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {categoryFilter && (
            <button
              onClick={() => setCategoryFilter("")}
              className="text-sm text-blue-600 underline hover:text-blue-800"
            >
              Reset
            </button>
          )}
        </div>

        <button
          onClick={() => {
            setSelectedExpense({
              amount: "",
              date: "",
              category: "",
              paymentMethod: "",
              notes: "",
            });
            setIsEditing(false);
            setShowModal(true);
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          + New Expense
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Spent On</th>
              <th className="py-3 px-6 text-left">Payment Method</th>
              <th className="py-3 px-6 text-left">Note</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, index) => (
                <tr
                  key={expense._id || index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">₹{expense.amount}</td>
                  <td className="py-3 px-6 text-left">{expense.category}</td>
                  <td className="py-3 px-6 text-left">{expense.paymentMethod}</td>
                  <td className="py-3 px-6 text-left">{expense.notes || "—"}</td>
                  <td className="py-3 px-6 text-left">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {isEditing ? "Edit Expense" : "Add New Expense"}
            </h3>

            <label className="block mb-2 text-sm text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={selectedExpense.amount}
              onChange={handleModalChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <label className="block mb-2 text-sm text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={
                selectedExpense.date
                  ? new Date(selectedExpense.date).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleModalChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <label className="block mb-2 text-sm text-gray-700">Category</label>
            <select
              name="category"
              value={selectedExpense.category}
              onChange={handleModalChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
              <option value="">-- Select Category --</option>
              {[
                "Food",
                "Rent",
                "Entertainment",
                "Travel",
                "Utilities",
                "Extras",
                "Shopping",
                "Health",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label className="block mb-2 text-sm text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={selectedExpense.paymentMethod}
              onChange={handleModalChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
              <option value="">-- Select Payment Method --</option>
              {["UPI", "Credit Card", "Debit Card", "Cash", "Net Banking", "Others"].map(
                (method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                )
              )}
            </select>

            <label className="block mb-2 text-sm text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={selectedExpense.notes}
              onChange={handleModalChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
