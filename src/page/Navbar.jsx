import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../utils/useAuth";
import swal from "sweetalert";

// Navigation links configuration
const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Feedback", path: "/feedback" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userData, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      swal({
        title: "Success!",
        text: "You have successfully logged out.",
        icon: "success",
        buttons: false,
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      swal("Oops!", "Something went wrong during logout.", "error");
    }
  };

  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) =>
    `text-lg font-medium transition duration-300 ${isActive(path) ? "text-pink-400 font-bold" : "text-white hover:text-pink-400"
    }`;

  return (
    <nav className="bg-gradient-to-r from-[#141e30] to-[#243b55] shadow-xl fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wider text-white drop-shadow"
        >
          🍽️ <span className="text-pink-400">E</span>Menu
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map(({ name, path }) => (
            <Link key={name} to={path} className={linkClasses(path)}>
              {name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!userData ? (
            <Link
              to="/admin"
              className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg font-semibold transition"
            >
              Admins
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg font-semibold transition"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg font-semibold transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-[#141e30] text-white transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4">
          {NAV_LINKS.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setIsOpen(false)}
              className={`text-center py-2 rounded transition text-lg font-medium ${isActive(path)
                  ? "text-pink-400 font-bold"
                  : "hover:bg-pink-500 hover:text-white"
                }`}
            >
              {name}
            </Link>
          ))}

          {!userData ? (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 bg-pink-500 hover:bg-pink-600 transition rounded-full font-semibold text-center"
            >
              Admins
            </Link>
          ) : (
            <>
              <Link
                to="/add-item"
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 bg-pink-500 hover:bg-pink-600 transition rounded-full font-semibold text-center"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 transition rounded-full font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
