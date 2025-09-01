import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import ProductGrid2 from "../Gemstones/Gemstones2";

const categories = ["NEW ARRIVALS", "JEWELLERY", "ANTIQUES", "GEMSTONES"];

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState("NEW ARRIVALS");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
  }, []);

  useEffect(() => {
    if (activeCategory !== "GEMSTONES") {
      fetchProducts(activeCategory);
    }
  }, [activeCategory]);

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      let url =
        category === "NEW ARRIVALS"
          ? "https://antiques.minnaminnie.com/get_products.php"
          : `https://antiques.minnaminnie.com/get_products_by_category.php?category=${encodeURIComponent(
              category
            )}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.status === "success" && Array.isArray(data.data)) {
        let products = data.data;

        if (category === "NEW ARRIVALS") {
          // ✅ pick 1 product after each 2nd
          products = products.filter((_, index) => (index + 1) % 2 === 0);
        }

        setProducts(products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
    setLoading(false);
  };

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
    alert(`${product.title} added to cart!`);
  };

  const navigate = useNavigate();

  const handleSeeDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="px-6 md:px-12 py-12 overflow-hidden">
      {/* Subtitle */}
      <p
        className="text-center text-sm font-semibold tracking-wider uppercase"
        data-aos="fade-up"
      >
        Pakistan's No. 1 Online Decor Store
      </p>

      {/* Title */}
      <h2
        className="text-center text-5xl font-bold mt-2 mb-8 lg:pt-3"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Collection
      </h2>

      {/* Tabs */}
      <div
        className="flex justify-center lg:mb-5"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="flex justify-center space-x-4 lg:space-x-8 border-b border-gray-200 mb-5 lg:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-2 lg:text-base text-xs font-semibold ${
                activeCategory === cat
                  ? "border-b-2 border-yellow-600 text-yellow-600"
                  : "text-gray-500 hover:text-yellow-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {activeCategory === "GEMSTONES" ? (
        // ✅ Show your ProductGrid when GEMSTONES is active
        <ProductGrid2 />
      ) : loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="relative bg-slate-50 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              {/* New Tag - only for NEW ARRIVALS */}
              {activeCategory === "NEW ARRIVALS" && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </span>
              )}

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
