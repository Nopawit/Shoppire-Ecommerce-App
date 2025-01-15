import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { FaHeart, FaPlus, FaStar, FaStarHalf, FaStarHalfStroke, FaTruckFast } from "react-icons/fa6"
import { TbShoppingBagPlus } from "react-icons/tb";
import Footer from "../components/Footer";



const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProduct(item);
        setImage(item.image[0]);
        // console.log(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);


  return product ? (
    <section>
      <div className="max-padd-container mt-6">
        {/* Product Data */}
        <div className="max-padd-container flex gap-12 flex-col xl:flex-row bg-white py-16 rounded-2xl">
          {/* Product Image */}
          <div className="flex flex-1 gap-x-2 xl:flex-1">
            <div className="flexCenter flex-col gap-[7px] flex-wrap">
              {product.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  alt=""
                  className="max-h-[89px] rounded-lg bg-gray-10"
                />
              ))}
            </div>
            <div className="max-h-[377px] w-auto flex">
              <img src={image} alt="" className="rounded-xl bg-gray-10" />
            </div>
          </div>
          {/* Product info */}
          <div className="flex-[1.5] rounded-2xl px-7">
            <h3 className="h3 !my-2.5">{product.name}</h3>
            {/* Rating & Price */}
            <div className="flex items-baseline gap-x-5">
              <h3 className="h3">
                {currency}
                {product.price}.00
              </h3>
              <div className="flex items-center gap-x-2 text-secondary mb-2">
                <div className="flex gap-x-2 text-secondary text-xl">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfStroke />
                </div>
                <span>(122)</span>
              </div>
            </div>
            <p>{product.description}</p>
            <div className="flex flex-col gap-4 my-4 mb-5">
              <div className="flex gap-2">
                {[...product.sizes].sort((a, b) => {
                  const order = ["S", "M", "L", "XL", "XXL"];
                  return order.indexOf(a) - order.indexOf(b);
                }).map((item, i) => (
                  <button
                    onClick={() => setSize(item)}
                    key={i}
                    className={`${item === size ? "bg-tertiary text-white" : "border-slate-900/5"
                      } border-[1.5px] border-tertiary h-8 w-10 bg-primary rounded-md`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <button onClick={() => addToCart(product._id, size)} className="btn-dark w-1/2 flexCenter gap-x-2 capitalize">
                Add to cart
                <TbShoppingBagPlus className="text-lg" />
              </button>
              <button className="btn-light">
                <FaHeart />
              </button>
            </div>
            <div className="flex items-center gap-x-2 mt-2">
              <FaTruckFast className="text-lg" />
              <span className="medium-14">Free Delivery on orders over 500$</span>
            </div>
            <hr className="my-4 w-2/3" />
            <div className="mt-2 flex flex-col gap-1">
              <p>Authenticity You Can Trust</p>
              <p>Enjoy Cash on Delivery for Your Convenience</p>
              <p>Easy Returns and Exchanges Within 7 Days</p>
            </div>

          </div>
        </div>
        <RelatedProducts category={product.category} subCategory={product.subCategory} />
      </div>
      <Footer />
    </section>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
