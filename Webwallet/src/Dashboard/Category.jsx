import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineAddCircle } from "react-icons/md";

const columns = (handleDeleteCategory) => [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Category Name", width: 250 },
  { field: "parentCategory", headerName: "Parent Category", width: 250 },
  {
    field: "action",
    headerName: "Action",
    width: 180,
    renderCell: (params) => (
      <div className="flex space-x-2">
        <button
          className="px-3 py-1 bg-red-500 text-white  hover:bg-red-600 transition"
          onClick={() => handleDeleteCategory(params.row._id)}
        >
          Delete
        </button>
      </div>
    ),
  },
];

function Category() {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: "",
    parentCategory: "",
  });

  // Fetch categories from the server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        if (response.status === 200) {
          const data = response.data.map((category, index) => ({
            ...category,
            id: index + 1,
            parentCategory: category.parentCategory || "None",
          }));
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  // Handle input change for the Add Category modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new category to the server
  const handleSubmitCategory = async () => {
    try {
      await axios.post("http://localhost:5000/api/categories", categoryData);
      alert("Category added successfully!");
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding category:", error.message);
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/categories/${categoryId}`);
      alert("Category deleted successfully!");
      // Update the UI by removing the deleted category
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold ">Categories</h2>
        <button
          className="bg-[#FADADD] hover:bg-[#f4bbc1] px-5 py-2 rounded-lg flex items-center space-x-2 transition"
          onClick={() => setModalOpen(true)}
        >
          <MdOutlineAddCircle className="text-lg" />
          <span>Add Category</span>
        </button>
      </div>

      {/* DataGrid */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <DataGrid
          rows={categories}
          columns={columns(handleDeleteCategory)}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          className="min-h-[400px]"
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New Category</h3>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={categoryData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label
                  htmlFor="parentCategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Parent Category
                </label>
                <select
                  id="parentCategory"
                  name="parentCategory"
                  value={categoryData.parentCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select Parent Category (Optional)</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitCategory}
                className="bg-[#FADADD] px-4 py-2 rounded-lg hover:bg-[#eebdc2] transition"
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

export default Category;
