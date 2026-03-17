import Image from "next/image";

const centres = [
  { name: "Kushinagar", image: "/centres/kushinagar.jpg" },
  { name: "Deoria", image: "/centres/deoria.jpg", note: "Head Office" },
  { name: "Gorakhpur", image: "/centres/gorakhpur.jpg" },
  { name: "Sant Kabir Nagar", image: "/centres/santkabirnagar.jpg" },
  { name: "Maharajganj", image: "/centres/maharajganj.jpg" },
  { name: "Ballia", image: "/centres/ballia.jpg" },
  { name: "Mau", image: "/centres/mau.jpg" },
];

export default function CentresPage() {
  return (
    <main className="bg-[#f4efe9] min-h-screen">

      {/* HEADER */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Our Centres & Regional Presence
        </h1>

        <p className="text-lg text-gray-600">
          Supporting grassroots enterprises and communities across{" "}
          <span className="text-orange-500 font-semibold">
            7 districts of Eastern Uttar Pradesh
          </span>
        </p>
      </section>

      {/* CENTRES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {centres.map((centre) => (
            <div
              key={centre.name}
              className="relative group h-[220px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              
              {/* IMAGE */}
              <Image
                src={centre.image}
                alt={centre.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* TEXT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                <h3 className="text-3xl font-bold text-orange-400">
                  {centre.name}
                </h3>

                {centre.note && (
                  <p className="text-white font-semibold text-lg mt-1">
                    {centre.note}
                  </p>
                )}
              </div>

            </div>
          ))}

        </div>

        {/* FOOTER NOTE */}
        <p className="text-center mt-14 text-gray-500 italic">
          Expanding to new districts soon.
        </p>

      </section>

    </main>
  );
}