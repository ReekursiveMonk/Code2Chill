import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import FormField from '../components/FormField';
import Button from '../components/Button';
import { FormAlert } from '../components/DataState';
import { submitJoinApplication } from '../services/api';
import { validateEmail } from '../utils/validation';

// Option values must match the backend (models/JoinApplication.js).
const YEAR_OPTIONS = [
  { value: '1st Year', label: '1st Year (Freshman)' },
  { value: '2nd Year', label: '2nd Year (Sophomore)' },
  { value: '3rd Year', label: '3rd Year (Junior)' },
  { value: '4th Year', label: '4th Year (Senior)' },
  { value: 'Postgraduate', label: 'Postgraduate' },
];

const EXPERIENCE_OPTIONS = [
  { value: 'Beginner', label: 'Beginner (Learning syntax / 0-6 months)' },
  { value: 'Intermediate', label: 'Intermediate (Built basic projects / 1-2 years)' },
  { value: 'Advanced', label: 'Advanced (Full-stack, hackathons / 2+ years)' },
];

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

const BENEFITS = [
  'Learn alongside fellow students.',
  'Collaborate on practical projects.',
  'Discover hackathons and technical events.',
  'Develop teamwork and problem-solving skills.',
];

const CODE_OF_CONDUCT = [
  ['Curiosity first', 'No question is too basic. We all started at line 1.'],
  ['Build openly', 'Share your knowledge, credit contributors, and write readable code.'],
  ['Inclusive community', 'Respect everyone regardless of skill level, background, or identity.'],
];

const FAQS = [
  {
    q: 'Do I need prior coding experience to join?',
    a: 'Not at all! Code2Chill welcomes everyone from absolute beginners writing their first "Hello World" to experienced hackers building complex systems. Opportunities to learn through workshops, peer collaboration, and guidance from other members.',
  },
  {
    q: 'How much time commitment is expected?',
    a: "There's no fixed time requirement. Members can participate in events and projects at their own pace.",
  },
  {
    q: 'Is membership free?',
    a: 'Membership details, including any applicable costs, will be shared by the club team after your application is reviewed.',
  },
  {
    q: 'What kind of projects will I work on?',
    a: 'You can contribute to club-maintained web apps, open-source utilities, mobile tools, hackathon projects, or pitch your own project to find collaborators.',
  },
];

const EMPTY_FORM = {
  fullName: '',
  email: '',
  year: '1st Year',
  branch: '',
  interests: [],
  experience: 'Beginner',
  github: '',
  reason: '',
};

// Browser-side checks for the required fields. The server checks everything
// again and its field messages are shown the same way.
function validate(values) {
  return {
    fullName: values.fullName.trim() ? '' : 'Please enter your full name.',
    email: validateEmail(values.email),
    branch: values.branch.trim() ? '' : 'Please enter your branch or major.',
  };
}

/* ───────── Success state ───────── */
function Submitted({ name, onReset }) {
  return (
    <div role="status" className="border-t border-ink pt-10 animate-enter">
      <p className="eyebrow !text-sage-deep mb-4">Application received</p>
      <h2 className="display-md text-text-primary">
        Thank you, <em className="text-accent">{name}.</em>
      </h2>
      <p className="mt-5 text-text-secondary leading-relaxed max-w-lg">
        Your application has been received and will be reviewed by the Code2Chill team.
      </p>
      <dl className="mt-8 inline-flex items-baseline gap-4 border border-border px-4 py-3">
        <dt className="eyebrow">Status</dt>
        <dd className="text-sm font-semibold text-text-primary">Pending review</dd>
      </dl>
      <div className="mt-10">
        <button type="button" onClick={onReset} className="tap text-sm font-medium link-quiet">
          Submit another response
        </button>
      </div>
    </div>
  );
}

function Join() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the person edits it.
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(formData);
    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      setError('Please fix the highlighted fields.');
      const firstInvalid = Object.keys(nextErrors).find((key) => nextErrors[key]);
      document.getElementById(`join-${firstInvalid}`)?.focus();
      return;
    }
    setErrors({});
    setError('');
    setSubmitting(true);
    try {
      await submitJoinApplication(formData);
      setSubmitted(true);
      window.scrollTo({ top: 0 });
    } catch (err) {
      // Show the server's field messages next to their fields, plus its message.
      if (err.errors) setErrors(err.errors);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData(EMPTY_FORM);
    setErrors({});
    setError('');
  };

  return (
    <div className="pb-20 sm:pb-28">
      <PageHeader
        eyebrow="Join Us"
        index="05"
        title={
          <>
            Become a <em className="text-accent">member</em>
          </>
        }
        intro="Ready to code, collaborate, and innovate? Join our community of student builders and creators."
      />

      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
        {/* Form */}
        <section aria-labelledby="application-heading" className="lg:col-span-7 animate-enter enter-delay-2">
          {submitted ? (
            <Submitted name={formData.fullName.trim()} onReset={resetForm} />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="border-t border-ink pt-8">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2 id="application-heading" className="display-sm text-text-primary">
                  Membership application
                </h2>
                <p className="eyebrow hidden sm:block">
                  <span className="text-accent-ink">*</span> Required
                </p>
              </div>
              <p className="text-sm text-text-secondary mb-8">
                Fill out the form below to join the Code2Chill developer community.
              </p>

              <div className="space-y-6">
                <FormAlert message={error} />

                {/* 01 About you */}
                <fieldset>
                  <legend className="eyebrow !text-text-primary mb-5 flex items-center gap-3 float-left w-full">
                    <span className="text-text-muted">01</span> About you
                  </legend>
                  <div className="clear-both grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      id="join-fullName"
                      name="fullName"
                      label="Full name"
                      autoComplete="name"
                      placeholder="Alex Rivera"
                      value={formData.fullName}
                      onChange={handleChange}
                      error={errors.fullName}
                    />
                    <FormField
                      id="join-email"
                      name="email"
                      type="email"
                      label="Email address"
                      autoComplete="email"
                      placeholder="exampleXXXX@chitkara.edu.in"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                    <FormField
                      id="join-year"
                      name="year"
                      as="select"
                      label="Year of study"
                      optional
                      value={formData.year}
                      onChange={handleChange}
                      error={errors.year}
                    >
                      {YEAR_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </FormField>
                    <FormField
                      id="join-branch"
                      name="branch"
                      label="Branch / major"
                      placeholder="e.g. Computer Science & Eng."
                      value={formData.branch}
                      onChange={handleChange}
                      error={errors.branch}
                    />
                  </div>
                </fieldset>

                {/* 02 Interests */}
                <fieldset className="pt-6 border-t border-border">
                  <legend className="eyebrow !text-text-primary mb-2 flex items-center gap-3 float-left w-full">
                    <span className="text-text-muted">02</span> Areas of interest
                  </legend>
                  <p className="clear-both text-sm text-text-secondary mb-4">Select all that apply.</p>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map((interest) => {
                      const isSelected = formData.interests.includes(interest);
                      return (
                        <button
                          type="button"
                          key={interest}
                          onClick={() => handleInterestToggle(interest)}
                          aria-pressed={isSelected}
                          className={`min-h-[2.75rem] px-3.5 py-2 text-sm border transition-colors duration-200 ${
                            isSelected
                              ? 'bg-ink text-paper border-ink'
                              : 'bg-transparent text-text-secondary border-border-strong hover:border-ink hover:text-text-primary'
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                  {errors.interests && <p className="mt-2 text-xs text-danger">{errors.interests}</p>}
                </fieldset>

                {/* 03 Experience */}
                <fieldset className="pt-6 border-t border-border">
                  <legend className="eyebrow !text-text-primary mb-5 flex items-center gap-3 float-left w-full">
                    <span className="text-text-muted">03</span> Experience
                  </legend>
                  <div className="clear-both grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      id="join-experience"
                      name="experience"
                      as="select"
                      label="Coding experience"
                      optional
                      value={formData.experience}
                      onChange={handleChange}
                      error={errors.experience}
                    >
                      {EXPERIENCE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </FormField>
                    <FormField
                      id="join-github"
                      name="github"
                      type="url"
                      label="GitHub / portfolio"
                      optional
                      placeholder="https://github.com/username"
                      value={formData.github}
                      onChange={handleChange}
                      error={errors.github}
                    />
                  </div>
                  <div className="mt-5">
                  <FormField
                    id="join-reason"
                    name="reason"
                    as="textarea"
                    rows={4}
                    label="Why do you want to join Code2Chill?"
                    optional
                    placeholder="Tell us what you hope to build, learn or contribute..."
                    value={formData.reason}
                    onChange={handleChange}
                    error={errors.reason}
                  />
                  </div>
                </fieldset>

                <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center gap-5 sm:justify-between">
                  <p className="text-xs text-text-muted max-w-xs">
                    By applying, you agree to follow our code of conduct.
                  </p>
                  <Button type="submit" disabled={submitting} className="group sm:min-w-[14rem]">
                    {submitting ? 'Submitting…' : 'Submit application'}
                    <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </form>
          )}
        </section>

        {/* Side column */}
        <aside className="lg:col-span-4 lg:col-start-9 space-y-14 animate-enter enter-delay-3">
          <section aria-labelledby="why-join">
            <h2 id="why-join" className="eyebrow !text-text-primary border-t border-ink pt-3 mb-6">
              Why join Code2Chill?
            </h2>
            <ol className="space-y-6">
              {BENEFITS.map((benefit, index) => (
                <li key={benefit} className="grid grid-cols-[2rem_1fr] gap-2 items-baseline">
                  <span className="eyebrow" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="font-display text-lg tracking-[-0.02em] text-text-primary">{benefit}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="conduct" className="bg-sage p-6 sm:p-8">
            <h2 id="conduct" className="eyebrow !text-ink mb-5">
              Our code of conduct
            </h2>
            <dl className="space-y-4">
              {CODE_OF_CONDUCT.map(([term, desc]) => (
                <div key={term}>
                  <dt className="font-display text-lg tracking-[-0.02em] text-ink">{term}</dt>
                  <dd className="text-sm text-ink/80 leading-relaxed">{desc}</dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="text-sm text-text-secondary border-t border-border pt-5">
            <span className="eyebrow block mb-2">Questions before applying?</span>
            Reach out to the Code2Chill team through the club&apos;s official channels.
          </p>
        </aside>
      </div>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="wrap mt-24 sm:mt-32">
        <div className="rule-ink pt-3 flex items-baseline justify-between">
          <p className="eyebrow !text-text-primary">FAQ</p>
        </div>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 id="faq-heading" className="display-md text-text-primary">
              Frequently asked <em className="text-accent">questions</em>
            </h2>
            <p className="mt-4 text-text-secondary">Common questions from aspiring members.</p>
          </div>
          <dl className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border-t border-border py-6">
                <dt className="font-display text-xl tracking-[-0.02em] text-text-primary mb-2">{faq.q}</dt>
                <dd className="text-sm text-text-secondary leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}

export default Join;
