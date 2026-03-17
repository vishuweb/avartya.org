"use client";

import Image from "next/image";
export default function SportsPage() {
  return (
    <main className="bg-[#111111] text-white font-sans antialiased overflow-x-hidden">
      
      {/* ═══════════════════════════════════════════════
          HERO: High-Octane Action
      ═══════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/sports1.jpeg"
            alt="Athlete in motion"
            fill
            priority
            className="object-cover opacity-60 scale-110 transition-transform duration-[10s] hover:scale-100"
          />
          {/* Aggressive Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-transparent" />
        </div>

        {/* Diagonal Speed Lines (Decorative) */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#00E5FF]/5 -skew-x-12 translate-x-32" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-4xl">
            <div className="inline-block bg-[#00E5FF] text-[#111111] px-4 py-1 mb-6 skew-x-[-15deg] font-black italic tracking-tighter uppercase text-sm">
              Leveling the playing field
            </div>
            
            <h1 className="text-7xl md:text-[120px] font-[900] leading-[0.85] italic uppercase tracking-tighter mb-8">
              Fueling <br />
              <span className="text-transparent stroke-text">Champions.</span>
            </h1>

            <style jsx>{`
              .stroke-text {
                -webkit-text-stroke: 2px #00E5FF;
              }
            `}</style>

            <p className="mt-6 text-xl text-gray-300 leading-relaxed max-w-xl font-medium">
              Transforming communities through the power of discipline, teamwork, and athletic excellence.
            </p>

            <div className="mt-12 flex flex-wrap gap-6">
              <button className="group relative px-10 py-5 bg-white text-[#111111] font-black uppercase italic tracking-widest overflow-hidden transition-all hover:pr-14">
                <span className="relative z-10">Join the Academy</span>
                <div className="absolute top-0 right-0 h-full w-0 bg-[#00E5FF] transition-all group-hover:w-full" />
              </button>
              
              <button className="px-10 py-5 border-2 border-white/20 font-black uppercase italic tracking-widest hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all">
                Our Programs
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-16 bg-gradient-to-b from-[#00E5FF] to-transparent" />
        </div>
      </section>
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#1A1A1A] p-10 border-l-4 border-[#00E5FF] hover:bg-[#222222] transition-colors">
            <h3 className="text-6xl font-black italic text-[#00E5FF]">500+</h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest mt-2">Active Athletes</p>
          </div>

          <div className="bg-[#1A1A1A] p-10 border-l-4 border-white hover:bg-[#222222] transition-colors">
            <h3 className="text-6xl font-black italic text-white">15+</h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest mt-2">Rural Academies</p>
          </div>

          <div className="bg-[#00E5FF] p-10 text-[#111111]">
            <h3 className="text-6xl font-black italic">50+</h3>
            <p className="text-[#111111]/60 font-bold uppercase tracking-widest mt-2">Tournaments</p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          GALLERY: The Action Grid
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-white text-[#111111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">On The Ground</h2>
              <div className="h-2 w-32 bg-[#00E5FF] mt-2" />
            </div>
            <p className="text-gray-500 max-w-sm mt-4 md:mt-0 font-medium">
              We focus on building infrastructure and providing coaching where it's needed most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[700px]">
            {/* Feature Image */}
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <Image src="/sports2.jpeg" alt="Action" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                <h4 className="text-white text-2xl font-black italic">Inter-District Cricket</h4>
                <p className="text-gray-300 text-sm">Identifying raw talent from rural Deoria.</p>
              </div>
            </div>

            <div className="md:col-span-2 relative group overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <Image src="/sports1.jpeg" alt="Training" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>

            <div className="relative group overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <Image src="/e1.avif" alt="Equipment" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>

            <div className="relative group overflow-hidden bg-[#00E5FF] flex items-center justify-center p-8 text-center hover:bg-[#111111] hover:text-white transition-colors cursor-pointer">
               <h4 className="text-2xl font-black italic uppercase">View More Highlights →</h4>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA: The "Game On" Section
      ═══════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden bg-[#111111]">
        {/* Background Decorative Text */}
        <div className="absolute top-0 left-0 text-[20vw] font-black text-white/[0.02] leading-none pointer-events-none select-none italic tracking-tighter">
          NONSTOP
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-8xl font-black italic uppercase mb-8">
            Ready to <span className="text-[#00E5FF]">Compete?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 font-medium">
            Whether you are an aspiring athlete or looking to support youth sports development, the time to act is now.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-12 py-6 bg-[#00E5FF] text-[#111111] font-black uppercase italic tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,229,255,0.3)]">
              Sponsor an Athlete
            </button>
            <button className="px-12 py-6 border-2 border-white text-white font-black uppercase italic tracking-widest hover:bg-white hover:text-[#111111] transition-all">
              Volunteer Coach
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}