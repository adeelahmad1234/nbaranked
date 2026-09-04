import { useState } from 'react';

// Headshot <img> with a skeleton while loading and a graceful fallback on error.
// crossOrigin="anonymous" is required (not just the CDN's CORS header) for the
// results-screen PNG export to embed this image instead of tainting the canvas.
export function PlayerImage({ src, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-skeleton-base ${className}`}>
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-skeleton-pulse" aria-hidden="true" />
      )}
      {errored ? (
        <div
          className="absolute inset-0 flex items-center justify-center px-2 text-center text-xs text-navy-soft"
          aria-hidden="true"
        >
          Photo unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          crossOrigin="anonymous"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`h-full w-full object-cover transition-opacity duration-200 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
