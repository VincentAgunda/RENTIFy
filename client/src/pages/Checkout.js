import React from "react";
import { usePropertyContext } from "../context/PropertyContext";

function Checkout() {
  const { cart } = usePropertyContext();

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Checkout</h2>
      {cart.length > 0 ? (
        <div>
          <p className="text-center mb-4">You have {cart.length} items in your cart.</p>
          <button className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-all mx-auto block">
            Proceed to Payment
          </button>
        </div>
      ) : (
        <p className="text-center">Your cart is empty.</p>
      )}
    </div>
  );
}

export default Checkout;
