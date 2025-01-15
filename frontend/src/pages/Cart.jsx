import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, getCartCount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const tempData = [];
    const initialQuantities = {};

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
          initialQuantities[`${items}-${item}`] = cartItems[items][item];
        }
      }
    }
    setCartData(tempData);
    setQuantities(initialQuantities);
  }, [cartItems]);

  const increment = (id, size) => {
    const key = `${id}-${size}`;
    const newValue = quantities[key] + 1;
    setQuantities(prev => ({ ...prev, [key]: newValue }));
    updateQuantity(id, size, newValue);
  };

  const decrement = (id, size) => {
    const key = `${id}-${size}`;
    if (quantities[key] > 1) {
      const newValue = quantities[key] - 1;
      setQuantities(prev => ({ ...prev, [key]: newValue }));
      updateQuantity(id, size, newValue);
    }
  };

  return (
    <section>
      <div className="max-padd-container">
        <div className="max-padd-container py-10 bg-white rounded-2xl my-6">
          <div className="flex items-baseline gap-x-4">
            <h3 className="h3">Cart <span className="text-secondary">List</span></h3>
            <p className="bold-20">({getCartCount()} items)</p>
          </div>
          <div className="mt-6">
            {cartData.map((item, i) => {
              const productData = products.find(product => product._id === item._id);
              const key = `${item._id}-${item.size}`;

              return (
                <div key={i} className="p-1 rounded-lg">
                  <div className="flex items-center gap-x-3">
                    <div className="flex items-start gap-6">
                      <img
                        src={productData.image[0]}
                        alt=""
                        className="w-16 sm:w-18 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flexBetween">
                        <h5 className="h5 !my-0 line-clamp-1">{productData.name}</h5>
                        <FaRegWindowClose onClick={() => updateQuantity(item._id, item.size, 0)} className="text-secondary"/>
                      </div>
                      <p className="bold-14 my-0.5">{item.size}</p>
                      <div className="flexBetween">
                        <div className="flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-primary">
                          <button onClick={() => decrement(item._id, item.size)} className="p-1.5 bg-white text-secondary rounded-full shadow-md">
                            <FaMinus className="text-xs" />
                          </button>
                          <p className="px-2">{quantities[key]}</p>
                          <button onClick={() => increment(item._id, item.size)} className="p-1.5 bg-white text-secondary rounded-full shadow-md">
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                        <h4 className="h4">
                          {currency}
                          {productData.price}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <hr className="mx-auto h-[1px] w-4/5 bg-gray-900/10 mt-2" />
                </div>
              );
            })}
          </div>
          <div className="flex my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <button onClick={() => navigate('/place-order')} className="btn-secondary mt-7">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Cart;
