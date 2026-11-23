import { Info } from 'lucide-react';

// Shown on the login, signup and profile pages so nobody mistakes the
// prototype for real, secure accounts.
function PrototypeNotice() {
  return (
    <div className="flex gap-3 p-3.5 rounded-lg bg-green-primary/5 border border-green-primary/20 text-xs text-text-secondary leading-relaxed">
      <Info size={16} className="text-green-primary shrink-0 mt-0.5" aria-hidden="true" />
      <p>
        <span className="font-semibold text-text-primary">Prototype only.</span>{' '}
        Accounts aren&apos;t created and passwords aren&apos;t checked or saved. Only your
        name and email are kept in this browser tab, and they&apos;re cleared when you
        log out or close the tab.
      </p>
    </div>
  );
}

export default PrototypeNotice;
