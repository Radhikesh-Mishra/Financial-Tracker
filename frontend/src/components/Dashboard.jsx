import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, setBudgetLimit } from "../action/AuthAction";
import { useNavigate } from "react-router-dom";
import Expenses from "./Expenses";
import Report from "./Report";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [overBudgetCategories, setOverBudgetCategories] = useState([]);
  const [limit, setLimit] = useState({});
  const [showLimitModal, setShowLimitModal] = useState(false);


  useEffect(() => {
    if (user?.budget) {
      const budgetLimits = {};
      for (const [category, values] of Object.entries(user.budget)) {
        if ( category !== '_id')
          budgetLimits[category] = values.limit || 0;
      }
      setLimit(budgetLimits);
    }

  }, [user, dispatch]);


  useEffect(() => {
    if (user?.budget) {
      const categories = Object.entries(user.budget);
      const exceeding = categories
        .filter(([_, value]) => value.limit > 0 && value.spent / value.limit > 0.8)
        .map(([key]) => key);
      setOverBudgetCategories(exceeding);
    }
  }, [user, dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false);
    await handleLogout();
  };

  const handleSetLimit = async () => {
    try {
      dispatch(setBudgetLimit(limit, user._id));
      setShowLimitModal(false);
    } catch (err) {
      console.error("Error setting limits:", err);
    }
    console.log("Setting limits:", limit, "for user:", user._id);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 text-gray-800">
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-10">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">
          💰 Financial Tracker
        </h1>
        <div>
          {user ? (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg font-semibold shadow-md"
            >
              Logout
            </button>
          ) : (
            <button className="text-blue-600 hover:underline">Login</button>
          )}
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center px-4 py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Welcome, <span className="text-violet-600">{user.username}</span>!
        </h2>
        <p className="text-lg md:text-xl font-medium max-w-xl">
          This is your personal{" "}
          <span className="text-rose-500 font-bold">Financial Tracker</span> where you can manage expenses, track goals, and plan your future smartly.
        </p>
      </section>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowLimitModal(true)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow"
        >
          ⚙️ Set Category Limits
        </button>
      </div>

      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
              Set Category Limits
            </h2>
            <form className="space-y-4">
              {Object.entries(limit).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <label className="capitalize w-1/2">{key}</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      setLimit((prev) => ({
                        ...prev,
                        [key]: Number(e.target.value),
                      }))
                    }
                    className="w-1/2 p-2 border border-gray-300 rounded"
                    min={0}
                  />
                </div>
              ))}
            </form>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowLimitModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={
                  handleSetLimit
                }
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save Limits
              </button>
            </div>
          </div>
        </div>
      )}


      {overBudgetCategories.length > 0 && (
        <div className="max-w-4xl mx-auto mb-6 px-6 py-4 bg-red-100 border border-red-300 text-red-800 rounded-lg shadow-md animate-pulse">
          <p className="font-semibold mb-1">
            ⚠️ Alert: You're about to exceed the budget in the following categories:
          </p>
          <ul className="list-disc list-inside">
            {overBudgetCategories.map((cat) => (
              <li key={cat} className="capitalize">
                {cat} — {user.budget[cat].spent}/{user.budget[cat].limit}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Report />

      <Expenses />

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300">
          <div className="relative w-full max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-2xl text-black scale-100 transition-all animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-center">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
