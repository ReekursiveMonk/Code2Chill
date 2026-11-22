import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { TEAM_DATA } from '../data/team';
import { GithubIcon, LinkedinIcon, XIcon } from '../components/BrandIcons';

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function MemberCard({ member, isLead = false }) {
  const socialLinks = [
    { icon: GithubIcon, href: member.github, label: 'GitHub' },
    { icon: LinkedinIcon, href: member.linkedin, label: 'LinkedIn' },
    { icon: XIcon, href: member.twitter, label: 'X' },
  ].filter((s) => s.href && s.href !== '#');

  return (
    <div
      className={`group p-5 rounded-xl bg-bg-card border transition-all duration-300 ${
        isLead
          ? 'border-green-primary/30 hover:border-green-primary/50'
          : 'border-border hover:border-green-primary/20'
      }`}
    >
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm ${
            isLead
              ? 'bg-green-primary/15 text-green-primary'
              : 'bg-bg-primary text-text-muted border border-border'
          }`}
        >
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
          ) : (
            getInitials(member.name)
          )}
        </div>
        <div>
          <h3 className="text-base font-semibold text-text-primary group-hover:text-green-primary transition-colors">
            {member.name}
          </h3>
          <p className="text-xs font-mono text-green-primary/80">{member.role}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-text-secondary text-sm leading-relaxed mb-4">
        {member.bio}
      </p>

      {/* Social Links */}
      <div className="flex gap-2">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="p-2 rounded-lg text-text-muted hover:text-green-primary hover:bg-green-primary/10 transition-all duration-200"
          >
            <social.icon size={15} />
          </a>
        ))}
      </div>
    </div>
  );
}

function Team() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            badge="Our Team"
            title="Meet the People Behind Code2Chill"
            description="The core team that organises events, leads workshops, maintains projects and keeps the community running."
          />
        </div>
      </section>

      {/* Lead Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-sm font-mono font-medium text-green-primary/70 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Code2 size={14} /> Club Lead
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM_DATA.leads.map((member) => (
              <MemberCard key={member.name} member={member} isLead />
            ))}
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-sm font-mono font-medium text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
            <Code2 size={14} /> Core Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM_DATA.core.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team CTA */}
      <section className="px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 sm:p-8 rounded-xl bg-bg-card border border-border text-center">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Want to join the core team?
            </h3>
            <p className="text-text-secondary text-sm mb-5">
              Active members can apply for core team roles. Lead a domain, run
              events or contribute to the club's growth.
            </p>
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-primary text-bg-primary font-semibold text-sm
                         hover:bg-green-secondary transition-all duration-200"
            >
              Apply to Join
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
