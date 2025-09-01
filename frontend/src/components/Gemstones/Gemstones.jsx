import React, { useState } from "react";
import vid1pic from '../../images/vid1pic.png'
import vid2pic from '../../images/vid2pic.png'
import vid3pic from '../../images/vid3pic.png'
import vid4pic from '../../images/vid4pic.png'
import vid5pic from '../../images/vid5pic.png'
import vid6pic from '../../images/vid6pic.png'
import vid7pic from '../../images/vid7pic.png'
import { FaPlayCircle } from "react-icons/fa";
const ProductGrid = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const products = [
    {
      id: 1,
      title: "Emerald and Diamond Ring",
      price: 1200,
      image: vid1pic,
      video: "https://www.youtube.com/embed/nKuOkfBz2aU"
    },
    {
      id: 2,
      title: "Classic Painting",
      price: 3000,
      image: vid2pic,
      video: "https://www.youtube.com/embed/k-scTpyVPWI"
    },
    {
      id: 3,
      title: "Vintage Clock",
      price: 2500,
      image: vid3pic,
      video: "https://www.youtube.com/embed/dnFHjAZuJJU"
    },
    {
      id: 4,
      title: "Vintage Clock",
      price: 2500,
      image: vid4pic,
      
      video: "https://www.youtube.com/embed/KxidWRu7OVA"
    },
    {
      id: 5,
      title: "Vintage Clock",
      price: 2500,
      image: vid5pic,
    
      video: "https://www.youtube.com/embed/I9ZClswwgCg?feature=share"
    },
    {
      id: 6,
      title: "Vintage Clock",
      price: 2500,
      image: vid6pic,
     
      video: "https://www.youtube.com/tqseHi2qYy0"
    },
    {
      id: 7,
      title: "Vintage Clock",
      price: 2500,
      image: vid7pic,
    
      video: "https://www.youtube.com/embed/XbJIdI-U-oM"
    }
  ];

  return (
   <div className="px-6 md:px-12 mt-20 py-12 overflow-hidden">
      {/* Subtitle */}
      <p
        className="text-center text-sm font-semibold tracking-wider uppercase"
        data-aos="fade-up"
      >
        Elegant & Premium
      </p>

      {/* Title */}
      <h2
        className="text-center text-5xl font-bold mt-2 mb-8 lg:pt-3"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Gemstones Collection
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="relative bg-slate-50 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            {/* Thumbnail or Video */}
            <div
              className="relative w-full h-60 cursor-pointer flex items-center justify-center bg-gray-100 overflow-hidden"
              onClick={() =>
                setActiveVideo(activeVideo === product.id ? null : product.id)
              }
            >
              {activeVideo === product.id ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={product.video}
                  title={product.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Video Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition">
                    <FaPlayCircle className="text-white text-5xl drop-shadow-lg" />
                  </div>
                </>
              )}
            </div>

            {/* Product Info */}
            <div className="p-3 text-center">
              <p className="text-sm font-medium">{product.title}</p>
              <p className="text-yellow-600 font-semibold">
                Rs. {product.price}
              </p>

              <div className="mt-3 flex justify-center space-x-2">
                <button className="bg-yellow-600 text-white text-xs px-3 py-1 rounded hover:bg-yellow-700 transition">
                  Add to Cart
                </button>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
