import { useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import swal from "sweetalert";

function Feedback() {
  const [form, setForm] = useState({ name: "", email: "", feedback: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "feedbacks"), {
        ...form,
        createdAt: new Date(),
      });

      swal({
        title: "Thank You!",
        text: "Your feedback has been submitted successfully.",
        icon: "success",
        buttons: false,
        timer: 2000,
      });

      setForm({ name: "", email: "", feedback: "" });
    } catch (err) {
      swal("Oops!", "Something went wrong.", "error");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen py-28 px-4 bg-gradient-to-tr from-[#1e3c72] to-[#2a5298] text-white">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          We value your <span className="text-pink-400">Feedback</span>
        </h1>
        <p className="text-white/80 text-lg">
          Help us improve by sharing your thoughts below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl max-w-xl mx-auto space-y-6 hover:scale-[1.01] transition-transform"
      >
        <div>
          <label className="block mb-2 text-sm font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">Feedback</label>
          <textarea
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            rows="5"
            placeholder="Write your feedback here..."
            required
            className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 transition text-white py-3 rounded-full font-semibold text-lg"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default Feedback;
