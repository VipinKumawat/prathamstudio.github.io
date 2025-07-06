import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function CustomerHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.error("Error:", error);
    else setProducts(data);
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-green-600 font-bold">₹{product.price}</p>
            <a
              href={`https://wa.me/9722609460?text=Hi, I want to order: ${product.name} – ₹${product.price}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Order on WhatsApp
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerHome;
