import { useRef } from "react";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import LogoSection from "./components/LogoSection";

import Hero from "./sections/Hero/Hero";
import Conversation from "./sections/conversation/ConversationFlowSection";
import BusinessSection from "./sections/Business/BusinessSection";
import ReasonSection from "./sections/reason/Reason";
import SectionFAQ from "./sections/faq/SectionFAQ";

import PriceSection from "./sections/price/PriceSection";
import DownloadSection from "./sections/price/DownloadSection";

import VideoSection from "./sections/uses/VideoSection";
import VideoSplitSection from "./sections/uses/VideoSplitSection";

import useLenis from "./hooks/useLenis";
import useBackgroundTransition from "./hooks/animations/useBackgroundTransition";

function App() {
  const pageRef = useRef(null);

  useLenis();
  useBackgroundTransition(pageRef);

  return (
    <main className="relative isolate min-h-screen bg-green-400 text-black">
      {/* Fixed logo behind the website */}
      <LogoSection />

      {/* Main website content */}
      <div
        ref={pageRef}
        className="site-wrapper relative z-10 min-h-screen bg-[#84fc90]"
      >
        <Navbar />

        <Hero />

        <Conversation />

        <VideoSection />

        <VideoSplitSection />

        <BusinessSection />

        <ReasonSection />

        <SectionFAQ />

        <PriceSection />

        <DownloadSection />

        <Footer />
      </div>

      {/* Logo reveal scroll space */}
      <div className="relative z-10 h-[50vh] w-full pointer-events-none max-sm:h-[18svh]" />
    </main>
  );
}

export default App;
