import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import People from "./components/People";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <People />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
