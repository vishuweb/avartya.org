import Image from "next/image";

export default function WomenSafetyPage() {
  return (
    <main>

      <section className="relative h-[65vh] flex items-center justify-center text-white">

        <Image
          src="/women-hero.jpg"
          alt="Women Safety Awareness"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-center">
          <h1 className="text-5xl font-bold">Women Safety Awareness</h1>
          <p className="mt-4">
            Empowering women with knowledge, safety and confidence.
          </p>
        </div>

      </section>


      <section className="py-20 max-w-5xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-6">Empowering Women</h2>

        <p className="text-gray-600">
          Through workshops, safety awareness campaigns and community
          discussions, Avartya works to create safer spaces and empower
          women with knowledge about their rights and safety.
        </p>
      </section>

    </main>
  );
}