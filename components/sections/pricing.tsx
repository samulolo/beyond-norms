import { Reveal } from "@/components/ui/reveal";
import { ReserveSeatButton } from "@/components/ui/reserve-seat-button";
import { SeatsAvailable } from "@/components/ui/seats-available";
import { eventsPlans } from "@/data/plans";

export function Pricing() {
  return (
    <section
      id="tickets"
      className="flex flex-col items-center px-8 py-24 text-center lg:px-16"
    >
      <Reveal>
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
          Tickets
        </p>
        <h2 className="font-serif text-4xl text-primary lg:text-5xl">
          Choose Your Experience
        </h2>
        <p className="mt-4 font-sans text-neutral">
          Spots are strictly limited to preserve the intimacy of the
          gathering.
        </p>
      </Reveal>

      {eventsPlans.length > 0 &&
        eventsPlans.map((plan) => (
          <Reveal
            key={plan.id}
            delay={150}
            className="mt-14 w-full max-w-md text-left"
          >
            <div className="relative overflow-hidden border border-secondary/60 bg-primary/5 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:p-10">
              <SeatsAvailable
                layout="stacked"
                className="mb-8 sm:absolute sm:right-0 sm:top-0 sm:mb-0 sm:w-36 sm:border-r-0 sm:border-t-0"
              />

              <div className="flex flex-col gap-4 sm:pr-40">
                <span className="h-px w-10 bg-secondary" />
                <div>
                  <h3 className="font-serif text-3xl leading-tight text-primary">
                    {plan.name}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-neutral">
                    {plan.description}
                  </p>
                </div>
              </div>

              <div className="my-8 h-px bg-primary/10" />

              <div className="flex items-end justify-between gap-6">
                <p className="font-serif text-6xl leading-none text-primary">
                  &euro;{plan.price}
                </p>
                <span className="pb-2 font-sans text-xs uppercase tracking-[0.2em] text-neutral">
                  Individual
                </span>
              </div>

              <ul className="mt-8 flex flex-col gap-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 font-sans text-sm leading-relaxed text-primary"
                  >
                    <span
                      className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border border-secondary text-xs text-secondary"
                      aria-hidden
                    >
                      &#10003;
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <ReserveSeatButton href="/checkout" className="mt-10 w-full" />
              <p className="mt-4 text-center font-sans text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                Limited capacity to keep the evening intimate.
              </p>
            </div>
          </Reveal>
        ))}
    </section>
  );
}
