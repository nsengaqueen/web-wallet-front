import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

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
    // Fetching transaction data
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/transactions");
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
    
    transactions.forEach(transaction => {
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
    const incomeData = categoryNames.map(cat => categories[cat].income);
    const expenseData = categoryNames.map(cat => categories[cat].expense);

    return { categoryNames, incomeData, expenseData };
  };

  const { categoryNames, incomeData, expenseData } = summarizeTransactionsByCategory();

  const chartData = {
    labels: categoryNames,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(0, 123, 255, 0.7)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-[#0A1F95]">Transaction Report by Category</h2>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
      </div>
    </div>
  );
}

export default Report;
