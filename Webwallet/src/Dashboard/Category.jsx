import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { MdOutlineAddCircle } from 'react-icons/md';

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Category Name", width: 200 },
  { field: "parentCategory", headerName: "Parent Category", width: 200 },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition"
            onClick={() => alert("Feature to delete category is under development.")}
          >
            Delete
          </button>
        </div>
      );
    }
  }
];

function Category() {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: '',
    parentCategory: ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        if (response.status === 200) {
          const data = response.data.map((category, index) => ({
            ...category,
            id: index + 1,
            parentCategory: category.parentCategory ? category.parentCategory : "None",
          }));
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-[#8e1d70]">Categories</h2>
        <div className="flex items-center space-x-4">
          <button
            className="bg-pink-500 hover:bg-pink-600 text-sm font-medium text-white px-4 py-2 rounded-md transition"
            onClick={() => setModalOpen(true)}
          >
            <MdOutlineAddCircle className="inline-block mr-2" /> Add Category
          </button>
        </div>
      </div>

      {/* Data Grid to display categories */}
      <div className="bg-white shadow rounded-lg p-4">
        <DataGrid
          rows={categories}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[2, 5, 10, 25]}
          pagination
          getRowId={(row) => row._id}
          className="min-h-[400px]"
        />
      </div>

      {/* Modal for Adding Category */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <h3 className="text-lg font-bold text-[#911d7b] mb-4">Add Category</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={categoryData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label htmlFor="parentCategory" className="block text-sm font-medium text-gray-700">
                  Parent Category
                </label>
                <select
                  id="parentCategory"
                  name="parentCategory"
                  value={categoryData.parentCategory}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
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
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitCategory}
                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
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
