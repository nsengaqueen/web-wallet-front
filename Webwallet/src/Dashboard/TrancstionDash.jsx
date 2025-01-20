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
        const response = await axios.get(
          "http://localhost:5000/api/transactions"
        );
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
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
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


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold  flex items-center">
          Transactions Summary{" "}
          <MdOutlineFilterAlt className="ml-2 text-xl text-gray-600 cursor-pointer" />
        </h2>
        
      </div>

      {/* Data Grid */}
      <div className="bg-white shadow rounded-lg p-6">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          pagination
          getRowId={(row) => row._id}
          className="min-h-[450px]"
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg relative">
           
            <form className="space-y-4">
             
            </form>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 px-5 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionDash;
