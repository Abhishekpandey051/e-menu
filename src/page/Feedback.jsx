import { useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import swal from "sweetalert";

function Feedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    dish: "",
    rating: "",
    feedback: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "feedbacks"), {
        ...form,
        rating: parseInt(form.rating),
        createdAt: new Date(),
      });

      swal({
        title: "Thank You!",
        text: "Your feedback has been submitted successfully.",
        icon: "success",
        buttons: false,
        timer: 2000,
      });

      setForm({ name: "", email: "", dish: "", rating: "", feedback: "" });
    } catch (err) {
      swal("Oops!", "Something went wrong.", "error");
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] text-white px-6 py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Section */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            We Value Your <span className="text-pink-400">Feedback</span>
          </h1>
          <p className="text-white/80 text-lg">
            Let us know how your experience was. Your opinion helps us improve!
          </p>
          <ul className="text-white/70 text-base space-y-2">
            <li>🍛 Share details of your meal</li>
            <li>🌟 Rate our food and service</li>
            <li>🕒 Response within 24 hours</li>
          </ul>
        </div>

        {/* Feedback Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">What Dish Did You Try?</label>
            <input
              type="text"
              name="dish"
              value={form.dish}
              onChange={handleChange}
              placeholder="e.g., Paneer Tikka, Chole Bhature"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">Rating (1 to 5)</label>
            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option value="" disabled>Select a rating</option>
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate} className="text-black">
                  {rate} Star{rate > 1 && "s"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">Your Feedback</label>
            <textarea
              name="feedback"
              value={form.feedback}
              onChange={handleChange}
              rows={5}
              placeholder="Tell us what you liked, or what could be better!"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 transition py-3 rounded-full font-semibold text-lg"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
}

export default Feedback;
