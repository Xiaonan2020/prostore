import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
// export const metadata = {
//   title: 'Home',
//   description: 'Home page',
// };
const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  // console.log(latestProducts);
  return (
    <div className="space-y-8">
      <h2 className="h2-bold">Latest Products</h2>
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </div>
  );
};

export default HomePage;
