import Image from "next/image";

export default function AgriculturePage() {
  return (
    <main>

      <section className="relative h-[65vh] flex items-center justify-center text-white">

        <Image
          src="/agriculture-hero.jpg"
          alt="Sustainable Agriculture"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-center">
          <h1 className="text-5xl font-bold">Sustainable Agriculture</h1>
          <p className="mt-4">
            Supporting farmers with sustainable farming practices.
          </p>
        </div>

      </section>

    </main>
  );
}