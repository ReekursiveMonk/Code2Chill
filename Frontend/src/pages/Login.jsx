import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import FormField from '../components/FormField';
import { FormAlert, PageLoading } from '../components/DataState';
import { useAuth } from '../context/AuthContext';
import { validateEmail, hasErrors } from '../utils/validation';

const validate = (values) => ({
  email: validateEmail(values.email),
  password: values.password ? '' : 'Please enter your password.',
});

function Login() {
  const { user, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/profile';

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (isLoading) {
    return <PageLoading label="Checking your session…" />;
  }

  if (user && !submitting) {
    return <Navigate to="/profile" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    // Once a field has shown an error, re-check it as the user types.
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(next)[name] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      const firstInvalid = Object.keys(nextErrors).find((key) => nextErrors[key]);
      document.getElementById(`login-${firstInvalid}`)?.focus();
      return;
    }

    setSubmitting(true);
    setFormError('');
    try {
      await login({ email: values.email, password: values.password });
      navigate(redirectTo, { replace: true });
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
      badge="Welcome back"
      title="Log in to Code2Chill"
      subtitle="Pick up where you left off."
      footer={
        <>
          New here?{' '}
          <Link to="/signup" className="text-accent font-medium hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormAlert message={formError} />
        <FormField
          id="login-email"
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
          id="login-password"
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full group flex items-center justify-center gap-2 py-3 rounded-lg bg-accent text-bg-primary font-semibold text-sm hover:bg-accent-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Logging in…' : 'Log In'}
          <LogIn size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
