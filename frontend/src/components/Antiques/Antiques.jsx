import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";     // 👈 import Redux hook
import { addToCart } from "../redux/Cartslice";  // 👈 import cart action

export default function Antiques() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();   // 👈 get dispatch function
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
    fetchAntiques();
  }, []);

  const fetchAntiques = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://antiques.minnaminnie.com/get_products_by_category.php?category=${encodeURIComponent(
          "ANTIQUES"
        )}`
      );
      const data = await res.json();

      if (data.status === "success" && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching antiques:", error);
      setProducts([]);
    }
    setLoading(false);
  };

  const handleAddToCart = (product) => {
    // Dispatch product to Redux cart
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: Number(product.price),  // ensure it's a number
        image: product.image,
      })
    );

    alert(`${product.title} added to cart!`);
  };

  const handleSeeDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="px-6 md:px-12 mt-20 py-12 overflow-hidden">
      {/* Subtitle */}
      <p
        className="text-center text-sm font-semibold tracking-wider uppercase"
        data-aos="fade-up"
      >
        Timeless & Classic
      </p>

      {/* Title */}
      <h2
        className="text-center text-5xl font-bold mt-2 mb-8 lg:pt-3"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Antiques Collection
      </h2>

      {/* Product Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading antiques...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No antiques found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="relative bg-slate-50 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-contain"
              />

              {/* Product Info */}
              <div className="p-3 text-center">
                <p className="text-sm font-medium">{product.title}</p>
                <p className="text-yellow-600 font-semibold">
                  Rs. {product.price}
                </p>

                <div className="mt-3 flex justify-center space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-yellow-600 text-white text-xs px-3 py-1 rounded hover:bg-yellow-700 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleSeeDetail(product.id)}
                    className="bg-gray-200 text-xs px-3 py-1 rounded hover:bg-gray-300 transition"
                  >
                    See Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
