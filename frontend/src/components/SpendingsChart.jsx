import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

const SpendingsPieChart = () => {
  const user = useSelector((state) => state.auth.user);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (user?.budget) {
      const categories = Object.entries(user.budget);

      const labels = [];
      const values = [];

      for (const [category, { spent }] of categories) {
        if (category === "_id") continue;
        labels.push(category.charAt(0).toUpperCase() + category.slice(1));
        values.push(Number(spent) || 0); 
      }

      setChartData({
        labels,
        datasets: [
          {
            label: "Spending by Category",
            data: values,
            backgroundColor: [
              "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
              "#9966FF", "#FF9F40", "#FF6384", "#C9CBCF"
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [user]);

  if (!chartData) return null;

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-center mb-4 text-indigo-600">
        Spendings Breakdown by Category
      </h2>
      <Pie data={chartData} />
    </div>
  );
};

export default SpendingsPieChart;
