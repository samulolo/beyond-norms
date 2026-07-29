import { createCheckoutSession } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { eventsPlans } from "@/data/plans";


export function Pricing() {
  return (
    <section
      id="tickets"
      className="flex flex-col items-center gap-4 px-8 py-24 text-center lg:px-16"
    >
      <Reveal>
        <h2 className="font-serif text-4xl text-primary lg:text-5xl">
          Choose Your Experience
        </h2>
        <p className="mt-4 font-sans text-neutral">
          Spots are strictly limited to preserve the intimacy of the
          gathering.
        </p>
      </Reveal>


      {
        eventsPlans.length > 0 && (
          eventsPlans.map(plan => (
            <Reveal key={plan.id}
              delay={150}
              className="mt-12 flex w-full max-w-sm flex-col gap-6 border border-secondary p-8 text-left"
            >
        
        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-2xl text-primary">
            {plan.name}
          </h3>
          <p className="font-sans text-sm text-neutral">
           {plan.description}
          </p>
        </div>

        <p className="flex items-baseline gap-1 font-serif text-4xl text-primary">
          &euro;85
          <span className="font-sans text-sm text-neutral">/ Individual</span>
        </p>

        <ul className="flex flex-col gap-3">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 font-sans text-sm text-primary"
            >
              <span className="text-sage">&#10003;</span>
              {feature}
            </li>
          ))}
        </ul>

        <form action={createCheckoutSession}>
          <Button
            type="submit"
            className="w-full"
            loadingText="Redirecting to checkout…"
          >
            Reserve Experience
          </Button>
        </form>
      </Reveal>
          ))
        )
      }
      
    </section>
  );
}
