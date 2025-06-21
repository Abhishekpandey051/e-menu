import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import swal from "sweetalert";

function Event() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "table",
    date: "",
    time: "",
    guests: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "eventBookings"), {
        ...form,
        createdAt: new Date(),
      });

      swal("Success", "Your booking has been submitted!", "success");
      setForm({
        name: "",
        email: "",
        type: "table",
        date: "",
        time: "",
        guests: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      swal("Error", "Something went wrong!", "error");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] px-6 py-28 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side Info */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Contact Us for <span className="text-pink-400">Event Bookings</span>
          </h1>
          <p className="text-white/80 text-lg">
            Whether you're planning a birthday, wedding, or just a nice dinner out — we're here to make your special day unforgettable. Fill out the form and we'll reach out to confirm your reservation!
          </p>
          <ul className="text-white/80 space-y-2 text-base">
            <li>📍 Location: Near Main Street, City Plaza</li>
            <li>📞 Phone: +91 9876543210</li>
            <li>✉️ Email: events@yourrestaurant.com</li>
          </ul>
        </div>

        {/* Right Side Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="table" className="text-black">Book a Table</option>
              <option value="halwai" className="text-black">Hire Halwai</option>
            </select>
            <input
              name="guests"
              type="number"
              min={1}
              placeholder="Number of Guests"
              value={form.guests}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <textarea
            name="message"
            rows={4}
            placeholder="Any special instructions?"
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 transition py-3 rounded-full font-semibold text-lg"
          >
            📩 Submit Booking Request
          </button>
        </form>
      </div>
    </section>
  );
}

export default Event;
