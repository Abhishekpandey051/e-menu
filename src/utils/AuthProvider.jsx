import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { AuthContext } from "./AuthContext"; 

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(docRef);
          setUserData(userSnap.exists() ? userSnap.data() : null);
        } catch (err) {
          console.error("Error fetching user doc:", err);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password, name) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;
    await updateProfile(userCred.user, {
      displayName: name,
      photoURL: avatar,
    });
    await setDoc(doc(db, "users", userCred.user.uid), {
      uid: userCred.user.uid,
      email,
      displayName: name,
      photoURL: avatar,
      createdAt: new Date(),
    });
  };

  const signIn = async (email, password) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    const docRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(docRef);

    if (!userSnap.exists()) {
      const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName || user.email}`;
      await setDoc(docRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || avatar,
        createdAt: new Date(),
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, userData, loading, signUp, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
