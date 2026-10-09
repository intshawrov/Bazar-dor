import baseURL from '@/services/baseUrl';
import Link from 'next/link';
import React from 'react';

const toBn = (num) => {
    if (num === undefined || num === null || isNaN(num)) return '';
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

const getSingleProduct = async (slug) => {
    
        const res = await fetch(`${baseURL}/products`, { cache: 'no-store' });
        const products = await res.json();

        const matchedProduct = products.find(
            (product) => product.slug === slug
        );

        if (!matchedProduct) return null;

        const singleRes = await fetch(
            `${baseURL}/products/${matchedProduct.id}`,
            { cache: 'no-store' }
        );

        return await singleRes.json();
   
};

const ProductDetails = async ({ params }) => {
    const { slug } = await params;
    const product = await getSingleProduct(slug);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                পণ্য খুঁজে পাওয়া যায়নি।
            </div>
        );
    }

    const todayPrice = product.today || 0;
    const yesterdayPrice = product.yesterday || 0;
    const priceDiff = Math.abs(todayPrice - yesterdayPrice);
    const isPriceUp = product.change?.dir === 'up' || todayPrice >= yesterdayPrice;

    const markets = product.markets || [];
    
    let minPrice = 0;
    let maxPrice = 0;
    let avgPrice = 0;

    if (markets.length > 0) {
        const minValues = markets.map(m => m.min).filter(Boolean);
        const maxValues = markets.map(m => m.max).filter(Boolean);

        minPrice = minValues.length > 0 ? Math.min(...minValues) : 0;
        maxPrice = maxValues.length > 0 ? Math.max(...maxValues) : 0;

        const sumOfAvgs = markets.reduce((acc, m) => acc + ((m.min + m.max) / 2), 0);
        avgPrice = (sumOfAvgs / markets.length).toFixed(2);
    }

    return (
        <div className="min-h-screen bg-[#f3f6f3] p-4 md:p-8 text-gray-800">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Breadcrumb Section */}
                <nav className="text-sm text-gray-600 flex items-center space-x-2">
                    <Link href={'/'}><span>হোম</span></Link>
                    <span>&gt;</span>
                    <span>{product.categoryNameBn || 'চাল'}</span>
                    <span>&gt;</span>
                    <span className="font-semibold text-gray-800">{product.nameBn}</span>
                </nav>

                {/* Main Product Header Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        {/* Dynamic Category/Product Icon */}
                        <div className="w-16 h-16 bg-[#e5ebe5] rounded-2xl flex items-center justify-center text-3xl shrink-0">
                            {product.categoryIcon || product.image || '🍚'}
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {product.nameBn}
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                প্রতি {product.unit === 'kg' ? 'কেজি' : product.unit} • {product.categoryNameBn}
                            </p>
                            <p className="text-xs text-gray-600 mt-2">
                                গতকালের তুলনায় আজ দাম{' '}
                                <span className="font-semibold text-gray-900">
                                    {isPriceUp ? 'বেড়েছে' : 'কমেছে'} - {toBn(priceDiff)} টাকা
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Today's Price Widget */}
                    <div className="bg-[#e2e8e3] p-4 rounded-xl text-center min-w-[140px] w-full md:w-auto">
                        <p className="text-xs text-gray-600 font-medium">আজকের দাম</p>
                        <p className="text-3xl font-bold text-gray-900 my-1">
                            {toBn(todayPrice)}
                        </p>
                        <p className="text-xs text-gray-500">টাকা / {product.unit === 'kg' ? 'কেজি' : product.unit}</p>
                        
                        {product.change?.pct !== undefined && (
                            <div className={`mt-2 text-xs font-semibold flex items-center justify-center gap-1 ${isPriceUp ? 'text-red-500' : 'text-emerald-600'}`}>
                                <span>{isPriceUp ? '▲' : '▼'}</span>
                                <span>{toBn(product.change.pct)}%</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Price Summary Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Minimum Price Card */}
                        <div className="bg-[#f8fbf8] border border-gray-100 p-4 rounded-xl">
                            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
                            <p className="text-2xl font-bold text-emerald-600 my-1">
                                {toBn(minPrice)} টাকা
                            </p>
                            <p className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</p>
                        </div>

                        {/* Maximum Price Card */}
                        <div className="bg-[#f8fbf8] border border-gray-100 p-4 rounded-xl">
                            <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
                            <p className="text-2xl font-bold text-red-500 my-1">
                                {toBn(maxPrice)} টাকা
                            </p>
                            <p className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
                        </div>

                        {/* Average Price Card */}
                        <div className="bg-[#f8fbf8] border border-gray-100 p-4 rounded-xl">
                            <p className="text-xs text-gray-500">গড় দাম</p>
                            <p className="text-2xl font-bold text-emerald-600 my-1">
                                {toBn(avgPrice)} টাকা
                            </p>
                            <p className="text-xs text-gray-400">প্রতি {product.unit === 'kg' ? 'কেজি' : product.unit}-এর হিসাবে</p>
                        </div>
                    </div>
                </div>

                {/* Marketplace Price Table Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-lg font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>

                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-medium">
                                    <th className="p-3">বাজার</th>
                                    <th className="p-3">বিভাগ</th>
                                    <th className="p-3 text-center">সর্বনিম্ন</th>
                                    <th className="p-3 text-center">সর্বাধিক</th>
                                    <th className="p-3 text-right">গড়</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {markets.map((item, index) => {
                                    const marketAvg = ((item.min + item.max) / 2).toFixed(2);
                                    return (
                                        <tr 
                                            key={index} 
                                            className={index % 2 === 1 ? 'bg-[#eef3ee]' : 'bg-white'}
                                        >
                                            <td className="p-3 font-medium text-gray-800">{item.market}</td>
                                            <td className="p-3 text-gray-600">{item.division}</td>
                                            <td className="p-3 text-center text-gray-700">{toBn(item.min)} টাকা</td>
                                            <td className="p-3 text-center text-gray-700">{toBn(item.max)} টাকা</td>
                                            <td className="p-3 text-right font-bold text-gray-900">{toBn(marketAvg)} টাকা</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;