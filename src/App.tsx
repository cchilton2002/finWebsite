import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MarkFlow from "./components/MarkFlow";
import Home from "./pages/Home";
import ResourcesPage from "./pages/ResourcesPage";

// Scrolls to #hash targets after navigation, or to the top on a new page.
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <div className="relative">
        <MarkFlow />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
