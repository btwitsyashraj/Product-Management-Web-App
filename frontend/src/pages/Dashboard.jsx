import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const initialProducts = [
  { name: "Redmi Note 12", category: "Electronics", price: "₹14999", stock: 30, rating: 4.3 },
  { name: "HP Laptop", category: "Computers", price: "₹52999", stock: 15, rating: 4.1 },
  { name: "Nike Air Max", category: "Footwear", price: "₹8999", stock: 45, rating: 4.6 },
  { name: "Levi’s Jeans", category: "Clothing", price: "₹2499", stock: 60, rating: 4.2 },
  { name: "LG Smart TV", category: "Electronics", price: "₹38000", stock: 12, rating: 4.5 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [darkMode, setDarkMode] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    rating: "",
  });

  const totalProducts = products.length;
  const totalStock = products.reduce((acc, item) => acc + Number(item.stock), 0);
  const averagePrice = (() => {
    const prices = products.map(p => Number(p.price.replace(/[^\d]/g, "")));
    const total = prices.reduce((sum, p) => sum + p, 0);
    return prices.length ? `₹${Math.round(total / prices.length)}` : "₹0";
  })();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      navigate("/login");
    }

    const savedMode = localStorage.getItem("darkMode") === 'true';
    setDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);
  }, [navigate]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const { name, category, price, stock, rating } = newProduct;

    if (!name || !category || !price || !stock || !rating) {
      return alert("Please fill all fields!");
    }

    setProducts([...products, newProduct]);
    setNewProduct({ name: "", category: "", price: "", stock: "", rating: "" });
  };

  const handleDelete = (indexToDelete) => {
    const updated = products.filter((_, index) => index !== indexToDelete);
    setProducts(updated);
  };

  return (
    <>
      <nav>
        <h1>Product Dashboard</h1>
        <div>
          <button onClick={toggleDarkMode}>
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="dashboard-container">
        <h1 className="dashboard-title">Welcome to Your Inventory</h1>

        <section className="stats-box">
          <div><strong>Total Products:</strong> {totalProducts}</div>
          <div><strong>Total Stock:</strong> {totalStock}</div>
          <div><strong>Average Price:</strong> {averagePrice}</div>
        </section>

        <section className="add-product-form">
          <h2>Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <div className="form-grid">
              <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} />
              <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleChange} />
              <input type="text" name="price" placeholder="Price (₹)" value={newProduct.price} onChange={handleChange} />
              <input type="number" name="stock" placeholder="Stock" value={newProduct.stock} onChange={handleChange} />
              <input type="number" step="0.1" name="rating" placeholder="Rating" value={newProduct.rating} onChange={handleChange} />
            </div>
            <button type="submit">Add Product</button>
          </form>
        </section>

        <section className="chart-placeholder">
          <h2>Monthly Sales Chart</h2>
          <div className="chart-box">
            <p>(Sample chart placeholder)</p>
          </div>
        </section>

        <section className="product-table-section">
          <h2>Products Overview</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>{item.rating} ⭐</td>
                  <td>
                    <button onClick={() => handleDelete(index)}>❌ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
