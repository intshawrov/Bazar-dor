import React from 'react';
import MarqueeText from 'react-marquee-text';


const toBengaliNumber = (num) => {
    if (num === undefined || num === null) return '';
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
};

const Marquee = ({ products }) => {
    console.log(products);
    return (
        <div className="bg-[#fcfdfa] border-b border-gray-200 py-2.5">
            <MarqueeText pauseOnHover={true}>
                <div className="flex items-center">
                    {products.map((product) => {
                        const isUp = product.change?.dir === 'up';
                        const changeColor = isUp ? 'text-red-600' : 'text-emerald-600';
                        const ArrowIcon = isUp ? '▲' : '▼';

                        return (
                            <div
                                key={product.id}
                                className="flex items-center gap-2.5 px-6 border-r border-gray-200/80 text-gray-800 text-base font-medium whitespace-nowrap"
                            >
                                <span className="text-xl">{product.image}</span>

                                <span>{product.nameBn}</span>

                                <span>
                                    {toBengaliNumber(product.today)} টাকা/{product.unit === 'kg' ? 'কেজি' : product.unit}
                                </span>

                                {product.change && (
                                    <span className={`flex items-center gap-1 font-semibold ${changeColor}`}>
                                        <span className="text-xs">{ArrowIcon}</span>
                                        <span>{toBengaliNumber(product.change.pct)}%</span>
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquee;