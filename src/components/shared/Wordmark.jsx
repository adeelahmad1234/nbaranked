// Inline SVG text renders more consistently than layered CSS text-shadow, both live and
// inside html-to-image's canvas snapshot on the results screen.
export function Wordmark({
  className = '',
  fill = 'var(--color-orange)',
  stroke = 'var(--color-navy)',
  strokeWidth = 3,
  align = 'center',
}) {
  return (
    <svg viewBox="0 0 760 90" className={className} role="img" aria-label="nbaRANKED.com">
      <text
        x={align === 'start' ? '0' : '50%'}
        y="66"
        textAnchor={align === 'start' ? 'start' : 'middle'}
        fontFamily="'Manrope Variable', ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="72"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        paintOrder="stroke fill"
      >
        nbaRANKED.com
      </text>
    </svg>
  );
}
