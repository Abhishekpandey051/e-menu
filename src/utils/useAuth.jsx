// src/utils/useAuth.jsx
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const useAuth = () => useContext(AuthContext);
