// @ts-nocheck

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heading, TextBody } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type CtaSectionProps = {
  title: string;
  description: string;
  btnText: string;
  btnHref: string;
  className?: string;
}

export function CtaSection({ title, description, btnText, btnHref, className }: CtaSectionProps) {
  return (
    <section className={cn("bg-secondary py-16 sm:py-20 lg:py-24 px-4", className)}>
      <div className="mx-auto w-full max-w-2xl text-center 2xl:max-w-4xl">
        <Heading>
          {title}
        </Heading>

        <TextBody className="mt-4 sm:mt-6 lg:mt-8">
          {description}
        </TextBody>

        <div className="mt-12 flex justify-center lg:mt-16">
          <Button size="lg" asChild>
            <Link href={btnHref}>{btnText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
