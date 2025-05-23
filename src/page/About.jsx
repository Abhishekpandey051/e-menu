function About() {
  const teamMembers = [
    {
      name: "Abhishek Pandey",
      role: "Frontend Developer",
    },
    {
      name: "Team Member 2",
      role: "Frontend Developer",
    },
    {
      name: "Team Member 3",
      role: "Frontend Developer",
    },
  ];

  return (
    <div className="pt-28 pb-32 px-6 md:px-16 xl:px-32 bg-gradient-to-br from-[#1F1C2C] to-[#928DAB] text-white">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold mb-6">
          About <span className="text-pink-400">Us</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl leading-relaxed">
          We blend flavor with innovation. Learn more about our journey and the people who make it happen.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        {/* Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Our Journey</h2>
          <p className="text-white/80 text-lg leading-relaxed mb-4">
            EMenu started in 2024 with a mission to redefine the dining experience by integrating technology and taste. We believe food should not only be delicious but also beautifully presented and easily accessible.
          </p>
          <p className="text-white/70 text-base">
            Our digital menu system helps restaurants go contactless while enhancing the user experience with simplicity and style. We're not just techies—we're foodies too.
          </p>
        </div>

        {/* Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto lg:mx-0">
          <img
            src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80"
            alt="About Us"
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500 rounded-2xl"
          />
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14">
          Meet the <span className="text-pink-400">Team</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl text-center transition-transform hover:scale-105"
            >
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}`}
                alt={member.name}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20"
              />
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-white/70 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
