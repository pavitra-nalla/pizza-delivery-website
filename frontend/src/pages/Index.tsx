import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedPizzas from '@/components/FeaturedPizzas';
import WhyChooseUs from '@/components/WhyChooseUs';
import CustomerReviews from '@/components/CustomerReviews';
import AppCTA from '@/components/AppCTA';
import Footer from '@/components/Footer';

const Index = () => (
  <>
    <Navbar />
    <HeroSection />
    <FeaturedPizzas />
    <WhyChooseUs />
    <CustomerReviews />
    <AppCTA />
    <Footer />
  </>
);

export default Index;
