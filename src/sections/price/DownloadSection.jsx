
import Button from "../../components/common/Button";
import ScrollRevealText from "../../components/common/ScrollRevealText";

export default function DownloadSection() {
  return (
    <section className="w-full border-b border-[#D8D8CC] px-5 pt-24 pb-14 text-center text-[#1C300D] sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
      <div className="mx-auto flex min-h-[240px] w-full flex-col items-center justify-center px-2 sm:px-10">

        {/* Heading */}
        <h2 className="max-w-5xl text-3xl font-semibold leading-[1.12] tracking-[-0.045em] sm:text-4xl md:text-5xl lg:text-[48px]">
          <ScrollRevealText text="Download the Wapezy app and start free." />
        </h2>

        {/* Description */}
        <div className="mt-4 max-w-xl text-sm font-medium leading-6 text-[#1C300D]/70 sm:text-base sm:leading-7">
          <ScrollRevealText text="15 days free. Sign up in the app, connect your WhatsApp and go live. Cancel anytime." />
        </div>

        {/* Google Play CTA */}
        <Button
          className="mt-7 bg-gradient-to-tr font-medium from-green-400 to-green-500 text-white"
          as="a"
          href="https://play.google.com/store/apps/details?id=com.wapezy.mobile"
        >
          Get it on Google Play
        </Button>

        {/* Alternative signup */}
        <p className="mt-5 text-sm text-[#1C300D]/65 font-medium sm:text-base">
          On an iPhone or a computer?{" "}
          <a
            href="https://app.wapezy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#1C300D] transition-opacity hover:opacity-60"
          >
            Sign up at app.wapezy.com
          </a>
        </p>

      </div>
    </section>
  );
}
