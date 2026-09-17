import { useState } from 'react';
import { Wordmark } from './Wordmark.jsx';
import { PrivacyModal } from './PrivacyModal.jsx';

// A slim navy bar carries the wordmark on every screen. This also fixes a contrast
// problem the plan's original "wordmark floating on the raw orange page" idea had:
// the wordmark's orange fill would be invisible against an orange page background
// (same hue, same value). Orange-on-navy verifies at 4.63:1, well within AA for text
// this large, and gives the brand a consistent, structured presence instead of only
// appearing once on the landing screen.
export function Header({ onLogoClick, onReset }) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <header className="flex items-center justify-between bg-navy px-4 py-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={onLogoClick}
          aria-label="Go to the home screen"
          className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Wordmark className="h-7 w-auto sm:h-9" />
        </button>
        <button
          type="button"
          onClick={onReset}
          className="shrink-0 whitespace-nowrap border border-white/30 px-1.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white/70 outline-none hover:border-white/60 hover:text-white focus-visible:text-white sm:px-2 sm:text-xs"
        >
          <span className="sm:hidden">Reset</span>
          <span className="hidden sm:inline">Reset Progress</span>
        </button>
      </div>
      <button
        type="button"
        onClick={() => setPrivacyOpen(true)}
        className="shrink-0 text-xs font-bold uppercase tracking-wide text-white/70 outline-none hover:text-white focus-visible:text-white"
      >
        Privacy
      </button>
      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
    </header>
  );
}
