import { Link } from 'react-router-dom';
import {
  Code2,
  Users,
  Calendar,
  Rocket,
  ArrowRight,
  Terminal,
  Globe,
  Zap,
  BookOpen,
  Trophy,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { HOME_STATS } from '../data/stats';

/* ───────── Hero Section ───────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(88,245,132,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(88,245,132,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium text-green-primary bg-green-primary/10 border border-green-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse" />
            University Coding Club
          </span>
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-in-up animate-delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
          <span className="text-text-primary">Build. </span>
          <span className="text-green-primary text-glow-green">Connect. </span>
          <span className="text-text-primary">Innovate.</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up animate-delay-200 text-text-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          A student-led technical community bringing together programmers,
          developers and AI enthusiasts. Explore, build and grow — beyond the
          classroom.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up animate-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/join"
            className="group flex items-center gap-2 px-7 py-3 rounded-lg bg-green-primary text-bg-primary font-semibold text-sm
                       hover:bg-green-secondary transition-all duration-200 glow-green-sm"
          >
            Join the Club
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/projects"
            className="flex items-center gap-2 px-7 py-3 rounded-lg border border-border text-text-primary font-semibold text-sm
                       hover:border-green-primary/40 hover:bg-white/5 transition-all duration-200"
          >
            View Projects
          </Link>
        </div>

        {/* Stats Row */}
        <div className="animate-fade-in-up animate-delay-400 mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {HOME_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-green-primary font-mono">
                {stat.value}
              </p>
              <p className="text-text-muted text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── About Section ───────── */
function About() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="About Us"
          title="What is Code2Chill?"
          description="Code2Chill is a university developer community where students collaborate, explore new technologies and build real projects together."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Left — mission card */}
          <div className="p-6 rounded-xl bg-bg-card border border-border hover:border-green-primary/20 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-green-primary/10 flex items-center justify-center mb-4">
              <Terminal size={20} className="text-green-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Our Mission</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              To create a welcoming space where students can learn, experiment
              with technology and develop their skills through hands-on projects,
              workshops and peer collaboration.
            </p>
          </div>

          {/* Right — vision card */}
          <div className="p-6 rounded-xl bg-bg-card border border-border hover:border-green-primary/20 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-green-primary/10 flex items-center justify-center mb-4">
              <Rocket size={20} className="text-green-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Our Vision</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              To build the most active student developer community on campus —
              a place where every member ships real code, shares knowledge and
              grows their technical identity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── What We Do ───────── */
function WhatWeDo() {
  const activities = [
    {
      icon: Code2,
      title: 'Coding Sessions',
      description: 'Weekly collaborative coding sessions where members solve problems and build projects together.',
    },
    {
      icon: Calendar,
      title: 'Tech Events',
      description: 'Hackathons, tech talks, coding competitions and community meetups throughout the year.',
    },
    {
      icon: BookOpen,
      title: 'Workshops',
      description: 'Hands-on workshops on web development, AI/ML, open source, and emerging technologies.',
    },
    {
      icon: Users,
      title: 'Mentorship',
      description: 'Senior members guide juniors through projects, career prep and technical growth.',
    },
    {
      icon: Globe,
      title: 'Open Source',
      description: 'Contributing to open-source projects and building tools that solve real-world problems.',
    },
    {
      icon: Trophy,
      title: 'Competitions',
      description: 'Representing the club in inter-college hackathons, coding contests and tech challenges.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-card/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="What We Do"
          title="Explore, Build and Grow"
          description="From weekly coding sessions to inter-college hackathons — there's always something happening at Code2Chill."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="group p-5 rounded-xl bg-bg-primary border border-border
                         hover:border-green-primary/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-green-primary/10 flex items-center justify-center mb-4
                              group-hover:bg-green-primary/15 transition-colors">
                <activity.icon size={20} className="text-green-primary" />
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                {activity.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Tech Stack Showcase ───────── */
function TechStack() {
  const techs = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
    'Tailwind CSS', 'MongoDB', 'Git', 'Docker', 'TensorFlow',
    'Next.js', 'Express',
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Tech We Love"
          title="Tools and Technologies"
          description="Our members work with a wide range of modern technologies across web, mobile, AI and more."
        />

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {techs.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-lg bg-bg-card border border-border text-text-secondary text-sm font-mono
                         hover:border-green-primary/30 hover:text-green-primary transition-all duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── CTA Section ───────── */
function CallToAction() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-card/50">
      <div className="max-w-3xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-bg-primary border border-border relative overflow-hidden">
          {/* Accent glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-green-primary/60 to-transparent" />

          <div className="w-12 h-12 rounded-xl bg-green-primary/10 flex items-center justify-center mx-auto mb-6">
            <Zap size={24} className="text-green-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Ready to start building?
          </h2>
          <p className="text-text-secondary text-base mb-8 max-w-lg mx-auto">
            Join Code2Chill and become part of a community that codes, creates
            and collaborates. No experience required — just curiosity.
          </p>
          <Link
            to="/join"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-green-primary text-bg-primary font-semibold text-sm
                       hover:bg-green-secondary transition-all duration-200 glow-green-sm"
          >
            Join Us Today
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────── Home Page ───────── */
function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhatWeDo />
      <TechStack />
      <CallToAction />
    </>
  );
}

export default Home;
