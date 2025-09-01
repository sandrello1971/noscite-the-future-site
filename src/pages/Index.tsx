import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Partners />
        <Services />
        <Testimonials />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
