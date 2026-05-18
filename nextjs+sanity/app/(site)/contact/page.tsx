// @ts-nocheck

import Image from "next/image";
import { PageHeaderContactForm } from "@/components/common/sections/page-header";
import { MarqueeSection } from "@/components/common/sections/marquee-section";
import { CardsSection } from "@/components/common/sections/cards-section";
import { Heading } from "@/components/ui/typography";
import { contactLogos } from "@/content/common/company-logos";
import { navigation } from "@/content/common/navigation";
import { contactJsonLd } from "@/content/structured-data";
import { assetUrl } from "@/lib/config";
import { generateOGMetadata } from "@/lib/utils";

export const metadata = generateOGMetadata({
  title: "Contact Us",
  description: "Get in touch with [PRODUCT] for all your communication needs. Contact us today for support, inquiries, or to learn more about our innovative solutions.",
  openGraph: { url: navigation.contact },
});

export default function ContactPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />

      <PageHeaderContactForm breadcrumbsList={breadcrumbsList} />

      <MarqueeSection
        title="Trusted by leading brands across the world"
        rows={[
          { imgs: contactLogos, direction: 'reverse', speed: '30s' },
        ]}
      />

      <section className="px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-2xl text-center 2xl:max-w-4xl">
          <Heading>
            Think Globally, Operate Locally
          </Heading>
        </div>

        <div className="relative mx-auto mt-8 aspect-[4/1] w-full max-w-full overflow-hidden lg:mt-16 lg:max-w-6xl 2xl:max-w-7xl">
          <Image
            src={assetUrl + "/Frame%2041364.webp"}
            alt="World offices"
            fill={true}
            className="rounded-2xl object-cover"
          />
        </div>
      </section>

      <CardsSection
        variant="horizontalIcons"
        title="Our Offices"
        description="We have the resources, capabilities, and footprint to create your competitive edge, anywhere you operate."
        cards={horizontalIcons}
        className="bg-secondary"
        cta={{
          href: "#contact-form",
          linkText: "Schedule a demo"
        }}
      />
    </main>
  )
}

const breadcrumbsList = [
  {
    label: "Home",
    href: navigation.home,
  },
  {
    label: "Contact",
    href: navigation.contact,
  }
]

const horizontalIcons = [
  {
    title: "Dubai, UAE (HQ)",
    description: "The Offices 6 - Dubai - United Arab Emirates",
    icon: "s-icon__building",
  },
  {
    title: "Cairo, Egypt",
    description: "Nasr City, Cairo Governorate 11431, Egypt",
    icon: "s-icon__building",
  },
  {
    title: "Riyadh, KSA",
    description: "Tawuniya Towers, King Fahd Road, Olayia, Riyadh",
    icon: "s-icon__building",
  },
  {
    title: "Islamabad, Pakistan",
    description: "Block Gulberg Greens, Islamabad, Pakistan",
    icon: "s-icon__building",
  },
  {
    title: "London, United Kingdom",
    description: "The George, 18 Great King St, London WC2B 5DG, UK",
    icon: "s-icon__building",
  },
]
