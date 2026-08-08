import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { Atmosphere } from '@/components/ui/atmosphere';

export default function LocaleNotFound() {
  const t = useTranslations('pages.thankYou');

  return (
    <section className="relative isolate">
      <Atmosphere variant="both" glow="center" grid="top" />
      <Container className="flex min-h-[60vh] flex-col justify-center py-20">
        <span className="font-mono text-label uppercase text-text-subtle">
          [ 404 ]
        </span>
        <h1 className="mt-6 text-h1 font-bold">404</h1>
        <div className="mt-9">
          <ButtonLink href="/" variant="secondary" size="lg">
            {t('back')}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
