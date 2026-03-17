"use client";

import Image from "next/image";

/**
 * 🎨 DESIGN TOKENS
 * Primary: #1A2E22 (Deep Forest)
 * Secondary: #618264 (Sage Green)
 * Accent: #B4E197 (Fresh Sprout)
 * Background: #FDFCF7 (Soft Cream)
 */

export default function HealthPage() {
  return (
    <main className="bg-[#FDFCF7] font-sans antialiased text-[#1A2E22]">
      {/* ═══════════════════════════════════════════════
          MODERN HERO: Split Composition
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 z-10">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-[#618264]/10 border border-[#618264]/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#618264] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#618264]"></span>
              </span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#618264]">
                Wellness Initiative 2026
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 text-[#1A2E22]">
              Elevating <br />
              <span className="text-[#618264] italic serif">Public Health.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg mb-10">
              We bridge the gap between medical expertise and underserved communities through 
              strategic awareness and preventive care.
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="px-10 py-5 bg-[#1A2E22] text-white rounded-full font-bold hover:bg-[#618264] transition-all duration-300 shadow-2xl hover:-translate-y-1">
                Our Initiatives
              </button>
              <button className="group px-10 py-5 border-2 border-[#1A2E22] rounded-full font-bold hover:bg-[#1A2E22] hover:text-white transition-all duration-300 flex items-center gap-2">
                Partner with us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[600px] w-full hidden lg:block">
            <div className="absolute inset-0 bg-[#618264] rounded-[40px] rotate-3 translate-x-4"></div>
            <div className="absolute inset-0 overflow-hidden rounded-[40px] shadow-2xl ring-1 ring-black/10">
              <Image 
                src="/health1.jpeg" 
                alt="Healthcare awareness" 
                fill 
                className="object-cover"
                priority 
              />
            </div>
            {/* Floating Experience Card */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex gap-4">
               <div className="text-4xl font-black text-[#618264]">08</div>
               <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Years of<br/>Grassroot<br/>Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          IMPACT BENTO GRID: Data Visualization
      ═══════════════════════════════════════════════ */}
      <section className="py-32 bg-[#1A2E22] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Measured Outcomes.</h2>
            <div className="h-1 w-20 bg-[#B4E197]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 bg-white/5 border border-white/10 p-10 rounded-[2rem] flex flex-col justify-between hover:bg-white/10 transition-colors">
              <p className="text-5xl font-black text-[#B4E197]">1,000+</p>
              <p className="text-xl text-white/60 font-medium">Lives directly impacted through preventative screening and localized medicine.</p>
            </div>
            
            <div className="bg-[#618264] p-10 rounded-[2rem] flex flex-col justify-between shadow-xl">
              <svg className="w-10 h-10 text-white/50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <div>
                <p className="text-4xl font-bold mb-1">20+</p>
                <p className="text-xs uppercase font-bold tracking-widest text-white/70">Health Camps</p>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2rem] flex flex-col justify-between text-[#1A2E22]">
              <div className="w-10 h-10 rounded-full bg-[#1A2E22] flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              </div>
              <div>
                <p className="text-4xl font-bold mb-1 text-[#618264]">10+</p>
                <p className="text-xs uppercase font-bold tracking-widest text-[#1A2E22]/40">Awareness Drives</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MISSION: Texture & Depth
      ═══════════════════════════════════════════════ */}
      <section className="py-32 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
                  <Image src="/health2.jpeg" alt="Health Initiative" fill className="object-cover" />
                </div>
                <div className="relative h-40 rounded-3xl overflow-hidden bg-[#B4E197] p-8">
                  <p className="text-2xl font-bold leading-tight">Native Support Systems</p>
                </div>
              </div>
              <div className="pt-12 space-y-4">
                <div className="relative h-40 rounded-3xl overflow-hidden bg-[#618264] p-8 text-white">
                   <p className="text-lg font-medium italic">"Health is the foundation of every thriving community."</p>
                </div>
                <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
                  <Image src="/health1.jpeg" alt="Health Initiative" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-none">Why our approach <span className="text-[#618264]">works.</span></h2>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              We don't just provide care; we build knowledge. Our mission is to transform 
              passive healthcare recipients into active health advocates.
            </p>
            <div className="space-y-8">
              {[
                { t: "Localized Expertise", d: "We collaborate with local village leaders to build trust." },
                { t: "Preventive Focus", d: "Reducing future burdens through education on nutrition and hygiene." },
                { t: "Sustained Follow-up", d: "We don't just visit once; we create long-term monitoring systems." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#B4E197] flex shrink-0 items-center justify-center font-bold text-xs">{idx + 1}</div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">{item.t}</h4>
                    <p className="text-slate-400 text-sm">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA: The "Last Impression" Section
      ═══════════════════════════════════════════════ */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto bg-[#1A2E22] rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center text-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#618264] opacity-20 blur-[120px] rounded-full -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">
              Ready to restore <br /> some <span className="text-[#B4E197]">balance?</span>
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto font-medium">
              Join a network of volunteers, doctors, and donors committed to redefining community health in India.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-[#B4E197] text-[#1A2E22] px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                Apply to Volunteer
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                Donate Funds
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}