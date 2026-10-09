import React from 'react';

const ProductCard = ({ product }) => {
  const toBengaliNumber = (num) => {
    const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

    return String(num ?? 0).replace(/\d/g, (digit) => bnNums[digit]);
  };

  const name = product?.nameBn ?? product?.name ?? 'পণ্যের নাম নেই';
  const unit = product?.unit ?? 'kg';
  const today = Number(product?.today ?? 0);
  const yesterday = Number(product?.yesterday ?? 0);
  const categoryIcon = product?.categoryIcon ?? '🛒';

  const priceDifference = today - yesterday;
  const isUp = priceDifference > 0;
  const isDown = priceDifference < 0;

  const changePct =
    yesterday > 0
      ? (Math.abs(priceDifference) / yesterday) * 100
      : 0;

  return (
    <div className="w-full rounded-2xl bg-[#f9faf7] p-4 border border-gray-100 shadow-sm font-sans">

      {/* Product Name and Unit */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-[#f0f2ed] flex items-center justify-center text-xl">
          {categoryIcon}
        </div>

        <div>
          <h3 className="font-bold text-gray-800 text-base leading-tight">
            {name}
          </h3>

          <p className="text-xs text-gray-500 mt-0.5">
            প্রতি{' '}
            {unit === 'kg'
              ? 'কেজি'
              : unit === 'liter'
                ? 'লিটার'
                : unit === 'piece'
                  ? 'টি'
                  : unit}
          </p>
        </div>
      </div>

      {/* Today's Price and Price Change */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="block text-xs text-gray-500 mb-0.5">
            আজকের দাম
          </span>

          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-900">
              {toBengaliNumber(today)}
            </span>

            <span className="text-xs font-medium text-gray-700">
              টাকা
            </span>
          </div>
        </div>

        {yesterday > 0 && (
          <div
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
              isUp
                ? 'bg-red-100/80 text-red-600'
                : isDown
                  ? 'bg-green-100/80 text-green-600'
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            <span className="text-[10px]">
              {isUp ? '▲' : isDown ? '▼' : '—'}
            </span>

            <span>
              {toBengaliNumber(changePct.toFixed(1))}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
