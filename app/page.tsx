import Banner from "@/components/home/Banner";
import SocialProof from "@/components/home/SocialProof";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import Header from "@/components/home/Header";

export default function Home() {
  return (
    <main className="mx-auto w-full min-h-screen bg-background">
      <Header></Header>
      <Banner />

      <SocialProof />
      <Features />
      <HowItWorks />
      <Pricing />
      {/*<Footer /> */}
    </main>
  );
}
