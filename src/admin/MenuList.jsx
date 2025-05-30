import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import swal from "sweetalert";

function MenuList() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "", description: "" });

  // Fetch all items on load
  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "menu-item"));
      const data = [];
      querySnapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...docSnap.data() });
      });
      setItems(data);
    };

    fetchItems();
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(items[index]);
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "menu-item", editData.id);
      await updateDoc(docRef, {
        name: editData.name,
        price: editData.price,
        description: editData.description,
      });

      const updatedItems = [...items];
      updatedItems[editIndex] = editData;
      setItems(updatedItems);
      setEditIndex(null);

      await swal("Success!", "Item updated successfully.", "success");
    } catch (error) {
      console.error("Update error:", error);
      swal("Error", "Failed to update item.", "error");
    }
  };

  const handleDelete = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteDoc(doc(db, "menu-item", id));
          setItems(items.filter((item) => item.id !== id));
          swal("Deleted!", "Item has been deleted.", "success");
        } catch (error) {
          console.error("Delete error:", error);
          swal("Error", "Failed to delete item.", "error");
        }
      }
    });
  };

  return (
    <div className="pt-28 px-6 md:px-20 pb-20 bg-gradient-to-br from-[#1F1C2C] to-[#928DAB] text-white min-h-screen">
      {/* <h1 className="text-4xl font-bold mb-10 text-center text-pink-400">📋 Dashboard</h1> */}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/10 border border-white/20 rounded-xl overflow-hidden shadow-lg">
          <thead className="bg-pink-500 text-white text-left text-sm md:text-base">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id} className="border-t border-white/10 hover:bg-white/5">
                <td className="px-4 py-3">
                  {editIndex === idx ? (
                    <input
                      type="text"
                      className="w-full p-1 bg-white/10 text-white rounded"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="px-4 py-3">
                  {editIndex === idx ? (
                    <input
                      type="number"
                      className="w-full p-1 bg-white/10 text-white rounded"
                      value={editData.price}
                      onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                    />
                  ) : (
                    `₹${item.price}`
                  )}
                </td>
                <td className="px-4 py-3">
                  {editIndex === idx ? (
                    <textarea
                      className="w-full p-1 bg-white/10 text-white rounded"
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td className="px-4 py-3 flex justify-center space-x-2">
                  {editIndex === idx ? (
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-sm font-semibold"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(idx)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded text-sm font-semibold"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MenuList;