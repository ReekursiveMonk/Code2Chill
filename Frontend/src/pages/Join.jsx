import { useState } from 'react';
import {
  Send,
  CheckCircle2,
  Sparkles,
  Terminal,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

// Shared style for every text input, select and textarea in the form.
const INPUT_CLASS =
  'w-full px-3.5 py-2.5 rounded-lg bg-bg-primary border border-border text-text-primary text-sm focus:outline-none focus:border-accent/60 transition-colors placeholder:text-text-muted';

const INTEREST_OPTIONS = [
  'Web Development',
  'Mobile Apps',
  'AI & Machine Learning',
  'Cloud & DevOps',
  'Competitive Programming',
  'Cybersecurity',
  'UI/UX Design',
  'Open Source',
];

const FAQS = [
  {
    q: 'Do I need prior coding experience to join?',
    a: 'Not at all! Code2Chill welcomes everyone from absolute beginners writing their first "Hello World" to experienced hackers building complex systems. We hold beginner workshops and provide active mentorship.',
  },
  {
    q: 'How much time commitment is expected?',
    a: 'Most members spend 2–4 hours per week attending meetups, weekend coding sprints, or working on collaborative projects at their own pace.',
  },
  {
    q: 'Is membership free?',
    a: 'Yes, 100% free. Code2Chill is an open, student-led community dedicated to peer learning and building cool software together.',
  },
  {
    q: 'What kind of projects will I work on?',
    a: 'You can contribute to club-maintained web apps, open-source utilities, mobile tools, hackathon projects, or pitch your own project to find collaborators.',
  },
];

function Join() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    year: '1st Year',
    branch: '',
    interests: [],
    experience: 'Beginner',
    github: '',
    reason: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return {
          ...prev,
          interests: prev.interests.filter((item) => item !== interest),
        };
      } else {
        return {
          ...prev,
          interests: [...prev.interests, interest],
        };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.branch.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-14">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            badge="Join Code2Chill"
            title="Become a Member"
            description="Ready to code, collaborate, and innovate? Join our community of student builders and creators."
          />
        </div>
      </section>

      {/* Main Content: Form & Benefits */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 animate-enter enter-delay-1">
            <div className="p-5 sm:p-6 rounded-xl bg-bg-card border border-border">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-5 text-accent animate-fade-in">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">
                    Application Recorded
                  </h3>
                  <p className="text-text-secondary text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for your interest, <span className="text-accent font-medium">{formData.fullName}</span>!
                    Your application has been recorded on this page only and has not been sent to the team yet.
                    Online submissions will open soon. For application updates, please check the official Code2Chill website or contact the club's team directly.
                  </p>
                  <div className="inline-block px-4 py-2 rounded-lg bg-bg-primary border border-border text-xs font-mono text-text-muted">
                    Status: <span className="text-accent">Saved on this page only</span>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          year: '1st Year',
                          branch: '',
                          interests: [],
                          experience: 'Beginner',
                          github: '',
                          reason: '',
                        });
                      }}
                      className="px-5 py-2.5 rounded-lg border border-border text-text-secondary text-xs hover:text-text-primary hover:border-accent/30 transition-colors"
                    >
                      Submit Another Response
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="pb-4 border-b border-border">
                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                      Membership Application
                    </h3>
                    <p className="text-xs text-text-muted">
                      Fill out the form below to join the Code2Chill developer community.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                      {error}
                    </div>
                  )}

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="join-fullName" className="block text-xs font-mono text-text-secondary mb-2">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="join-fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Alex Rivera"
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label htmlFor="join-email" className="block text-xs font-mono text-text-secondary mb-2">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="join-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="exampleXXXX@chitkara.edu.in"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  {/* Year & Branch */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="join-year" className="block text-xs font-mono text-text-secondary mb-2">
                        Year of Study
                      </label>
                      <select
                        id="join-year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className={INPUT_CLASS}
                      >
                        <option value="1st Year">1st Year (Freshman)</option>
                        <option value="2nd Year">2nd Year (Sophomore)</option>
                        <option value="3rd Year">3rd Year (Junior)</option>
                        <option value="4th Year">4th Year (Senior)</option>
                        <option value="Postgraduate">Postgraduate</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="join-branch" className="block text-xs font-mono text-text-secondary mb-2">
                        Branch / Major <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="join-branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Computer Science & Eng."
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  {/* Areas of Interest */}
                  <div>
                    <label id="join-interests-label" className="block text-xs font-mono text-text-secondary mb-2">
                      Areas of Interest (Select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2" role="group" aria-labelledby="join-interests-label">
                      {INTEREST_OPTIONS.map((interest) => {
                        const isSelected = formData.interests.includes(interest);
                        return (
                          <button
                            type="button"
                            key={interest}
                            onClick={() => handleInterestToggle(interest)}
                            aria-pressed={isSelected}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                              isSelected
                                ? 'bg-accent/15 text-accent border border-accent/40'
                                : 'bg-bg-primary text-text-secondary border border-border hover:border-accent/50'
                            }`}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Experience Level & GitHub */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="join-experience" className="block text-xs font-mono text-text-secondary mb-2">
                        Coding Experience Level
                      </label>
                      <select
                        id="join-experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className={INPUT_CLASS}
                      >
                        <option value="Beginner">Beginner (Learning syntax / 0-6 months)</option>
                        <option value="Intermediate">Intermediate (Built basic projects / 1-2 years)</option>
                        <option value="Advanced">Advanced (Full-stack, hackathons / 2+ years)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="join-github" className="block text-xs font-mono text-text-secondary mb-2">
                        GitHub / Portfolio (Optional)
                      </label>
                      <input
                        type="url"
                        id="join-github"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder="https://github.com/username"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  {/* Why join */}
                  <div>
                    <label htmlFor="join-reason" className="block text-xs font-mono text-text-secondary mb-2">
                      Why do you want to join Code2Chill?
                    </label>
                    <textarea
                      id="join-reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us what you hope to build, learn or contribute..."
                      className={`${INPUT_CLASS} resize-none`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full group flex items-center justify-center gap-2 py-3 rounded-lg bg-accent text-bg-primary font-semibold text-sm hover:bg-accent-2 transition-all duration-200"
                  >
                    Submit Application
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-center text-[11px] text-text-muted">
                    No membership dues. By applying, you agree to follow our code of conduct.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Benefits & Community Values (5 cols) */}
          <div className="lg:col-span-5 space-y-4 animate-stagger [--stagger-start:180ms]">
            {/* Why Join Card */}
            <div className="p-5 rounded-xl bg-bg-card border border-border">
              <h3 className="text-base font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-accent" />
                Why Join Code2Chill?
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  {
                    title: 'Real-World Team Projects',
                    desc: 'Collaborate with teammates on actual GitHub repositories that enhance your portfolio.',
                  },
                  {
                    title: 'Hands-on Tech Workshops',
                    desc: 'Learn industry tech stacks (React, Node, Python, Docker, AI) from senior peers.',
                  },
                  {
                    title: 'Hackathon Squads',
                    desc: 'Form teams for regional and national hackathons with like-minded coders.',
                  },
                  {
                    title: 'Peer Mentorship & Code Reviews',
                    desc: 'Receive guidance on bugs, resume building, and tech interview prep.',
                  },
                ].map((benefit) => (
                  <li key={benefit.title} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-text-primary text-xs">{benefit.title}</p>
                      <p className="text-text-secondary text-xs leading-relaxed">{benefit.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Club Values Card */}
            <div className="p-5 rounded-xl bg-bg-card border border-border">
              <h3 className="text-base font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Terminal size={18} className="text-accent" />
                Our Code of Conduct
              </h3>
              <div className="space-y-2.5 text-xs text-text-secondary leading-relaxed">
                <p>
                  <strong className="text-text-primary font-mono">&gt; Curiosity first:</strong> No question is too basic. We all started at line 1.
                </p>
                <p>
                  <strong className="text-text-primary font-mono">&gt; Build openly:</strong> Share your knowledge, credit contributors, and write readable code.
                </p>
                <p>
                  <strong className="text-text-primary font-mono">&gt; Inclusive community:</strong> Respect everyone regardless of skill level, background, or identity.
                </p>
              </div>
            </div>

            {/* Contact quick card */}
            <div className="p-5 rounded-xl bg-bg-card border border-border">
              <p className="text-xs text-text-muted mb-1 font-mono">Questions before applying?</p>
              <p className="text-sm text-text-secondary">
                Reach out to the Code2Chill team through the club's official channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            align="left"
            badge="FAQ"
            title="Frequently Asked Questions"
            description="Common questions from aspiring members."
          />

          <div className="animate-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="h-full p-5 rounded-xl bg-bg-card border border-border hover:border-accent/50 transition-colors duration-200"
              >
                <h4 className="text-sm font-semibold text-text-primary mb-2">
                  {faq.q}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Join;
