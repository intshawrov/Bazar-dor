'use client';

import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/app/lib/auth-client';

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleProductClick = () => {
    if (isPending) return;

    if (!session) {
      router.push('/sign-in');
      return;
    }

    router.push(`/product/${product?.slug}`);
  };

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
  <div   onClick={handleProductClick}
  className="cursor-pointer">
  <div className="w-full min-w-0 rounded-2xl border border-[#E1E8E1] bg-[#F0F5F0] p-3 sm:p-4 shadow-sm transition-shadow hover:border-[#05893E]">

    {/* Product Name and Unit */}
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f2ed] text-xl sm:h-12 sm:w-12 sm:text-2xl">
        {categoryIcon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="break-words text-sm font-bold leading-5 text-gray-800 sm:text-base">
          {name}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
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
    <div className="mt-4 flex flex-wrap items-end justify-between gap-3  border-gray-200 pt-3">
      <div className="min-w-0">
        <span className="mb-1 block text-xs text-gray-500">
          আজকের দাম
        </span>

        <div className="flex flex-wrap items-baseline gap-1">
          <span className="text-xl font-bold text-gray-900 sm:text-2xl">
            {toBengaliNumber(today)}
          </span>

          <span className="text-xs font-medium text-gray-700 sm:text-sm">
            টাকা
          </span>
        </div>
      </div>

      {yesterday > 0 && (
        <div
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold sm:px-3 ${
            isUp
              ? 'bg-red-100 text-red-600'
              : isDown
                ? 'bg-green-100 text-green-600'
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
  </div>
);

};

export default ProductCard;
