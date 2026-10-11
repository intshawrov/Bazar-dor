
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import BannerImage from "@/assets/bazar-hero.png";

const toBengaliNumber = (num) => {
    return String(num).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);
};

const Banner = () => {
    const [date, setDate] = useState("");

    useEffect(() => {
        const today = new Date();

        const formattedDate = new Intl.DateTimeFormat("bn-BD", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Dhaka",
        }).format(today);

        setDate(formattedDate);
    }, []);

    return (
        <div className="w-full max-w-[1280px] mx-auto px-4 py-8">
            <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm md:flex-row md:p-12">

                {/* Left Content Section */}
                <div className="z-10 flex max-w-xl flex-col items-start">

                    {/* Date Tag */}
                    <div className="mb-4 inline-flex items-center rounded-full bg-[#e6f4ea] px-4 py-1.5 text-xs font-semibold text-[#0d8239]">
                        {date || "আজকের বাজার"}
                    </div>

                    {/* Main Title */}
                    <h1 className="text-2xl font-extrabold leading-snug tracking-tight text-neutral-900 md:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                        দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* Action Button */}
                    <div className="mt-6">
                        <Link
                            href="/products"
                            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0d8239] px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0a6b2f] active:scale-[0.99]"
                        >
                            সব পণ্য দেখুন
                        </Link>
                    </div>
                </div>

                {/* Right Illustration Section */}
                <div className="z-10 mt-8 flex w-full items-center justify-end md:mt-0">
                    <Image
                        src={BannerImage}
                        alt="বাজারের ফলমূল ও সবজির ঝুড়ি"
                        width={400}
                        height={400}
                        priority
                        className="h-auto w-full max-w-full object-contain md:max-w-[400px]"
                    />
                </div>

            </div>
        </div>
    );
};

export default Banner;
