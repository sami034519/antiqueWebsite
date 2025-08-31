import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaSync,
  FaTrash,
  FaShoppingCart,
  FaGem,
  FaCrown,
  FaChessQueen,
} from "react-icons/fa";

export default function Dashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
  const [showUpdateFormModal, setShowUpdateFormModal] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    features: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { name: "Jewellery", products: 120, icon: <FaCrown size={30} /> },
    { name: "Antiques", products: 98, icon: <FaChessQueen size={30} /> },
    { name: "Gemstones", products: 75, icon: <FaGem size={30} /> },
  ];

  // handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Add Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const body = new FormData();
    Object.keys(formData).forEach((key) => {
      body.append(key, formData[key]);
    });

    try {
      const res = await fetch("https://antiques.minnaminnie.com/add_product.php", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Product added successfully!");
        setFormData({
          id: "",
          title: "",
          price: "",
          description: "",
          features: "",
          category: "",
          image: null,
        });

        setTimeout(() => {
          setShowAddModal(false);
          setMessage("");
        }, 2000);
      } else {
        setMessage("❌ Error: " + data.error);
      }
    } catch (error) {
      setMessage("❌ Network error: " + error.message);
    }

    setLoading(false);
  };

  // Fetch products by category
  const fetchProducts = async () => {
    if (!selectedCategory) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `https://antiques.minnaminnie.com/get_products_by_category.php?category=${selectedCategory}`
      );
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      } else {
        setMessage("❌ Error fetching products");
      }
    } catch (error) {
      setMessage("❌ Network error: " + error.message);
    }
    setLoading(false);
  };

  // Open update form with product details
  const handleOpenUpdateForm = (product) => {
    setFormData({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      features: product.features,
      category: product.category,
      image: null,
    });
    setShowUpdateFormModal(true);
  };

  // Update product
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const body = new FormData();
    Object.keys(formData).forEach((key) => {
      body.append(key, formData[key]);
    });

    try {
      const res = await fetch("https://antiques.minnaminnie.com/update_product.php", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Product updated successfully!");
        setTimeout(() => {
          setShowUpdateFormModal(false);
          setMessage("");
          fetchProducts(); // refresh products
        }, 2000);
      } else {
        setMessage("❌ Error: " + data.error);
      }
    } catch (error) {
      setMessage("❌ Network error: " + error.message);
    }

    setLoading(false);
  };

  // Delete product
  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  setLoading(true);
  setMessage("");

  try {
    const res = await fetch("https://antiques.minnaminnie.com/delete_product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (res.ok && data.status === "success") {
      setMessage("✅ Product deleted successfully!");
      fetchProducts();
    } else {
      setMessage("❌ Error: " + (data.message || "Something went wrong"));
    }
  } catch (error) {
    setMessage("❌ Network error: " + error.message);
  }

  setLoading(false);
};


  return (
    <div className="min-h-screen bg-[#0e1325] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0b0f1e] p-6 flex flex-col">
        <div className="mb-8">
          <NavLink to="/">
            <h2 className="text-2xl font-bold text-purple-400">BACK</h2>
          </NavLink>
        </div>
        <nav className="space-y-4">
          <MenuItem icon={<FaHome />} label="Dashboard" active />
          <MenuItem icon={<FaPlus />} label="Add Product" onClick={() => setShowAddModal(true)} />
          <MenuItem icon={<FaSync />} label="Update" onClick={() => setShowUpdateCategoryModal(true)} />
          <MenuItem icon={<FaTrash />} label="Delete" onClick={() => setShowDeleteCategoryModal(true)} />
          <MenuItem icon={<FaShoppingCart />} label="Orders" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">ADMIN DASHBOARD</h1>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-purple-500 rounded-lg p-6 text-center shadow-lg hover:scale-105 transition"
            >
              <div className="flex justify-center mb-4">{cat.icon}</div>
              <h2 className="text-xl font-semibold">{cat.name}</h2>
              <p className="mt-2">{cat.products} PRODUCTS</p>
            </div>
          ))}
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)} title="Add Product">
          {message && <p className="mb-2 text-red-500">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="features" placeholder="Features" value={formData.features} onChange={handleChange} className="w-full p-2 border rounded" required />
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" required>
              <option value="">Select Category</option>
              <option value="Jewellery">Jewellery</option>
              <option value="Antiques">Antiques</option>
              <option value="Gemstones">Gemstones</option>
            </select>
            <input type="file" name="image" onChange={handleChange} className="w-full p-2 border rounded" required />
            <div className="flex justify-end gap-3">
              <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button type="submit" disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Category Select for Update */}
      {showUpdateCategoryModal && (
        <Modal onClose={() => setShowUpdateCategoryModal(false)} title="Select Category to Update">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select Category</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Antiques">Antiques</option>
            <option value="Gemstones">Gemstones</option>
          </select>
          <button onClick={fetchProducts} className="w-full bg-purple-600 text-white py-2 rounded">
            {loading ? "Loading..." : "Fetch Products"}
          </button>

          <div className="mt-4 max-h-60 overflow-y-auto">
            {products?.data?.map((p) => (
              <div key={p.id} className="flex justify-between items-center p-2 border-b">
                <img src={p.image} alt={p.title} className="w-16 h-16 object-contain rounded" />
                <span>{p.title}</span>
                <span>{p.price}</span>
                <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => handleOpenUpdateForm(p)}>
                  Update
                </button>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Update Form Modal */}
      {showUpdateFormModal && (
        <Modal onClose={() => setShowUpdateFormModal(false)} title="Update Product">
          {message && <p className="mb-2 text-red-500">{message}</p>}
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="features" placeholder="Features" value={formData.features} onChange={handleChange} className="w-full p-2 border rounded" required />
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" required>
              <option value="Jewellery">Jewellery</option>
              <option value="Antiques">Antiques</option>
              <option value="Gemstones">Gemstones</option>
            </select>
            <input type="file" name="image" onChange={handleChange} className="w-full p-2 border rounded" />
            <div className="flex justify-end gap-3">
              <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setShowUpdateFormModal(false)}>Cancel</button>
              <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Category Select for Delete */}
      {showDeleteCategoryModal && (
        <Modal onClose={() => setShowDeleteCategoryModal(false)} title="Select Category to Delete">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select Category</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Antiques">Antiques</option>
            <option value="Gemstones">Gemstones</option>
          </select>
          <button onClick={fetchProducts} className="w-full bg-red-600 text-white py-2 rounded">
            {loading ? "Loading..." : "Fetch Products"}
          </button>

          <div className="mt-4 max-h-60 overflow-y-auto">
            {products?.data?.map((p) => (
              <div key={p.id} className="flex justify-between items-center p-2 border-b">
                <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded" />
                <span>{p.title}</span>
                <span>{p.price}</span>
                <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => handleDelete(p.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

// Generic Modal Component
function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg w-full max-w-lg p-6 shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          ✖
        </button>
      </div>
    </div>
  );
}

// Sidebar Menu Item
function MenuItem({ icon, label, active, onClick }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
        active ? "bg-pink-500 text-white" : "text-gray-300 hover:bg-gray-700"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
