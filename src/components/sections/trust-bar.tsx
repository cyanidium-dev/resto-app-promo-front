import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';

export async function TrustBar() {
  const t = await getTranslations('home.trust');
  const items = t.raw('items') as string[];

  return (
    <section className="border-b border-border bg-band">
      <Container className="py-10">
        <h2 className="font-mono text-label uppercase text-text-subtle">
          {t('title')}
        </h2>
        <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3">
          {items.map((item, index) => (
            <li key={item} className="flex items-center gap-3">
              {index > 0 && (
                <span aria-hidden className="text-text-subtle">
                  ·
                </span>
              )}
              <span className="text-[0.9375rem] text-text-muted">{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
