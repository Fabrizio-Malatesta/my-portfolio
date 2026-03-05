import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Research from "@/components/Research";
import Leadership from "@/components/Leadership";
import Skills from "@/components/Skills";
import Gallery from "@/components/Gallery";
import Media from "@/components/Media";
import ResumeSection from "@/components/ResumeSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#020817] min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Research />
      <Leadership />
      <Skills />
      <Gallery />
      <Media />
      <ResumeSection />
      <Footer />
    </main>
  );
}
