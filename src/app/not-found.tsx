import Link from 'next/link';

/**
 * Catches requests that never matched a locale, so it cannot use the
 * translation context and has to carry its own document shell — the localised
 * 404 lives at [locale]/not-found.tsx.
 */
export default function GlobalNotFound() {
  return (
    <html lang="ro">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'grid',
          placeContent: 'center',
          gap: '1.5rem',
          background: '#08090a',
          color: '#fafafa',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
            color: '#71717a',
            margin: 0,
          }}
        >
          [ 404 ]
        </p>
        <h1 style={{ fontSize: '2.75rem', margin: 0, letterSpacing: '-0.025em' }}>
          404
        </h1>
        <Link
          href="/"
          style={{
            color: '#22d3ee',
            fontSize: '0.9375rem',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          MySaniTrace
        </Link>
      </body>
    </html>
  );
}
