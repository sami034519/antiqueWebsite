import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/Cartslice"; // adjust path

export default function Jewellery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
    fetchJewellery();
  }, []);

  const fetchJewellery = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://antiques.minnaminnie.com/get_products_by_category.php?category=${encodeURIComponent(
          "JEWELLERY"
        )}`
      );
      const data = await res.json();

      if (data.status === "success" && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching jewellery:", error);
      setProducts([]);
    }
    setLoading(false);
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
      })
    );
  };

  const handleSeeDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="px-6 md:px-12 mt-20 py-12 overflow-hidden">
      <p
        className="text-center text-sm font-semibold tracking-wider uppercase"
        data-aos="fade-up"
      >
        Elegant & Premium
      </p>

      <h2
        className="text-center text-5xl font-bold mt-2 mb-8 lg:pt-3"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Jewellery Collection
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading jewellery...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No jewellery found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="relative bg-slate-50 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-contain"
              />

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
