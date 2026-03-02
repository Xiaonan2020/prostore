import ProductList from "@/components/shared/product/product-list";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";
import { ProductCarousel } from "@/components/shared/product/product-carousel";
import ViewAllProductsButton from '@/components/view-all-products-button';
import IconBoxes from '@/components/icon-boxes';
import DealCountdown from '@/components/deal-countdown';
// export const metadata = {
//   title: 'Home',
//   description: 'Home page',
// };
const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  // console.log(latestProducts);
  const featuredProducts = await getFeaturedProducts();
  return (
    <div className="space-y-8">
      {/* <h2 className="h2-bold">Latest Products</h2> */}
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
      <ViewAllProductsButton />
      <DealCountdown />
      <IconBoxes />
    </div>
  );
};

export default HomePage;
