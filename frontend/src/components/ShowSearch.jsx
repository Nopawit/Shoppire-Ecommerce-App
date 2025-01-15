import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const ShowSearch = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location])

  return showSearch && visible ? (
    <section className="py-4 pb-7">
      <div className="text-center bg-primary/20">
        <div className="inline-flex items-center justify-center ring-1 ring-slate-900/15 px-3 py-1.5 rounded-full bg-primary overflow-hidden w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search here..."
            className="border-none outline-none w-full bg-primary text-sm"
          />
          <div className="bg-primary text-secondary">
            <FaSearch className="cursor-pointer" />
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default ShowSearch;
