import { LoaderCircle, CircleAlert, RefreshCw } from 'lucide-react';

/**
 * Shared loading / error / empty messages for data loaded from the API.
 * Styled to match the existing empty states on the Events and Projects pages.
 */

export function LoadingState({ label = 'Loading…' }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-12 text-center">
      <LoaderCircle size={28} className="text-accent animate-spin" aria-hidden="true" />
      <p className="text-text-secondary text-sm">{label}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 py-12 text-center">
      <CircleAlert size={32} className="text-red-400" aria-hidden="true" />
      <p className="text-text-secondary text-sm max-w-md">
        {message || 'Something went wrong while loading this content.'}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-text-primary text-sm font-medium hover:border-accent hover:text-accent transition-colors duration-200"
        >
          <RefreshCw size={14} aria-hidden="true" />
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon: Icon, message }) {
  return (
    <div className="text-center py-12">
      {Icon && <Icon size={40} className="text-text-muted mx-auto mb-4" aria-hidden="true" />}
      <p className="text-text-secondary text-sm">{message}</p>
    </div>
  );
}

/** Small label for placeholder content stored with isSample: true. */
export function SampleBadge() {
  return (
    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider text-text-muted border border-border">
      Sample
    </span>
  );
}

/** Form-level error message (e.g. wrong password, server unreachable). */
export function FormAlert({ message }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
    >
      <CircleAlert size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

/** Full-page loading state used while a stored login is being checked. */
export function PageLoading({ label }) {
  return (
    <div className="pt-24 pb-14 px-4">
      <LoadingState label={label} />
    </div>
  );
}
