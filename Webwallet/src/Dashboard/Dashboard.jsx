import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For downloading CSV files
import jsPDF from "jspdf"; // For generating PDF

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, budgetsRes, transactionsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/budgets"),
          axios.get("http://localhost:5000/api/transactions"),
        ]);

        setCategories(categoriesRes.data);
        setBudgets(budgetsRes.data);
        setTransactions(transactionsRes.data);
      } catch (error) {
        console.error("Error fetching categories or budgets:", error);
      }
    };

    fetchData();
  }, []);

  const generateReport = async () => {
    setLoading(true);
    try {
      const transactionsRes = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          params: { startDate, endDate },
        }
      );
      const report = {
        transactions: transactionsRes.data,
        categories,
        budgets,
      };
      setReportData(report);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Report", 20, 10);

    const transactionsText = reportData.transactions
      .map(
        (transaction) =>
          `ID: ${transaction._id}, Amount: ${transaction.amount}, Type: ${transaction.type}, Account: ${transaction.account}, Category: ${transaction.category.name}, Date: ${transaction.date}`
      )
      .join("\n");
    doc.text("Transactions:", 20, 20);
    doc.text(transactionsText, 20, 30);

    const budgetsText = reportData.budgets
      .map(
        (budget) =>
          `ID: ${budget._id}, TotalBudget: ${budget.totalBudget}, Date: ${budget.date}`
      )
      .join("\n");
    doc.text("Budgets:", 20, 100);
    doc.text(budgetsText, 20, 110);

    const categoriesText = reportData.categories
      .map(
        (category) =>
          `ID: ${category._id}, Name: ${category.name}, ParentCategory: ${
            category.parentCategory || "N/A"
          }`
      )
      .join("\n");
    doc.text("Categories:", 20, 180);
    doc.text(categoriesText, 20, 190);

    doc.save("report.pdf");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-[#FADADD]  text-center rounded-lg shadow">
          <h3 className="text-lg font-semibold">Transactions</h3>
          <p className="text-2xl">{transactions.length}</p>
        </div>
        <div className="p-6 bg-[#FADADD]  text-center rounded-lg shadow">
          <h3 className="text-lg font-semibold">Categories</h3>
          <p className="text-2xl">{categories.length}</p>
        </div>
        <div className="p-6 bg-[#FADADD] text-center rounded-lg shadow">
          <h3 className="text-lg font-semibold">Budgets</h3>
          <p className="text-2xl">{budgets.length}</p>
        </div>
      </div>

      {/* Report Generator */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">Generate Report</h3>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />
          <button
            onClick={generateReport}
            className="bg-[#FADADD] px-4 py-2 rounded w-full md:w-auto"
          >
            Generate Report
          </button>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Generating report...</div>
        ) : (
          reportData.transactions &&
          reportData.transactions.length > 0 && (
            <div>
      
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={generatePDF}
                  className="bg-red-600  px-4 py-2 rounded"
                >
                  Download PDF
                </button>
                <CSVLink
                  data={reportData.transactions}
                  filename={"transactions.csv"}
                  className="bg-green-600   px-4 py-2 rounded"
                >
                  Download CSV
                </CSVLink>
              </div>
            </div>
          )
        )}
      </div>

      {/* Data Export Section */}
    </div>
  );
}

export default Dashboard;
