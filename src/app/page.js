import Marquee from "@/components/Marquee";
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

  const downProducts = products.filter(p => p.change.dir === 'down').sort((a, b) => a.change.pct - b.change.pct).slice(0, 6);
  const upProducts = products.filter(p => p.change.dir === 'up').sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);

  console.log(downProducts)
  return (
    <>
      <div>
        <Marquee products={products}></Marquee>
        <div className="container mx-auto mt-8 space-y-5">
          <div>
            <p>আজ দাম বেড়েছে</p>
          </div>
          <div className='container mx-auto mt-7 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {upProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>


          <div>
            <p>আজ দাম কমেছে</p>
          </div>
          <div className='container mx-auto mt-7 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {downProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div>
            <p>সব পণ্য</p>
            <p>মোট {products.length.toLocaleString('bn-BD')}টি পণ্য দেখানো হচ্ছে</p>
          </div>
          <div className='container mx-auto mt-7 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
