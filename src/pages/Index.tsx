import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Inquiry from "@/components/Inquiry";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero />
      <Services />
      <Experience />
      <Inquiry />
      <Footer />
    </div>
  );
};

export default Index;
