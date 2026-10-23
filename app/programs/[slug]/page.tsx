import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { programBySlug, programs } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const program = programBySlug(slug);

  if (!program) return { title: "Program not found" };

  return {
    title: program.title,
    description: program.summary,
    alternates: { canonical: `/programs/${program.slug}` },
    openGraph: {
      title: `${program.title} | Impact Generation Global`,
      description: program.summary,
      images: [{ url: program.image, alt: program.imageAlt }],
    },
  };
}

export default async function ProgramPage({ params }: Params) {
  const { slug } = await params;
  const program = programBySlug(slug);

  if (!program) notFound();

  const others = programs.filter((item) => item.slug !== program.slug).slice(0, 3);

  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-brand-950 text-white">
        <Image
          src={program.image}
          alt={program.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />

        <div className="absolute inset-0 bg-linear-to-b from-brand-950/85 via-brand-950/80 to-brand-950/95" />

        <div className="shell relative py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="text-xs font-semibold text-brand-200/80">
            <Link href="/programs" className="hover:text-gold-300">
              Programs
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-white">{program.title}</span>
          </nav>

          <h1 className="display mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            {program.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-100/90 sm:text-lg sm:leading-8">
            {program.summary}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/donate" className="btn btn-gold">
              Support this program
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Partner with us
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow">About the Program</p>

            <h2 className="display mt-3 text-3xl text-brand-950 sm:text-4xl">
              How it works
            </h2>

            <p className="prose-body mt-5">{program.description}</p>

            <h3 className="mt-9 text-lg font-bold text-brand-950">
              What the program focuses on
            </h3>

            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {program.focus.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl bg-cream-100 px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 font-bold text-brand-700"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="card overflow-hidden lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] bg-slate-100">
              <Image
                src={program.image}
                alt={program.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover"
              />
            </div>

            <div className="p-5 sm:p-6">
              {program.stat ? (
                <>
                  <p className="text-3xl font-bold text-brand-800">
                    {program.stat.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {program.stat.label}
                  </p>
                  <hr className="my-5 border-slate-100" />
                </>
              ) : null}

              <p className="text-sm leading-6 text-slate-600">
                Want this program in your school, church or community? We would
                love to hear from you.
              </p>

              <Link
                href="/contact"
                className="btn btn-primary mt-4 w-full text-sm"
              >
                Talk to our team
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* OTHER PROGRAMS */}
      <section className="section bg-cream-100">
        <div className="shell">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="display text-2xl text-brand-950 sm:text-3xl">
              Explore other programs
            </h2>

            <Link
              href="/programs"
              className="text-sm font-bold text-brand-800 hover:underline"
            >
              View all programs →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/programs/${item.slug}`}
                className="card card-hover flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-brand-950">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">
                    {item.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
