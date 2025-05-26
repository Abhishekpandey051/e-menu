import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../utils/firebase';
import swal from 'sweetalert';

function ContactUs() {
  const contactForm = { name: '', email: '', message: '', number: '' };
  const [form, setForm] = useState(contactForm);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contactData'), {
        ...form,
        createdAt: new Date(),
      });

      swal({
        title: 'Success!',
        text: 'Message submitted successfully!',
        icon: 'success',
        timer: 2000,
        buttons: false,
      });

      setForm(contactForm);
    } catch (err) {
      console.error('Error submitting form:', err);
      swal({
        title: 'Oops!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="pt-28 pb-32 px-6 md:px-16 xl:px-32 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Get in <span className="text-pink-500">Touch</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl">
          We'd love to hear from you! Drop us a message and we'll get back to you shortly.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* Contact Info */}
        <div className="space-y-8 text-white/90">
          {[
            {
              title: '📍 Address',
              content: 'Apcomp Infotech Pvt Ltd\nNoida Sector 63, India',
            },
            {
              title: '📞 Phone',
              content: '+91 98765 43210',
            },
            {
              title: '📧 Email',
              content: 'support@emenu.com',
            },
          ].map((info, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-pink-500/20 transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-2">{info.title}</h2>
              <p className="whitespace-pre-line">{info.content}</p>
            </div>
          ))}

          <div className="flex space-x-4 pt-4 text-pink-300 text-lg">
            <a href="#" className="hover:text-white transition">🌐 Website</a>
            <a href="#" className="hover:text-white transition">📘 Facebook</a>
            <a href="#" className="hover:text-white transition">📸 Instagram</a>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl space-y-6 transition-transform hover:scale-[1.01]"
        >
          {[
            { name: 'name', type: 'text', label: 'Name', placeholder: 'Your name' },
            { name: 'number', type: 'tel', label: 'Number', placeholder: 'Your phone number' },
            { name: 'email', type: 'email', label: 'Email', placeholder: 'you@example.com' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-2 text-sm font-semibold">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                required
              />
            </div>
          ))}

          <div>
            <label className="block mb-2 text-sm font-semibold">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your message..."
              className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 transition text-white py-3 rounded-full font-semibold text-lg"
          >
            Send Message ✉️
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
