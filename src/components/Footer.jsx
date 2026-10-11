import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-[#f8faf8] border-t border-gray-200 text-[#333333] py-4 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-sm font-normal">
                <p className="text-center sm:text-left">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                <p className="text-center sm:text-right text-gray-600">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;