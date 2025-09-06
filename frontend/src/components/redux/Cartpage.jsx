import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart } from "../redux/Cartslice";
import { selectCartTotalPrice } from "../redux/Cartslice"; // ✅ import selector

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector(selectCartTotalPrice); // ✅ calculate on the fly

  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="px-6 md:px-12 py-12 mt-20">
      <h2 className="text-3xl font-bold mb-6">🛍 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white shadow p-4 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-yellow-600 font-medium">
                    Rs. {item.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleIncrease(item)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-slate-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">Total: Rs. {totalPrice}</h3>
            <button
         
          className="relative w-full md:w-1/3 overflow-hidden bg-yellow-600 rounded-xl shadow-md group"
        >
          <span className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-500 ease-in-out group-hover:w-full"></span>
          <span className="relative z-10 flex items-center justify-center py-3 px-6 font-medium text-white">
            🛒 Proceed To CheckOut
          </span>
        </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
