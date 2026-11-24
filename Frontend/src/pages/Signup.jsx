import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import FormField from '../components/FormField';
import { FormAlert, PageLoading } from '../components/DataState';
import { useAuth } from '../context/AuthContext';
import {
  validateName,
  validateEmail,
  validateNewPassword,
  validateConfirmPassword,
  hasErrors,
} from '../utils/validation';

const EMPTY = { name: '', email: '', password: '', confirmPassword: '' };

const validate = (values) => ({
  name: validateName(values.name),
  email: validateEmail(values.email),
  password: validateNewPassword(values.password),
  confirmPassword: validateConfirmPassword(values.password, values.confirmPassword),
});

function Signup() {
  const { user, isLoading, signup } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (isLoading) {
    return <PageLoading label="Checking your session…" />;
  }

  if (user && !submitting) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    const latest = validate(next);
    // Re-check fields that already show an error. Changing the password also
    // re-checks the confirmation, since it depends on it.
    setErrors((prev) => {
      const updated = { ...prev };
      if (prev[name]) updated[name] = latest[name];
      if (name === 'password' && prev.confirmPassword) {
        updated.confirmPassword = latest.confirmPassword;
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      const firstInvalid = Object.keys(nextErrors).find((key) => nextErrors[key]);
      document.getElementById(`signup-${firstInvalid}`)?.focus();
      return;
    }

    setSubmitting(true);
    setFormError('');
    try {
      await signup({ name: values.name, email: values.email, password: values.password });
      navigate('/', { replace: true });
    } catch (error) {
      setSubmitting(false);
      if (error.errors) {
        setErrors((prev) => ({ ...prev, ...error.errors }));
      } else {
        setFormError(error.message);
      }
    }
  };

  return (
    <AuthLayout
      badge="Sign up"
      title={
        <>
          Create your <em className="text-accent">account.</em>
        </>
      }
      subtitle="Sign up to get your Code2Chill profile and a personal home page for events, projects and the team."
      aside={
        <p className="text-sm text-text-muted max-w-sm leading-relaxed">
          An account is separate from a club membership application. To apply to the club, use the{' '}
          <Link to="/join" className="link-quiet text-text-primary">
            Join Us form
          </Link>
          .
        </p>
      }
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-text-primary link-quiet">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormAlert message={formError} />
        <FormField
          id="signup-name"
          name="name"
          label="Full Name"
          autoComplete="name"
          placeholder="Your full name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormField
          id="signup-email"
          name="email"
          type="email"
          label="Email Address"
          autoComplete="email"
          placeholder="exampleXXXX@chitkara.edu.in"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormField
          id="signup-password"
          name="password"
          type="password"
          label="Password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          hint="Use at least 8 characters."
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <FormField
          id="signup-confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-dark w-full group"
        >
          {submitting ? 'Creating account…' : 'Sign Up'}
          <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </AuthLayout>
  );
}

export default Signup;
