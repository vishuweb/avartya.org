import Image from "next/image";

export default function PollutionPage() {
  return (
    <main>

      <section className="relative h-[65vh] flex items-center justify-center text-white">

        <Image
          src="/pollution-hero.jpg"
          alt="Pollution Awareness"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-center">
          <h1 className="text-5xl font-bold">Pollution Awareness</h1>
          <p className="mt-4">
            Educating communities to protect the environment.
          </p>
        </div>

      </section>

    </main>
  );
}