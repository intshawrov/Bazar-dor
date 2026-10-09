import ProductCard from '@/components/ProductCard';
import baseURL from '@/services/baseUrl';
import Link from 'next/link';
import React from 'react';


const getCategoryProdects = async (categorySlug) => {
    const res = await fetch(`${baseURL}/products?category=${categorySlug}`);
    const data = res.json();
    return data;

}

const getCategories = async () => {
    const res = await fetch(`${baseURL}/categories`, {
        cache: "force-cache",
    });
    const data = await res.json();
    return data;
};

const CategoryProducts = async ({ params }) => {

    const { categorySlug } = await params;
    console.log(categorySlug);
    const categoryProdects = await getCategoryProdects(categorySlug);
    console.log(categoryProdects);

    const categories = await getCategories();

    const currentCategory = categories.find(c => c.slug == categorySlug);
    console.log(currentCategory);
    return (
        <div>
            {/* Breadcrumb */}
            <div className='flex g-1 container mx-auto'>
                <Link href={'/'}>হোম</Link>
                <span> › </span>
                <p>{currentCategory?.nameBn}</p>
            </div>

            <div className='container mx-auto flex items-center gap-2.5 border border-[#E1E8E1] rounded-2xl mt-6 p-5'>
                <div>
                    <p className='text-3xl'>{currentCategory?.icon}</p>
                </div>
                <div>
                    <p>{currentCategory.nameBn}</p>
                    <p>{categoryProdects.length.toLocaleString('bn-BD')} টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                </div>
            </div>

            <div className='grid grid-cols-4 container mx-auto mt-7 gap-5'>
                {categoryProdects.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;