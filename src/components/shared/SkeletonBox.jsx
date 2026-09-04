export function SkeletonBox({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-skeleton-pulse ${className}`}
      aria-hidden="true"
    />
  );
}
