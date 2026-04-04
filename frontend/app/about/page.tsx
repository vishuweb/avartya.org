"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type TeamMember = {
  _id: string;
  name: string;
  designation: string;
  role?: string;
  image?: string;
  bio?: string;
  linkedin?: string;
  category: "founder" | "core" | "volunteer" | "advisor";
};

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode; subtitle?: string; light?: boolean }) => (
  <div className="mb-12">
    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? "text-white" : "text-gray-900"}`}>{children}</h2>
    {subtitle && <p className={`text-lg max-w-2xl ${light ? "text-emerald-100" : "text-gray-600"}`}>{subtitle}</p>}
    <div className={`h-1 w-20 mt-4 rounded-full ${light ? "bg-orange-500" : "bg-emerald-600"}`} />
  </div>
);

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 items-start">
      <div className="relative w-28 h-28 md:w-36 md:h-36 shrink-0">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="rounded-2xl object-cover shadow-lg"
            unoptimized={member.image.startsWith("http")}
          />
        ) : (
          <div className="w-full h-full rounded-2xl bg-emerald-100 flex items-center justify-center text-4xl font-bold text-emerald-700">
            {member.name[0]}
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
        <p className="text-emerald-600 font-bold mb-1">{member.designation}</p>
        {member.role && <p className="text-gray-500 text-sm mb-3">{member.role}</p>}
        {member.bio && <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mt-3"
          >
            LinkedIn →
          </a>
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [team, setTeam] = useState<{ grouped: Record<string, TeamMember[]> } | null>(null);
  const [teamLoading, setTeamLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team`)
      .then((r) => r.json())
      .then(setTeam)
      .catch(console.error)
      .finally(() => setTeamLoading(false));
  }, []);

  const categoryOrder: TeamMember["category"][] = ["founder", "core", "volunteer", "advisor"];
  const categoryLabel: Record<string, string> = {
    founder: "Founders",
    core: "Core Team",
    volunteer: "Lead Volunteers",
    advisor: "Advisors",
  };

  return (
    <main className="bg-gray-50 antialiased">

      {/* 1. HERO */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image src="/hero.jpeg" alt="Community engagement in rural India" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-gray-900/90" />
        <div className="relative z-10 text-center max-w-4xl px-6">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest uppercase bg-orange-500 text-white rounded-full">
            Our Story
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            A small idea with a <span className="text-emerald-400">powerful purpose.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed">
            To bring opportunity, awareness, and support to communities that need it most.
          </p>
        </div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="max-w-7xl mx-auto py-24 px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-emerald-100 rounded-2xl -z-10 group-hover:scale-105 transition-transform duration-500" />
          <Image src="/about1.jpg" alt="Avartya team on the ground" width={600} height={450} className="rounded-xl shadow-2xl object-cover" />
        </div>
        <div className="space-y-6">
          <SectionHeading>Who We Are</SectionHeading>
          <p className="text-gray-600 text-lg leading-relaxed">
            Avartya Foundation is a collective of young thinkers and doers who believe that geography shouldn&apos;t define destiny. Born from a desire to bridge the massive gap between potential and opportunity, we operate at the intersection of local wisdom and modern support systems.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We aren&apos;t just an organization; we are a promise to the communities we serve. Whether it&apos;s a classroom in a remote village or a health camp for mothers, our work is guided by honesty, empathy, and a relentless drive to see our neighbors thrive.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="text-center p-4 bg-white shadow-sm rounded-lg border-b-4 border-emerald-600">
              <span className="block text-2xl font-bold text-gray-900">100%</span>
              <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Grassroots</span>
            </div>
            <div className="text-center p-4 bg-white shadow-sm rounded-lg border-b-4 border-orange-500">
              <span className="block text-2xl font-bold text-gray-900">Voluntarily</span>
              <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Driven</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY WE EXIST */}
      <section className="bg-emerald-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading light subtitle="The motivation behind every step we take.">Why We Exist</SectionHeading>
            <div className="space-y-6 text-emerald-50/80 text-lg leading-relaxed">
              <p>
                In many parts of India, a child&apos;s ambition is limited by the information available to them. We saw brilliant minds held back by a simple lack of awareness—about health, about rights, and about educational pathways.
              </p>
              <p>
                We exist because we believe that waiting for change isn&apos;t enough. Significant social shifts happen when local communities are empowered to lead their own transformation. We provide the spark; they provide the flame.
              </p>
            </div>
          </div>
          <div className="bg-emerald-800/50 p-8 rounded-3xl border border-emerald-700">
            <blockquote className="text-2xl italic font-light text-emerald-100 mb-6">
              &quot;The absence of opportunity is not the absence of talent. It is simply a gap that we have the power to bridge together.&quot;
            </blockquote>
            <p className="text-orange-400 font-bold uppercase tracking-widest text-sm">— Our Core Belief</p>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <SectionHeading subtitle="Targeted initiatives designed for long-term community resilience.">What We Do</SectionHeading>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Education", desc: "Providing resources, mentorship, and digital literacy to ensure every student has a fair shot at the future.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
            { title: "Health Awareness", desc: "Demystifying preventive healthcare and organizing community-led medical camps to save lives.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
            { title: "Women Empowerment", desc: "Fostering economic independence and leadership by creating safe spaces for skill-building and entrepreneurship.", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
          ].map((item, idx) => (
            <div key={idx} className="group p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW WE WORK */}
      <section className="bg-gray-100 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Our systematic approach ensures that every donation and hour spent results in real impact.">How We Work</SectionHeading>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Listen", desc: "We spend time on the ground to understand the unique challenges of each community." },
              { step: "02", title: "Design", desc: "We create practical, scalable programs that address those specific needs." },
              { step: "03", title: "Engage", desc: "We mobilize passionate volunteers and local partners to bring the vision to life." },
              { step: "04", title: "Measure", desc: "We track every outcome to ensure we are actually making a difference." },
            ].map((item, idx) => (
              <div key={idx} className="relative p-6 bg-white rounded-xl shadow-sm border-t-4 border-emerald-600">
                <span className="text-4xl font-black text-emerald-100 absolute top-4 right-4">{item.step}</span>
                <h3 className="text-lg font-bold mb-2 text-gray-900 relative z-10">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LEADERSHIP — Dynamic from API */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="The people behind the vision, dedicated to the mission every single day.">
          Leadership Team
        </SectionHeading>

        {teamLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-8 animate-pulse flex gap-6">
                <div className="w-36 h-36 rounded-2xl bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : team && Object.keys(team.grouped || {}).length > 0 ? (
          <div className="space-y-12">
            {categoryOrder.map((cat) => {
              const members = team.grouped[cat];
              if (!members?.length) return null;
              return (
                <div key={cat}>
                  <h3 className="text-lg font-bold text-gray-500 uppercase tracking-widest mb-6">{categoryLabel[cat]}</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {members.map((m) => <TeamCard key={m._id} member={m} />)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
            <p className="text-4xl mb-3">👥</p>
            <p className="text-gray-500">Team members will appear here once added via the admin panel.</p>
            <Link href="/admin/team" className="text-emerald-600 text-sm font-semibold hover:underline mt-2 inline-block">
              Go to Admin Panel →
            </Link>
          </div>
        )}
      </section>

      {/* 7. CTA */}
      <section className="py-24 px-6 text-center bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight">
            Ready to be a part of the <span className="text-emerald-500">Avartya family?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            Change doesn&apos;t require a massive gesture. It starts with a single person deciding to care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/volunteer" className="bg-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 hover:-translate-y-1 transition-all shadow-lg shadow-emerald-900/40">
              Become a Volunteer
            </Link>
            <Link href="/women-help" className="border-2 border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Get Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}