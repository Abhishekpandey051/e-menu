import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    const fetchContacts = async () => {
      const snapshot = await getDocs(collection(db, "contactData"));
      setContacts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen px-4 py-24 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          📞 Customer <span className="text-pink-400">Contact Messages</span>
        </h2>

        {contacts.length === 0 ? (
          <p className="text-center text-lg text-white/70">No contact messages found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((c, i) => (
              <div
                key={c.id || i}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-transform hover:scale-[1.01]"
              >
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                  <p className="text-sm text-white/70">{c.email}</p>
                </div>
                <div className="mt-3 border-t border-white/20 pt-3">
                  <p className="text-white/90 text-sm leading-relaxed">
                    {c.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
