import { getTranslations } from 'next-intl/server';
import { BellRing, MonitorCheck, Server, Store } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Atmosphere } from '@/components/ui/atmosphere';

type Node = { id: string; title: string; text: string };
type Note = { title: string; text: string };

const icons = [Store, Server, MonitorCheck, BellRing];

/**
 * Where the data goes — distinct from the PLAN → IMPROVE cycle earlier on the
 * page, which is about procedure. This one answers the question managers
 * actually ask second: "so where does all this live?"
 *
 * Drawn in markup rather than shipped as an image because every label is
 * translated three ways, and a baked-in diagram would mean regenerating the
 * whole thing per locale.
 */
export async function Architecture() {
  const t = await getTranslations('home.architecture');
  const nodes = t.raw('nodes') as Node[];
  const notes = t.raw('notes') as Note[];

  return (
    <section className="section-y relative isolate border-b border-border">
      <Atmosphere variant="both" glow="br" grid="left" />
      <Container>
        <SectionLabel id="03">{t('label')}</SectionLabel>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Diagram */}
          <ol className="slide-from-left order-2 lg:order-1">
            {nodes.map((node, index) => {
              const Icon = icons[index] ?? Store;
              return (
                <li key={node.id}>
                  {index > 0 && (
                    <div
                      aria-hidden
                      className="relative ml-7 h-10 w-px overflow-hidden bg-border"
                    >
                      <span
                        className="signal-pulse absolute inset-x-0 top-0 h-6 bg-accent"
                        style={{ animationDelay: `${index * 0.45}s` }}
                      />
                    </div>
                  )}

                  <div className="panel-chamfer flex items-start gap-4 p-5">
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center border border-border text-accent">
                      <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div>
                      <p className="font-mono text-label uppercase text-text-subtle">
                        {node.id} / {node.title}
                      </p>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-text-muted">
                        {node.text}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Copy */}
          <div className="reveal-scroll order-1 lg:order-2">
            <h2 className="text-h1 font-bold">{t('title')}</h2>
            <p className="mt-5 text-body-lg text-text-muted">{t('intro')}</p>

            <ul className="mt-10 border-t border-border">
              {notes.map((note) => (
                <li key={note.title} className="border-b border-border py-5">
                  <h3 className="text-[1.0625rem] font-semibold">
                    {note.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-text-muted">
                    {note.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
