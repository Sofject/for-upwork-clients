// @ts-nocheck

import { Button } from "@/components/ui/button";
import { Heading, TextBody } from "@/components/ui/typography";
import { assetUrl } from "@/lib/config";
import Link from "next/link";

export function AlternatingBlockSection() {
  return (
    <section className="px-4 py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto mt-8 w-full max-w-full lg:max-w-6xl 2xl:max-w-7xl lg:mt-16 space-y-24 lg:space-y-36">
        {alternatingBlocks.map((block, index) => (
          <Block
            key={index}
            subtitle={block.subtitle}
            title={block.title}
            description={block.description}
            video={block.video}
            poster={block.poster}
            btnText={block.btnText}
            href={block.href}
          />
        ))}
      </div>
    </section>
  );
}

function Block({ title, subtitle, description, btnText, video, poster, href }: { title: string, subtitle: string, description: string, btnText: string, video: string, poster: string, href: string }) {
  return (
    <article className="relative grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 group">
      <div className={`flex flex-col justify-center max-w-full mx-auto justify-self-start md:group-even:order-last z-10`}>
        <Heading className="uppercase text-primary font-semibold text-xs sm:text-xs lg:text-sm 2xl:text-sm lg:leading-none">{title}</Heading>
        <Heading asChild className="mt-1 sm:mt-2 2xl:text-4xl"><h3>{subtitle}</h3></Heading>
        <TextBody className="mt-4 sm:mt-6 lg:mt-8">{description}</TextBody>
        <Button
          className="mt-8 self-start transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
          variant="default"
          size="sm"
          asChild
        >
          <Link href={href}>
            {btnText}
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-center z-10">
        <video 
          src={assetUrl + video}
          poster={assetUrl + poster}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-112 object-contain"
        />
      </div>

      <img
        src={assetUrl + "/cdn/images/home/redesign/circle-decoration.png"}
        alt="Circle decoration"
        className="absolute top-1/20 left-full size-32 opacity-60 pointer-events-none hidden md:block md:group-even:hidden"
      />
      <img
        src={assetUrl + "/cdn/images/home/redesign/circle-decoration.png"}
        alt="Circle decoration"
        className="absolute top-3/4 left-11/12 size-48 opacity-60 pointer-events-none hidden md:block md:group-even:hidden"
      />
      <img
        src={assetUrl + "/cdn/images/home/redesign/circle-decoration.png"}
        alt="Circle decoration"
        className="absolute top-3/5 right-11/12 size-48 opacity-60 pointer-events-none hidden md:block md:group-odd:hidden"
      />
    </article>
  );
}

const alternatingBlocks = [
  {
    title: "Platform Applications",
    subtitle: "No-code tools to helps marketers launch campaigns in minutes",
    description: "Build multi-channel campaigns, manage conversations, and track performance - no developer required.",
    video: "/cdn/images/home/redesign/platform-applications.webm",
    poster: "/cdn/images/home/redesign/platform-applications-poster.webp",
    btnText: "View Applications →",
    href: "/products/platform-apps"
  },
  {
    title: "Programmable API's",
    subtitle: "SMS, Whatsapp, Email, and voice API's for your existing systems",
    description: "Start small or scale globally. Our API's provide the secure, reliable foundation you need to connect with customer worldwide.",
    video: "/cdn/images/home/redesign/vhub.webm",
    poster: "/cdn/images/home/redesign/vhub-poster.webp",
    btnText: "Learn More →",
    href: "/products/programmable-apis"
  },
  {
    title: "Conversational AI",
    subtitle: "Unify, automate, and scale conversations into relationships",
    description: "Handle every customer interaction from one inbox with AI assistance, real-time translation, and sentiment analysis across all channels.",
    video: "/cdn/images/home/redesign/omni.webm",
    poster: "/cdn/images/home/redesign/omni-poster.webp",
    btnText: "Learn More →",
    href: "/products/conversations-ai"
  },
]
