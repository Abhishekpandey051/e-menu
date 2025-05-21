import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

function MenuItemCard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "menu-item"));
        const fetchedItems = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push({ id: doc.id, ...doc.data() });
        });
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="pt-24 pb-40 bg-gradient-to-br from-[#1F1C2C] to-[#928DAB] px-6 md:px-12 min-h-[140vh]">

      <h1 className="text-4xl font-bold text-white text-center mb-10">🍽️ Our Special Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-2xl duration-300 text-white"
          >
            {/* Image */}
            <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden relative">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              {item.rating && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-black font-semibold text-xs px-3 py-1 rounded-full shadow-md">
                  ⭐ {item.rating}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
              <p className="text-sm text-white/80 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-pink-400">₹{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItemCard;
