import { getActiveProducts, ShopifyProduct } from '@/lib/shopify';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TrustBadges from '@/components/TrustBadges';
import ProductGrid from '@/components/ProductGrid';
import DoctorSpotlight from '@/components/DoctorSpotlight';
import Footer from '@/components/Footer';
import GeminiChatDrawer from '@/components/GeminiChatDrawer';

export default async function HomePage() {
  let products: ShopifyProduct[] = [];
  try {
    products = await getActiveProducts();
  } catch (err) {
    console.error('Failed to fetch products from Shopify:', err);
  }

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-slate-800 selection:bg-sky-200 selection:text-sky-900">
      <Navbar />
      <HeroSection />
      <TrustBadges />
      <ProductGrid products={products} />
      <DoctorSpotlight />
      <Footer />
      <GeminiChatDrawer products={products} />
    </main>
  );
}