function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-[#141e30] to-[#243b55] text-white py-6 px-6 z-50 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Logo / Title */}
        <div className="text-2xl font-bold text-pink-400 drop-shadow">
          🍽️ E-Menu
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium">
          <a href="#" className="hover:text-pink-400 transition">Home</a>
          <a href="#" className="hover:text-pink-400 transition">About</a>
          <a href="#" className="hover:text-pink-400 transition">Contact</a>
          <a href="#" className="hover:text-pink-400 transition">About Developer</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-300">
          © {new Date().getFullYear()} E-Menu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
