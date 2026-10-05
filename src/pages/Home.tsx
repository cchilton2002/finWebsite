import Hero from "../components/Hero";
import Work from "../components/Work";
import People from "../components/People";
import Testimonials from "../components/Testimonials";
import LatestResources from "../components/LatestResources";
import Contact from "../components/Contact";
import Reveal from "../components/Reveal";

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <Reveal><People /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><LatestResources /></Reveal>
      <Reveal><Contact /></Reveal>
    </main>
  );
}
