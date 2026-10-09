import ProductCard from "@/components/ProductCard";
import baseURL from "@/services/baseUrl";
import Image from "next/image";




const getProducts = async () => {
  const res = await fetch(`${baseURL}/products`, {
    cache: "force-cache",
  });
  const data = await res.json();
  return data;
};

export default async function Home() {

  const products = await getProducts();

  const downProducts = products.filter(p => p.change.dir == 'down');
  console.log(downProducts)
  return (
    <>
      <div className="container mx-auto mt-8">
        <div>
          <p>আজ দাম কমেছে</p>
        </div>
        <div className='grid grid-cols-4 container mx-auto mt-7 gap-5'>
          {downProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
