import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../utils/firebase";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "eventBookings"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(updatedEvents);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen px-4 py-28 bg-gradient-to-tr from-[#1e3c72] to-[#2a5298] text-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">
          📅 <span className="text-pink-400">Live Event Bookings</span>
        </h1>
        <p className="text-white/80">See real-time updates for all bookings</p>
      </div>

      {events.length === 0 ? (
        <p className="text-center text-lg text-white/80">No event bookings yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:scale-[1.01] transition-transform duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-pink-300">{event.name}</h3>
                <span className="bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {event.type === "halwai" ? "👨‍🍳 Halwai" : "🍽️ Table"}
                </span>
              </div>
              <p className="text-white text-sm mb-1">📧 {event.email}</p>
              <p className="text-white text-sm mb-1">🧑‍🤝‍🧑 Guests: {event.guests}</p>
              <p className="text-white text-sm mb-1">📅 {event.date} | 🕒 {event.time}</p>
              {event.message && (
                <p className="mt-3 text-white/90 text-sm italic border-t border-white/20 pt-2">
                  "{event.message}"
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;
