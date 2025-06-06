import HeroImage from "@/public/better.png";
import Image from "next/image";
import { AuthModal } from "./AuthModal";

export function Hero() {
  return (
    <section className="relative py-16 bg-gradient-to-tr from-background via-muted to-accent dark:to-[#202034] transition-colors duration-500">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-4 md:px-8">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start md:items-start">
          {/* Outline Badge */}
          

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground dark:text-white mb-4">
            Meet <span className="text-primary">without the mess</span>.<br />
            <span className="text-muted-foreground">Scheduling, reimagined.</span>
          </h1>

          {/* Subtitle */}
          <p className="mb-7 text-base md:text-lg text-muted-foreground max-w-md">
            Ditch the back-and-forth emails. Baithak helps teams, freelancers, and teachers coordinate meetings effortlessly, so you can focus on what matters.
          </p>

          {/* CTA as a group */}
          <div>
            <AuthModal />
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="flex-1 flex justify-center items-center relative w-full max-w-lg md:max-w-none">
          {/* Patterned SVG background */}
          <svg
            className="absolute -top-16 -right-16 w-[360px] h-[360px] blur-[90px] opacity-60 -z-10"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="heroPattern" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#22d3ee" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="200" fill="url(#heroPattern)" />
          </svg>
          <Image
            src={HeroImage}
            alt="Baithak interface preview"
            className="rounded-3xl shadow-xl border border-muted-foreground/10"
            priority
          />
        </div>
      </div>
    </section>
  );
}