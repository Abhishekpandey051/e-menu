import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../utils/AuthProvider";
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [option, setOption] = useState(false)
    const { userData, logout } = useAuth();
    const navigate = useNavigate();
    console.log(userData);

    return (
        <nav className="bg-gradient-to-r from-[#141e30] to-[#243b55] shadow-xl fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link className="text-3xl font-extrabold tracking-wider text-white drop-shadow">
                        🍽️ <span className="text-pink-400">E</span>Menu
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-1 justify-center items-center space-x-10">
                        {["Home", "Menu", "About", "Contact"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-white text-lg font-medium hover:text-pink-400 transition duration-300"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Login Button */}
                    <div className="hidden md:flex">
                        {userData && option ? (
                            <button
                                onClick={() => {
                                    logout();
                                    setOption(false);
                                    navigate('/admin');
                                }}
                                className="ml-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 transition text-white rounded-full shadow-lg font-semibold"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/admin"
                                onClick={() => setOption(true)}
                                className="ml-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 transition text-white rounded-full shadow-lg font-semibold"
                            >
                                Admins
                            </Link>
                        )}
                    </div>


                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-[#141e30] text-white transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
            >
                <div className="flex flex-col items-center px-6 py-4 space-y-4">
                    {["Home", "Menu", "About", "Contact"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="w-full text-center py-2 px-2 rounded hover:bg-pink-500 transition text-lg font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    {/* <Link to='/admin' className="w-full px-4 py-2 bg-pink-500 hover:bg-pink-600 transition rounded-full font-semibold text-white">
                        Admin
                    </Link> */}
                      <div className="hidden md:flex">
                        {userData && option ? (
                            <button
                                onClick={() => {
                                    logout();
                                    setOption(false);
                                    navigate('/admin');
                                }}
                                className="w-full px-4 py-2 bg-pink-500 hover:bg-pink-600 transition rounded-full font-semibold text-white"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/admin"
                                onClick={() => setOption(true)}
                                className="w-full px-4 py-2 bg-pink-500 hover:bg-pink-600 transition rounded-full font-semibold text-white"
                            >
                                Admins
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
