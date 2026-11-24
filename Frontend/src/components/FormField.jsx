import { useState } from 'react';
import { Eye, EyeOff, CircleAlert } from 'lucide-react';

/**
 * Labelled form control with an inline error message.
 *
 *   <FormField id="login-email" label="Email" type="email" ... />
 *   <FormField id="join-year" as="select" label="Year" ...><option/>…</FormField>
 *   <FormField id="join-reason" as="textarea" rows={4} optional ... />
 *
 * - Password inputs get a show/hide toggle.
 * - `optional` replaces the required asterisk with an "Optional" note.
 * - Errors and hints are linked with aria-describedby.
 */
const CONTROL =
  'w-full px-3.5 py-3 rounded-none bg-bg-card border text-text-primary text-sm focus:outline-none transition-colors placeholder:text-text-muted';

function FormField({ id, label, error, type = 'text', hint, optional = false, as = 'input', children, ...inputProps }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = as === 'input' && type === 'password';
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

  const stateClass = error
    ? 'border-danger focus:border-danger'
    : 'border-border-strong focus:border-ink focus:shadow-[inset_0_-2px_0_0_var(--color-accent)]';

  const shared = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    ...inputProps,
  };

  let control;
  if (as === 'select') {
    control = (
      <select {...shared} className={`${CONTROL} ${stateClass} appearance-none pr-10 cursor-pointer`}>
        {children}
      </select>
    );
  } else if (as === 'textarea') {
    control = <textarea {...shared} className={`${CONTROL} ${stateClass} resize-y min-h-[7rem]`} />;
  } else {
    control = (
      <input
        {...shared}
        type={isPassword && showPassword ? 'text' : type}
        className={`${CONTROL} ${stateClass} ${isPassword ? 'pr-11' : ''}`}
      />
    );
  }

  return (
    <div>
      <label htmlFor={id} className="eyebrow !text-text-secondary flex items-baseline justify-between gap-3 mb-2">
        <span>
          {label} {!optional && <span className="text-accent-ink" aria-hidden="true">*</span>}
        </span>
        {optional && <span className="normal-case tracking-normal font-sans text-xs text-text-muted">Optional</span>}
      </label>
      <div className="relative">
        {control}
        {as === 'select' && (
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-text-muted text-xs">
            ▾
          </span>
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((show) => !show)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-text-muted hover:text-text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
          <CircleAlert size={12} aria-hidden="true" className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
