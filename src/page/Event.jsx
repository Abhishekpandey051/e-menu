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
    <div className="min-h-screen py-28 px-6 bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
        <h2 className="text-4xl font-bold text-center mb-8 text-pink-400">
          🎉 Book Your Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="p-3 rounded-xl bg-white/20 placeholder-white/60 text-white focus:ring-pink-400"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="p-3 rounded-xl bg-white/20 placeholder-white/60 text-white focus:ring-pink-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="p-3 rounded-xl bg-white/20 text-white focus:ring-pink-400"
            >
              <option value="table">Book a Table</option>
              <option value="halwai">Hire Halwai</option>
            </select>

            <input
              name="guests"
              type="number"
              min={1}
              placeholder="No. of Guests"
              value={form.guests}
              onChange={handleChange}
              required
              className="p-3 rounded-xl bg-white/20 placeholder-white/60 text-white focus:ring-pink-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="p-3 rounded-xl bg-white/20 text-white focus:ring-pink-400"
            />
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              required
              className="p-3 rounded-xl bg-white/20 text-white focus:ring-pink-400"
            />
          </div>

          <textarea
            name="message"
            rows={4}
            placeholder="Special instructions (optional)"
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:ring-pink-400"
          />

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 py-3 rounded-full font-semibold text-lg transition"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default Event;
