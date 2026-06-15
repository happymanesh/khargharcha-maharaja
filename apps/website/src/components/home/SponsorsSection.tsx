"use client";

const sponsors = [
  { name: "Paradise Group", tagline: "Your World. Our Vision." },
  { name: "Metro Group", tagline: "Build Different" },
  { name: "Satyam Developers", tagline: "Constructing Dreams" },
  { name: "Galaxy Point", tagline: "GP" },
  { name: "GAMI Group", tagline: "Building your imagination" },
  { name: "Medicover Hospitals", tagline: "Healthcare" },
  { name: "DDSR Group", tagline: "Move to New Heights" },
];

export default function SponsorsSection() {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block bg-saffron-100 text-saffron-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Our Sponsors
          </span>
          <h2 className="text-2xl font-bold text-gray-800">गत वर्षाचे प्रायोजक</h2>
          <p className="text-gray-500 text-sm mt-1">Last Year Sponsors — Thank you for your support</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:shadow-md hover:border-saffron-300 transition-all"
            >
              <div className="w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-saffron-600 font-bold text-lg">{sponsor.name.charAt(0)}</span>
              </div>
              <p className="font-semibold text-gray-800 text-sm leading-tight">{sponsor.name}</p>
              <p className="text-gray-400 text-xs mt-0.5">{sponsor.tagline}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          Interested in sponsoring? Contact us at{" "}
          <a href="mailto:navnirmansevabhavisanstha2018@gmail.com" className="text-saffron-600 hover:underline">
            navnirmansevabhavisanstha2018@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
