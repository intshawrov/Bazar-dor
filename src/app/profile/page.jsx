"use client";
import React from 'react';
import { authClient } from '../lib/auth-client';

const Profile = () => {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-neutral-500 font-medium">লোড হচ্ছে...</p>
            </div>
        );
    }

    const user = session?.user || {
        name: "ইউজার",
        email: "email@example.com"
    };
    const firstLetter = user.name ? user.name.charAt(0) : "U";

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-neutral-900">আমার প্রোফাইল</h1>
            <p className="text-neutral-600 mt-2">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

            {/* Top Profile Summary Card */}
            <div className="bg-white rounded-2xl p-8 mt-8 shadow-sm border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    {/* Dynamic First Letter Avatar */}
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0d8239] text-white text-3xl font-bold uppercase shadow-sm">
                        {firstLetter}
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-neutral-900">{user.name}</h2>
                        <p className="text-neutral-600 mt-1">{user.email}</p>
                    </div>
                </div>
                <button 
                    onClick={async () => {
                        await authClient.signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    window.location.href = "/sign-in"; 
                                },
                            },
                        });
                    }}
                    className="border border-red-500 text-red-500 hover:bg-red-50 rounded-lg px-6 py-2 font-medium transition cursor-pointer"
                >
                    সাইন আউট
                </button>
            </div>

            {/* Update Info Form Card */}
            <div className="bg-white rounded-2xl p-8 mt-8 shadow-sm border border-neutral-200">
                <h3 className="text-2xl font-semibold text-neutral-900">তথ্য</h3>
                <div className="mt-6">
                    <label htmlFor="name" className="block text-lg font-medium text-neutral-800">
                        নাম
                    </label>
                    <input 
                        id="name" 
                        type="text" 
                        defaultValue={user.name} 
                        className="w-full mt-2 border border-neutral-300 rounded-lg p-3 outline-none focus:border-[#0d8239] focus:ring-1 focus:ring-[#0d8239] transition text-neutral-800"
                    />
                </div>
                <button className="w-full mt-6 bg-[#0d8239] hover:bg-[#0a6b2f] text-white font-medium rounded-lg py-3 transition shadow-sm cursor-pointer">
                    আপডেট
                </button>
            </div>
        </div>
    );
};

export default Profile;