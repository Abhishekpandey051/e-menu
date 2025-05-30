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
            <div
              key={fb.id}
              className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-transform duration-300 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-pink-400 text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                  {fb.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{fb.name}</h3>
                  <p className="text-white/70 text-sm">{fb.email}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-white/80"><span className="font-semibold text-white">Dish:</span> {fb.dish}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="font-semibold text-white">Rating:</span>
                  <span className="text-yellow-400 text-lg">
                    {"⭐".repeat(fb.rating)}{fb.rating < 5 ? "☆".repeat(5 - fb.rating) : ""}
                  </span>
                </div>
              </div>

              <p className="text-white/90 text-sm mt-4 border-t border-white/20 pt-4 leading-relaxed">
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
