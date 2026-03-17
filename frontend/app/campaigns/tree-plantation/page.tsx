"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TreePine, Users, Sprout, Globe, ArrowRight } from "lucide-react"; // Install lucide-react

export default function TreePlantationPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <main className="bg-white text-slate-900 selection:bg-[#618264] selection:text-white">
      
      {/* HERO SECTION - Enhanced with Overlay & Breadcrumbs */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/tree1.jpeg"
          alt="Lush green forest canopy"
          fill
          priority
          className="object-cover scale-105 animate-subtle-zoom" // Optional: add custom zoom animation in CSS
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative text-center px-6 z-10"
        >
          <span className="uppercase tracking-[0.3em] text-sm font-semibold text-[#b4e197] mb-4 block">
            Our Environment Initiative
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
            Rooting for a <span className="text-[#618264]">Greener</span> Future
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed">
            Restoring ecological balance through community-driven plantation initiatives. 
            Every sapling we plant is a promise to the next generation.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="bg-[#618264] hover:bg-[#4d6b4f] text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
              Join a Drive <ArrowRight size={18} />
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold transition-all">
              View Impact
            </button>
          </div>
        </motion.div>
      </section>

      {/* MISSION & WHY - Enhanced with Grid Layout */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-bold text-slate-800 mb-6 leading-tight">
              Why Our Reforestation <br /> Efforts Matter
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Trees are the lungs of our planet. At Avartya, we don't just plant trees; 
              we nurture ecosystems. Our scientific approach ensures we plant native species 
              that support local wildlife and survive the long term.
            </p>
            <ul className="space-y-4">
              {[
                "Carbon Sequestration to fight climate change",
                "Soil erosion prevention & water table recharge",
                "Restoring natural habitats for urban biodiversity"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="h-2 w-2 rounded-full bg-[#618264]" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image src="/tree2.jpeg" alt="Hands holding a sapling" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* IMPACT COUNTER - Modern Glass Cards */}
      <section className="py-20 bg-[#618264]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Sprout className="mb-4 text-[#b4e197]" />, label: "Saplings Planted", val: "1,200+" },
              { icon: <Globe className="mb-4 text-[#b4e197]" />, label: "Plantation Drives", val: "10+" },
              { icon: <Users className="mb-4 text-[#b4e197]" />, label: "Volunteers", val: "150+" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl text-center text-white hover:bg-white/20 transition-colors"
              >
                <div className="flex justify-center">{stat.icon}</div>
                <h3 className="text-4xl font-black mb-2">{stat.val}</h3>
                <p className="text-white/80 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY/ACTIVITIES - Masonry-style Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold">Recent Activities</h2>
            <p className="text-gray-500 mt-2">Moments from our latest community drives</p>
          </div>
          <button className="text-[#618264] font-bold hover:underline hidden md:block">
            View All Photos
          </button>
        </div>

        <div className="grid md:grid-cols-12 gap-4 h-[600px]">
          <div className="md:col-span-8 relative rounded-2xl overflow-hidden group">
            <Image src="/tree1.jpeg" alt="Volunteers planting" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="md:col-span-4 grid gap-4">
            <div className="relative rounded-2xl overflow-hidden group">
              <Image src="/tree2.jpeg" alt="Young sapling" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="relative rounded-2xl overflow-hidden group">
              <Image src="/tree1.jpeg" alt="Group photo" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="mb-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
             <TreePine size={300} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to make an impact?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Whether you want to donate saplings or join us on the ground, 
            there is a place for you in our mission.
          </p>
          <button className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">
            Become a Volunteer
          </button>
        </div>
      </section>

    </main>
  );
}