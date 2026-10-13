import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CafeHighlights from "./components/CafeHighlights";
import AboutSection from "./components/AboutSection";
import FoodCategories from "./components/FoodCategories";
import MenuSection from "./components/MenuSection";
import CoffeeExperience from "./components/CoffeeExperience";
import PhotoMarquee from "./components/PhotoMarquee";
import SignatureFavourites from "./components/SignatureFavourites";
import ExperienceGallery from "./components/ExperienceGallery";
import EnquirySection from "./components/EnquirySection";
import ReviewsSection from "./components/ReviewsSection";
import LocationSection from "./components/LocationSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import { useLenis } from "./hooks/useLenis";
import { registerGSAP } from "./animations/gsapSetup";

registerGSAP();

export default function App() {
  useLenis();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main" className="site-main">
        <HeroSection />
        <CafeHighlights />
        <AboutSection />
        <FoodCategories />
        <MenuSection />
        <CoffeeExperience />
        <PhotoMarquee />
        <SignatureFavourites />
        <ExperienceGallery />
        <EnquirySection />
        <ReviewsSection />
        <LocationSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
