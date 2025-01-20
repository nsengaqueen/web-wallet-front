import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Report() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetching the transaction data
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/transactions"
        );
        if (response.status === 200) {
          setTransactions(response.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    };

    fetchTransactions();
  }, []);

  // Summarize the transactions by category (Income and Expense per category)
  const summarizeTransactionsByCategory = () => {
    const categories = {};

    transactions.forEach((transaction) => {
      const category = transaction.category.name;
      if (!categories[category]) {
        categories[category] = { income: 0, expense: 0 };
      }

      if (transaction.type === "income") {
        categories[category].income += transaction.amount;
      } else {
        categories[category].expense += transaction.amount;
      }
    });

    const categoryNames = Object.keys(categories);
    const incomeData = categoryNames.map((cat) => categories[cat].income);
    const expenseData = categoryNames.map((cat) => categories[cat].expense);

    return { categoryNames, incomeData, expenseData };
  };

  const { categoryNames, incomeData, expenseData } =
    summarizeTransactionsByCategory();

  const chartData = {
    labels: categoryNames,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "rgba(255, 159, 64, 0.7)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#4A5568",
        },
      },
      title: {
        display: true,
        text: "Income vs Expense by Category",
        font: {
          size: 18,
          weight: "bold",
        },
        color: "#2D3748",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4A5568",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#4A5568",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
      },
    },
  };

  return (
    <div className="p-8 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold ">
          Transaction Report by Category
        </h2>
        <p>
          Visualize your income and expenses grouped by category.
        </p>
      </div>

      {/* Chart Container */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        {categoryNames.length ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <div className="text-center text-gray-500 font-medium">
            No transaction data available to display.
          </div>
        )}
      </div>
    </div>
  );
}

export default Report;
