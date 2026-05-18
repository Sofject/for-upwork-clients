// @ts-nocheck

import type { Metadata } from "next";
import { HeroSection } from "@/components/pages/home/hero-section";
import { MarqueeSection } from "@/components/common/sections/marquee-section";
import { AlternatingBlockSection } from "@/components/pages/home/alternating-block-section";
import { MetricsSection } from "@/components/pages/home/metrics-section";
import { ScenarioSolverSection } from "@/components/pages/home/scenario-solver-section";
import { CustomerVideosSection } from "@/components/pages/home/customer-videos-section";
import { CaseStudiesSection } from "@/components/pages/home/case-studies-section";
import { CompactFormSection } from "@/components/common/sections/form-section";
import { CertificationSection } from "@/components/common/sections/certification-section";
import { navigation } from "@/content/common/navigation";
import { homepageLogos1 } from "@/content/common/company-logos";
import { organizationJsonLd } from "@/content/structured-data";
import { assetUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    absolute: "CPaaS & Business Communication Platform | SMS & Voice APIs",
  },
  openGraph: {
    title: {
      absolute: "CPaaS & Business Communication Platform | SMS & Voice APIs"
    },
    url: navigation.home
  },
  twitter: {
    title: {
      absolute: "CPaaS & Business Communication Platform | SMS & Voice APIs"
    },
    card: "summary_large_image"
  }
}

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <HeroSection />

      <MarqueeSection
        title="Trusted by leading enterprises worldwide"
        className="bg-secondary"
        rows={[{ imgs: homepageLogos1, direction: 'forwards', speed: '30s' }]}
      />

      <AlternatingBlockSection />

      <MetricsSection />

      <ScenarioSolverSection />

      <CustomerVideosSection />

      <CaseStudiesSection />

      <CertificationSection />

      <CompactFormSection
        title="Ready to build?"
        description="Join 2,000+ enterprises who chose [PRODUCT] for reliable, scalable, and secure communication infrastructure."
        imgUrl={assetUrl + "/cdn/images/contact/request-a-call.png"}
        imgAlt="Request a call illustration"
        pageName="CPaaS & Business Communication Platform | SMS & Voice APIs"
        pageUri={navigation.home}
        className="bg-white"
      />
    </main>
  );
}
