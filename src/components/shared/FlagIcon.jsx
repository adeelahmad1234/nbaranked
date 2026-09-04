import { useState } from 'react';
import { flagUrl } from '../../data/countries.js';

export function FlagIcon({ country, countryCode, className = '' }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (!countryCode) return null;

  return (
    <div className={`relative overflow-hidden bg-skeleton-base ${className}`}>
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-skeleton-pulse" aria-hidden="true" />
      )}
      {errored ? (
        <div
          className="absolute inset-0 flex items-center justify-center text-[8px] font-bold uppercase text-navy-soft"
          aria-hidden="true"
        >
          {countryCode}
        </div>
      ) : (
        <img
          src={flagUrl(countryCode)}
          alt={`Flag of ${country}`}
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
