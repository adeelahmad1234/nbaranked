// Primary buttons are navy-background/white-text (not orange-background) so label
// contrast is never borderline — see the palette's WCAG check in the plan. Secondary
// buttons stay in the same two-color system: navy text/border on white.
const VARIANTS = {
  primary: 'bg-navy text-white disabled:bg-navy-soft disabled:opacity-50',
  secondary: 'bg-surface text-navy border border-navy hover:bg-orange/10',
};

// "lg" is the primary-navigation size (Landing's two entry buttons, the five position
// buttons) — bigger tap targets for accessibility. Everything else (Confirm Cut, Undo,
// Download, Start Over, ...) keeps the original "md" size.
const SIZES = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-5 text-base sm:px-10 sm:text-lg',
};

export function Button({ variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={`font-bold uppercase tracking-wide transition-colors duration-150 disabled:cursor-not-allowed ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
