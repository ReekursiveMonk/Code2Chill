import { useState } from 'react';
import { Eye, EyeOff, CircleAlert } from 'lucide-react';

/**
 * Labelled input with an inline error message.
 * Password fields get a show/hide toggle. Styling matches the Join Us form.
 */
function FormField({ id, label, error, type = 'text', hint, ...inputProps }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono text-text-secondary mb-2">
        {label} <span className="text-accent">*</span>
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && showPassword ? 'text' : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`w-full px-3.5 py-2.5 ${isPassword ? 'pr-11' : ''} rounded-lg bg-bg-primary border text-text-primary text-sm focus:outline-none transition-colors placeholder:text-text-muted ${
            error
              ? 'border-red-400/60 focus:border-red-400'
              : 'border-border focus:border-accent/60'
          }`}
          {...inputProps}
        />
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
        <p id={hintId} className="mt-1.5 text-[11px] text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
          <CircleAlert size={12} aria-hidden="true" className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
