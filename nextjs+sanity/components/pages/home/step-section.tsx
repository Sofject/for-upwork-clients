// @ts-nocheck

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heading, SubHeading, TextBody } from "@/components/ui/typography";
import { navigation } from "@/content/common/navigation";

export function StepSection() {
  return (
    <section className="px-4 py-16 lg:py-28">
      <div className="mx-auto w-full max-w-2xl text-center 2xl:max-w-4xl">
        <Heading>
          Get Results in 3 Simple Steps
        </Heading>
      </div>

      <div className="mx-auto mt-8 w-full max-w-full lg:mt-16 max lg:max-w-6xl 2xl:max-w-7xl grid grid-cols-1 justify-items-stretch gap-x-8 md:grid-cols-3 md:justify-items-center xl:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <Step
          number="1"
          title="Connect Your Channels"
          description="Link SMS, WhatsApp, Voice, and Email in minutes through our pre-built integrations."
          icon="s-icon__instant-connectivity"
        />

        <StepArrow />

        <Step
          number="2"
          title="Unify Your Communications"
          description="Manage all customer conversations from one intelligent inbox with AI assistance."
          icon="s-icon__server"
        />

        <StepArrow />

        <Step
          number="3"
          title="Scale and Automate Conversations"
          description="Deploy chatbots, automated campaigns, and smart routing to handle thousands of conversations."
          icon="s-icon__data-driven-decision-making"
        />
      </div>
      <div className="mt-12 flex justify-center lg:mt-16">
        <Button asChild size="lg">
          <Link href={navigation.contact}>Book a demo</Link>
        </Button>
      </div>
    </section>
  );
}

type StepProps = {
  number: string;
  title: string;
  description: string;
  icon: string;
}

function Step({ number, title, description, icon }: StepProps) {
  return (
    <article className="row-span-2 grid grid-cols-1 grid-rows-subgrid items-start md:items-center max-w-xs mx-auto">
      <div className="relative flex w-full flex-col items-center rounded-2xl border bg-secondary p-4 md:p-6 lg:p-8">
        <span className="absolute top-5 left-5 flex size-10 sm:size-12 items-center justify-center rounded-full bg-white text-xl sm:text-2xl font-bold 2xl:size-14 2xl:text-3xl">
          {number}
        </span>
        <div className="h-full flex items-center justify-center">
          <i className={`s-icon ${icon} text-primary text-9xl`} />
        </div>
      </div>
      <div className="row-start-2 mt-4 self-start text-center md:text-left">
        <SubHeading>{title}</SubHeading>
        <TextBody className="mt-2 sm:mt-3 lg:mt-4">{description}</TextBody>
      </div>
    </article>
  );
}

function StepArrow() {
  return (
    <div aria-hidden="true" className="flex w-full min-w-0 md:max-xl:hidden">
      <svg width="100" height="24" viewBox="0 0 100 24" fill="none" className="mx-auto h-40 rotate-90 transform md:h-auto md:rotate-0">
        <path d="M0 12h94m0 0l-8-8m8 8l-8 8" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
