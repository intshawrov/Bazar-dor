import ProductCard from '@/components/ProductCard';
import SortDropdown from '@/components/SortDropdown';
import baseURL from '@/services/baseUrl';
import React, { Suspense } from 'react';

const getCategoryProdects = async (categorySlug) => {
    const res = await fetch(
        `${baseURL}/products?category=${encodeURIComponent(categorySlug)}`,
        {
            cache: 'force-cache',
        }
    );

    if (!res.ok) {
        throw new Error('Products fetch failed');
    }

    return await res.json();
};

const getCategories = async () => {
    const res = await fetch(`${baseURL}/categories`, {
        cache: 'force-cache',
    });

    if (!res.ok) {
        throw new Error('Categories fetch failed');
    }

    return await res.json();
};

// Async component: all runtime data access stays inside Suspense
async function CategoryProductsContent({ params, searchParams }) {
    const { categorySlug } = await params;
    const resolvedSearchParams = await searchParams;

    const sortQuery =
        resolvedSearchParams?.sort || 'highest-increase';

    const [productsData, categoriesData] = await Promise.all([
        getCategoryProdects(categorySlug),
        getCategories(),
    ]);

    const categoryProducts = Array.isArray(productsData)
        ? [...productsData]
        : [];

    const categories = Array.isArray(categoriesData)
        ? categoriesData
        : [];

    const currentCategory = categories.find(
        (category) => category.slug === categorySlug
    );

    const getPriceDifference = (product) =>
        Number(product.today ?? 0) -
        Number(product.yesterday ?? 0);

    switch (sortQuery) {
        case 'highest-increase':
            categoryProducts.sort(
                (a, b) =>
                    getPriceDifference(b) - getPriceDifference(a)
            );
            break;

        case 'lowest-increase':
            categoryProducts.sort(
                (a, b) =>
                    getPriceDifference(a) - getPriceDifference(b)
            );
            break;

        case 'high-to-low':
            categoryProducts.sort(
                (a, b) =>
                    Number(b.today ?? 0) - Number(a.today ?? 0)
            );
            break;

        case 'low-to-high':
            categoryProducts.sort(
                (a, b) =>
                    Number(a.today ?? 0) - Number(b.today ?? 0)
            );
            break;

        default:
            break;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="px-4 sm:px-0">
                <div className="w-full max-w-[1280px] mx-auto flex items-center gap-2.5 border border-[#E1E8E1] rounded-2xl mt-6 p-5">
                    <div>
                        <p className="text-3xl">
                            {currentCategory?.icon}
                        </p>
                    </div>

                    <div>
                        <p>
                            {currentCategory?.nameBn || categorySlug}
                        </p>

                        <p>
                            {categoryProducts.length.toLocaleString('bn-BD')}
                            {' '}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>

                <div className="w-full max-w-[1280px] mx-auto mt-6 flex justify-end">
                    <SortDropdown />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[1280px] mx-auto mt-7 gap-5">
                    {categoryProducts.length > 0 ? (
                        categoryProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center py-10">
                            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Parent component does not access params or searchParams
export default function CategoryProducts(props) {
    return (
        <Suspense
            fallback={
                <div className="text-center py-10">
                    লোড হচ্ছে...
                </div>
            }
        >
            <CategoryProductsContent {...props} />
        </Suspense>
    );
}
