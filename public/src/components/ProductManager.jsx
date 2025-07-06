import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (!error) setProducts(data);
  }

  async function addProduct(e) {
    e.preventDefault();
    const { data, error } = await supabase.from("products").insert([form]);
    if (!error) {
      setForm({ name: "", price: "", image: "" });
      fetchProducts();
    }
  }

  async function deleteProduct(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) fetchProducts();
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛠️ Admin Panel – Manage Products</h2>

      <form onSubmit={addProduct} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          ➕ Add Product
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded mb-2"
            />
            <h3 className="font-bold">{product.name}</h3>
            <p>₹{product.price}</p>
            <button
              onClick={() => deleteProduct(product.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManager;
