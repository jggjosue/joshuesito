import { AboutSection } from "@/app/[locale]/components/AboutSection";
import { FavoriteProjects } from "@/app/[locale]/components/FavoriteProjects";
import { Hero } from "@/app/[locale]/components/Hero";
import { SectionTwo } from "@/app/[locale]/components/SectionTwo";
import BooksPage from "@/app/[locale]/books/page";

export default function Home() {
  return (
    <div className="max-w-7xl w-full px-4 md:px-8 mx-auto">
      <Hero />
      <SectionTwo />

        {
            /*
             <AboutSection />
            * <FavoriteProjects />
      <BooksPage />
      <Blog />
            * */
        }
    </div>
  );
}
