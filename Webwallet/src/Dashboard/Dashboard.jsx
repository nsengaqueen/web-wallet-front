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

  // Fetching data when the component mounts
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

  // Handle the Quick Report generation
  const generateReport = async () => {
    setLoading(true);
    try {
      const transactionsRes = await axios.get("http://localhost:5000/api/transactions", {
        params: { startDate, endDate },
      });
      const report = {
        transactions: transactionsRes.data,
        categories,
        budgets,
      };
      setReportData(report);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  // Prepare report data for CSV download
  const prepareCSVData = () => {
    const transactionsCSV = reportData.transactions.map((transaction) => ({
      ID: transaction._id,
      Amount: transaction.amount,
      Type: transaction.type,
      Account: transaction.account,
      Category: transaction.category.name,
      Date: transaction.date,
    }));

    const budgetsCSV = reportData.budgets.map((budget) => ({
      ID: budget._id,
      TotalBudget: budget.totalBudget,
      Date: budget.date,
    }));

    const categoriesCSV = reportData.categories.map((category) => ({
      ID: category._id,
      Name: category.name,
      ParentCategory: category.parentCategory || "N/A",
    }));

    return [
      { label: "Transactions", data: transactionsCSV },
      { label: "Budgets", data: budgetsCSV },
      { label: "Categories", data: categoriesCSV },
    ];
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Report", 20, 10);

    const transactionsText = reportData.transactions.map((transaction) => 
      `ID: ${transaction._id}, Amount: ${transaction.amount}, Type: ${transaction.type}, Account: ${transaction.account}, Category: ${transaction.category.name}, Date: ${transaction.date}`).join("\n");
    doc.text("Transactions:", 20, 20);
    doc.text(transactionsText, 20, 30);

    const budgetsText = reportData.budgets.map((budget) => 
      `ID: ${budget._id}, TotalBudget: ${budget.totalBudget}, Date: ${budget.date}`).join("\n");
    doc.text("Budgets:", 20, 100);
    doc.text(budgetsText, 20, 110);

    const categoriesText = reportData.categories.map((category) => 
      `ID: ${category._id}, Name: ${category.name}, ParentCategory: ${category.parentCategory || "N/A"}`).join("\n");
    doc.text("Categories:", 20, 180);
    doc.text(categoriesText, 20, 190);

    doc.save("report.pdf");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-lg font-bold text-[#701f69] mb-4">Dashboard</h2>

      {/* Info Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="p-4 bg-[#d35ab7] text-white text-center rounded-md">
          <h3 className="text-xl font-semibold">Transactions</h3>
          <p>{transactions.length}</p>
        </div>
        <div className="p-4 bg-[#d35ab7] text-white text-center rounded-md">
          <h3 className="text-xl font-semibold">Categories</h3>
          <p>{categories.length}</p>
        </div>
        <div className="p-4 bg-[#d35ab7] text-white text-center rounded-md">
          <h3 className="text-xl font-semibold">Budgets</h3>
          <p>{budgets.length}</p>
        </div>
      </div>

      {/* Date Picker for Quick Report */}
      <div className="flex space-x-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <button
          onClick={generateReport}
          className="bg-[#d35ab7] text-white px-4 py-2 rounded"
        >
          Generate Report
        </button>
      </div>

      {/* Quick Report */}
      {loading ? (
        <div>Loading report...</div>
      ) : (
        <div>
          {reportData.transactions && reportData.transactions.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-[#682070]">Generated Report</h3>
              <div className="flex space-x-4 mt-2">
                {/* Generate PDF button */}
                <button
                  onClick={generatePDF}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Download PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
