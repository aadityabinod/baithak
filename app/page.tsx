import { redirect } from "next/navigation";
import { Navbar } from "./components/landingPage/Navbar";
import { Hero } from "./components/landingPage/Hero";
import { Testimonial } from "./components/landingPage/Testimonial";
import { auth } from "./lib/auth";
import { CTA } from "./components/landingPage/Cta";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return redirect("/dashboard");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Testimonial />
      <CTA />
    </div>
  );
}
