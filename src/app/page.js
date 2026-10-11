import Banner from "@/components/Banner";
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
        <Banner />
        <div className="w-full max-w-[1280px] mx-auto m-10 space-y-3">
          <div className="flex items-center gap-2 mb-4 px-4">
            <span className="text-red-600 text-xs">▲</span>
            <h2 className="text-xl font-bold text-neutral-900">
              আজ দাম বেড়েছে
            </h2>
          </div>
          <div className='container mx-auto mt-7 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {upProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>


          <div className="flex items-center gap-2 mb-4 px-4 mt-8">
            <span className="text-green-600 text-xs">▼</span>
            <h2 className="text-xl font-bold text-neutral-900">
              আজ দাম কমেছে
            </h2>
          </div>
          <div className='container mx-auto mt-7 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {downProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="px-4 mt-8">
            <h2 className="text-xl font-bold text-neutral-900">
              সব পণ্য
            </h2>
            <p>মোট {products.length.toLocaleString('bn-BD')}টি পণ্য দেখানো হচ্ছে</p>
          </div>
          <div className='container mx-auto mt-7 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
