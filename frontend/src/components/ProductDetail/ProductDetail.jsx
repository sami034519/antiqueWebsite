import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/Cartslice"; // adjust path

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://antiques.minnaminnie.com/get_product_by_id.php?id=${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: `https://antiques.minnaminnie.com/${product.image}`,
      })
    );
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found</p>;

  return (
    <div className="container mt-20 mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex justify-center">
        <img
          src={`https://antiques.minnaminnie.com/${product.image}`}
          alt={product.title}
          className="rounded-2xl shadow-lg max-h-[500px] object-contain"
        />
      </div>

      <div className="flex flex-col justify-center space-y-6">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="text-2xl font-semibold text-yellow-600">
          Rs. {product.price}
        </div>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        {product.features && (
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Features</h2>
            <p className="text-sm text-gray-600 whitespace-pre-line">
              {product.features}
            </p>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="relative w-full md:w-1/2 overflow-hidden bg-yellow-600 rounded-2xl shadow-md group"
        >
          <span className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-500 ease-in-out group-hover:w-full"></span>
          <span className="relative z-10 flex items-center justify-center py-3 px-6 font-medium text-white">
            🛒 Add to Cart
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
