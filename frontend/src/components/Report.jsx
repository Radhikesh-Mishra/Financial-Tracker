import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaMoneyBillWave, FaCrown, FaWallet } from "react-icons/fa";
import SpendingsPieChart from "./SpendingsChart";

const Report = () => {
    const user = useSelector((state) => state.auth.user);
    const expenseData = useSelector((state) => state.expense.expenses);
    const [expenses, setExpenses] = useState([]);
    const [totalMoneySpent, setTotalMoneySpent] = useState(0);
    const [maxCategory, setMaxCategory] = useState("");
    const [preferredMethod, setPreferredMethod] = useState("");

    useEffect(() => {
        if (expenseData && Array.isArray(expenseData.expenses)) {
            setExpenses(expenseData.expenses);
        }
    }, [expenseData]);

    useEffect(() => {
        if (user?.budget) {
            let total = 0;
            let maxSpent = 0;
            let maxCat = "";

            for (const [category, values] of Object.entries(user.budget)) {
                total += Number(values.spent) || 0;
                if (values.spent > maxSpent) {
                    maxSpent = values.spent;
                    maxCat = category;
                }
            }

            setTotalMoneySpent(total);
            setMaxCategory(maxCat.charAt(0).toUpperCase() + maxCat.slice(1));
        }

        if (expenses.length > 0) {
            const methodCount = {};
            expenses.forEach((expense) => {
                const method = expense.paymentMethod;
                methodCount[method] = (methodCount[method] || 0) + 1;
            });

            let maxMethod = "";
            let maxCount = 0;
            for (const [method, count] of Object.entries(methodCount)) {
                if (count > maxCount) {
                    maxCount = count;
                    maxMethod = method;
                }
            }

            setPreferredMethod(maxMethod);
        }
    }, [user, expenses]);


    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">Expense Report Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center space-x-4 hover:scale-105 border border-indigo-100">
                    <FaMoneyBillWave className="text-green-500 text-4xl" />
                    <div>
                        <p className="text-lg font-semibold text-gray-700">Total Money Spent</p>
                        <p className="text-xl font-bold text-green-600">₹{totalMoneySpent}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center space-x-4 hover:scale-105 border border-indigo-100">
                    <FaCrown className="text-yellow-500 text-4xl" />
                    <div>
                        <p className="text-lg font-semibold text-gray-700">Highest Spending Category</p>
                        <p className="text-xl font-bold text-yellow-600">{maxCategory || "N/A"}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center space-x-4 hover:scale-105 border border-indigo-100">
                    <FaWallet className="text-purple-500 text-4xl" />
                    <div>
                        <p className="text-lg font-semibold text-gray-700">Preferred Payment Method</p>
                        <p className="text-xl font-bold text-purple-600">{preferredMethod || "N/A"}</p>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <SpendingsPieChart />
            </div>
        </div>
    );
};

export default Report;
