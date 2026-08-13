import Banner from "@/components/home/Banner";
// import { Dot } from "lucide-react";
import SocialProof from "@/components/home/SocialProof";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import Header from "@/components/home/Header";

export default function Home() {
  return (
    <main className="mx-auto w-full min-h-screen bg-background">
      {/* bg-[radial-gradient(#0D9488_1px,transparent_1px)] [bg-size:16px_16px] */}
      <Header></Header>
      <Banner />

      <SocialProof />
      <Features />
      <HowItWorks />
      <Pricing />
      {/* <HowItWorks />
      <Divider />
      <Pricing />
      <Divider />
      <Footer /> */}
    </main>
  );
}
