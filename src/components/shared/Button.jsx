// Primary buttons are navy-background/white-text (not orange-background) so label
// contrast is never borderline — see the palette's WCAG check in the plan. Secondary
// buttons stay in the same two-color system: navy text/border on white.
const VARIANTS = {
  primary: 'bg-navy text-white disabled:bg-navy-soft disabled:opacity-50',
  secondary: 'bg-surface text-navy border border-navy hover:bg-orange/10',
};

export function Button({ variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors duration-150 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
