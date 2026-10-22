

import { useState } from "react";
import NavBar from "../ReUsables/NavBar";
import "../styles/addProduct.css";

const initialFormData = {
  name: "",
  price: "",
  image: "",
  category: "",
  description: "",
  stock: "",
  featured: false,
};

const AddProduct = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            price: Number(formData.price),
            image: formData.image,
            category: formData.category,
            description: formData.description,
            stock: Number(formData.stock),
            featured: formData.featured,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create product");
        return;
      }

      setMessage("Product added successfully!");

      setFormData({ ...initialFormData });
    } catch (error) {
      console.error("Create product error:", error);
      setError("Unable to connect to the server");
    }
  };

  return (
    <>
      <NavBar />

      <div className="add-product-page">
        <div className="add-product-card">
          <h2>Add New Product</h2>

          {message && (
            <p className="success-message">{message}</p>
          )}

          {error && (
            <p className="error-message">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL or path"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="Tech-Gudgets">
                  Computer Accessories
                </option>
                <option value="Beauty & Selfcare">
                  Beauty & Selfcare
                </option>
                <option value="Home-Decor">
                  Home Decors
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                id="stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                min="0"
                required
              />
            </div>

            {/* Featured Product Checkbox */}
            <div className="form-group featured-checkbox">
              <label htmlFor="featured">
                <input
                  id="featured"
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />

                <span>Show on Homepage as Featured</span>
              </label>

              <small>
                Select this option to display the product
                in the Featured Products section.
              </small>
            </div>

            <button type="submit">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

