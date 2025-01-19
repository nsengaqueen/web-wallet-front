import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineFilterAlt } from "react-icons/md";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "account", headerName: "Account", width: 200 },
  { field: "category", headerName: "Category", width: 150 },
  { field: "type", headerName: "Type", width: 100 },
  { field: "amount", headerName: "Amount", width: 120 },
  { field: "date", headerName: "Date", width: 150 },
];

function TransactionDash() {
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [transactionData, setTransactionData] = useState({
    amount: "",
    type: "expense",
    account: "bank",
    category: "",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/transactions");
        if (response.status === 200) {
          const data = response.data.map((transaction, index) => ({
            ...transaction,
            id: index + 1,
            category: transaction.category.name,
          }));
          setRows(data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchTransactions();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTransaction = async () => {
    try {
      await axios.post("http://localhost:5000/api/transactions", transactionData);
      alert("Transaction added successfully!");
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding transaction:", error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-[#0A1F95]">Transactions</h2>
        <div className="flex items-center space-x-4">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-sm font-medium text-white px-4 py-2 rounded-md transition"
            onClick={() => setModalOpen(true)}
          >
            Add Transaction
          </button>
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-white shadow rounded-lg p-4">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[2, 5, 10, 25]}
          pagination
          getRowId={(row) => row._id}
          className="min-h-[400px]"
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <h3 className="text-lg font-bold text-[#0A1F95] mb-4">Add Transaction</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={transactionData.amount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={transactionData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div>
                <label htmlFor="account" className="block text-sm font-medium text-gray-700">
                  Account
                </label>
                <select
                  id="account"
                  name="account"
                  value={transactionData.account}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="bank">Bank</option>
                  <option value="mobile money">Mobile Money</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={transactionData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTransaction}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionDash;
