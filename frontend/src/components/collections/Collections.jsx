import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const categories = ["NEW ARRIVALS", "JWELLERY", "ANTIQUES", "GEMSTONES"];

const products = [
  { id: 1, title: "Golden Birds", discount: 46, image: "/images/birds.jpg" },
  { id: 2, title: "Feather Wall Lamp", discount: 51, image: "/images/feather.jpg" },
  { id: 3, title: "Giraffe Sculpture", discount: 41, image: "/images/giraffe.jpg" },
  { id: 4, title: "Pink Wavy Mirror", discount: 35, image: "/images/mirror-pink.jpg" },
  { id: 5, title: "Red Wavy Mirror", discount: 36, image: "/images/mirror-red.jpg" },
  { id: 6, title: "Blue Wavy Mirror", discount: 35, image: "/images/mirror-blue.jpg" },
];

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState("NEW ARRIVALS");

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false});
  }, []);

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
      <div className="flex justify-center lg:mb-5" data-aos="fade-up" data-aos-delay="400">
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            data-aos="zoom-in"
            data-aos-delay={index * 100} // stagger animation
          >
            {/* Discount Badge */}
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              SAVE {product.discount}%
            </span>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 object-cover"
            />

            {/* Product Title */}
            <div className="p-3 text-center">
              <p className="text-sm font-medium">{product.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
