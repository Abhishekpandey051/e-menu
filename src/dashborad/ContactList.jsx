import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const snapshot = await getDocs(collection(db, "contactData"));
      setContacts(snapshot.docs.map(doc => doc.data()));
    };
    fetchContacts();
  }, []);

  return (
    <div className="bg-white/10 p-6 rounded-xl shadow-xl">
      <h2 className="text-xl font-bold mb-4">📞 Contact Messages</h2>
      <div className="space-y-4 max-h-80 overflow-auto">
        {contacts.map((c, i) => (
          <div key={i} className="bg-white/20 p-3 rounded">
            <p><strong>{c.name}</strong> ({c.email})</p>
            <p className="text-sm text-white/70">{c.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
