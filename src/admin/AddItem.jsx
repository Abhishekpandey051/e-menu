import { useState } from 'react';
import { Plus } from 'lucide-react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import swal from 'sweetalert';
import { ClipLoader } from 'react-spinners';

function AddItem() {
  const [item, setItem] = useState({
    name: '',
    description: '',
    imageUrl: '',
    h_price: '',
    price:'',
    rating: '',
  });
const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true)

  try {
    
    const itemData = {
      ...item,
      price: parseFloat(item.price),
      rating: parseFloat(item.rating),
      createdAt: new Date()
    };

    if (item.h_price !== '') {
      itemData.h_price = parseFloat(item.h_price);
    }

    
  console.log(itemData);
  
    await addDoc(collection(db, "menu-item"), itemData);

    swal({
      title: "Success!",
      text: "Item added successfully!",
      icon: "success",
      timer: 2000,
      buttons: false
    });

    setItem({
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      rating: ''
    });
    setLoading(false)
  } catch (e) {
    console.error("Error adding document: ", e);
    swal("Error", "Failed to add item. Try again.", "error");
  }
};


  return (
    <div className="pt-24 pb-32 px-4 bg-gradient-to-br from-[#1F1C2C] to-[#928DAB] min-h-[calc(100vh-160px)] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-10 bg-white/10 border border-white/30 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-3xl text-white"
      >
        <div className="flex items-center gap-3 mb-8 justify-center">
          <Plus size={28} className="text-pink-400 drop-shadow" />
          <h2 className="text-4xl font-bold tracking-wide">Add New Item</h2>
        </div>

        {/* Item Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Item Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Chocolate Cake"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            rows="3"
            required
            placeholder="Write something delicious..."
            value={item.description}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner"
          />
        </div>

        {/* Image URL */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="url"
            required
            placeholder="https://image-link.jpg"
            value={item.imageUrl}
            onChange={(e) => setItem({ ...item, imageUrl: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner"
          />
        </div>

        {/*Price */}
        <div className="mb-6">
         <label className="block text-sm font-medium mb-2">Price</label>
             <input
              type="number"
              step="0.01"
              placeholder="e.g. 299.00"
              value={item.price}
              onChange={(e) => setItem({ ...item, price: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner"
            />
        </div>

       

        {/* Price and rating */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Half Price</label>
             <input
              type="number"
              step="0.01"
              placeholder="e.g. 299.00"
              value={item.h_price}
              onChange={(e) => setItem({ ...item, h_price: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner"
            />
           
          </div>

          <div>
           <label className="block text-sm font-medium mb-2">Rating</label>
          <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              required
              placeholder="e.g. 4.8"
              value={item.rating}
              onChange={(e) => setItem({ ...item, rating: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-pink-500 hover:bg-pink-600 transition-all duration-300 text-white font-semibold text-lg rounded-xl shadow-lg hover:scale-105"
        >
          {loading ? <ClipLoader loading={loading} size={25} color="white" /> : 'Add Item'}
        </button>
      </form>
    </div>
  );
}

export default AddItem;
