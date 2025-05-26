import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import ShimmerUi from './ShimmerUi';

function MenuItemCard() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "menu-item"));
        const fetchedItems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(fetchedItems);
        setFilteredItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredItems(items);
      return;
    }

    const keywords = search.toLowerCase().split(" ");
    const smartMatch = (text) => {
      if (!text) return false;
      const lowerText = text.toLowerCase();
      return keywords.some((kw) =>
        lowerText.includes(kw) ||
        (kw === "spice" && lowerText.includes("spicy")) ||
        (kw === "hot" && lowerText.includes("spicy")) ||
        (kw === "cold" && lowerText.includes("chilled")) ||
        (kw === "drink" && lowerText.includes("juice"))
      );
    };

    const matched = items.filter((item) =>
      smartMatch(item.name) || smartMatch(item.description)
    );

    setFilteredItems(matched);
  }, [search, items]);

  return (
    <div className="pt-24 pb-40 bg-gradient-to-br from-[#1F1C2C] to-[#928DAB] px-6 md:px-12 min-h-[140vh]">
      <h1 className="text-4xl font-bold text-white text-center mb-6">🍽️ Our Special Menu</h1>

      {/* Search Input */}
      <div className="max-w-xl mx-auto mb-10 relative">
        <input
          type="text"
          placeholder="Search e.g. spice, drink, veg..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full shadow-lg bg-white text-black text-base focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
          🔍
        </span>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <ShimmerUi key={i} />)
        ) : filteredItems.length === 0 ? (
          <p className="text-white text-center col-span-full text-xl">No items found.</p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-2xl duration-300 text-white"
            >
              <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                {item.rating && (
                  <div className="absolute top-3 right-3 bg-pink-400 text-black font-semibold text-xs px-3 py-1 rounded-full shadow-md">
                    ⭐ {item.rating}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                <p className="text-sm text-white/80 mb-4">{item.description}</p>

                <div className="flex justify-between items-center">
                  {item.h_price ? (
                    <div className="text-sm space-y-1">
                      {item.h_price && (
                        <div>
                          <div>
                            <span className="text-white/80 text-lg font-semibold">Full: </span>
                            <span className="text-pink-400 font-semibold text-lg">₹{item.price}</span>
                          </div>
                          <div>
                            <span className="text-white/80 text-lg font-semibold">Half: </span>
                            <span className="text-pink-400 font-semibold text-lg">₹{item.h_price}</span>
                          </div>
                        </div>
                      )}

                    </div>
                  ) : (
                    <span className="text-lg font-semibold text-pink-400">
                      ₹{item.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MenuItemCard;
