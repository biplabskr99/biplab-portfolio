import { Hero } from "@/components/sections/Hero";
import { Specialization } from "@/components/sections/Specialization";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { ScrollStepper } from "@/components/ui/ScrollStepper";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full overflow-hidden">
      <ScrollStepper />
      <Hero />
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <Specialization />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </div>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-stone-500 text-sm border-t border-amber-300 mt-12 bg-amber-100/50">
        <p>© {new Date().getFullYear()} Biplab. All rights reserved.</p>
      </footer>
    </main>
  );
}
