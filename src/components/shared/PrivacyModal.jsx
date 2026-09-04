import { useEffect } from 'react';

export function PrivacyModal({ onClose }) {
  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
      onClick={onClose}
    >
      <div
        className="max-w-md border-[3px] border-navy bg-surface p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="privacy-title" className="mb-3 text-lg font-extrabold text-navy">
          Privacy
        </h2>
        <div className="space-y-2 text-sm text-navy-soft">
          <p>Your progress stays on your device only. No accounts, no analytics.</p>
          <p>Photos and flags load from ESPN and flagcdn.</p>
          <p>Tap Start Over any time to clear everything.</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full bg-navy px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}
