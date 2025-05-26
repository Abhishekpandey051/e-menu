import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "feedbacks"));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbacks(fetchedData);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen px-4 py-28 bg-gradient-to-tr from-[#2c3e50] to-[#3498db] text-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Customer <span className="text-pink-400">Feedbacks</span></h1>
        <p className="text-white/80">See what our guests had to say about their meals 🍽️</p>
      </div>

      {loading ? (
        <p className="text-center text-lg text-white">Loading feedbacks...</p>
      ) : feedbacks.length === 0 ? (
        <p className="text-center text-lg text-white">No feedbacks found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl hover:scale-[1.01] transition-transform duration-300">
              <div className="mb-3">
                <h3 className="text-xl font-bold text-pink-300">{fb.name}</h3>
                <p className="text-sm text-white/70">{fb.email}</p>
              </div>

              <div className="mb-2">
                <p className="text-white"><strong>Dish:</strong> {fb.dish}</p>
                <p className="text-white"><strong>Rating:</strong> {"⭐".repeat(fb.rating)}</p>
              </div>

              <p className="text-white/90 text-sm mt-3 border-t border-white/20 pt-3">
                {fb.feedback}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeedbackList;
