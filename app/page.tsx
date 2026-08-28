import Banner from "@/components/home/Banner";
import SocialProof from "@/components/home/SocialProof";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import UseCases from "@/components/home/UseCases";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <main className="mx-auto w-full min-h-screen bg-background">
      <Header></Header>
      <Banner />
      <SocialProof />
      <Features />
      <HowItWorks />
      <Pricing />
      <UseCases />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
