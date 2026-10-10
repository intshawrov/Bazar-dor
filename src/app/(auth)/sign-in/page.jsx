"use client";
import React from 'react';
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from '@/app/lib/auth-client';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';


const SignInPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        const { data: signInData, error } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
            // rememberMe: true, 
            callbackURL: "/",
        });

        console.log(signInData);
    };

    const logIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
    <div className="flex  items-center justify-center bg-[#f2f5f1] px-4 py-12">
      <div className="w-full max-w-[460px]">
        {/* Header Section */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-neutral-900">সাইন ইন</h1>
          <p className="mt-2 text-sm text-neutral-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Form Container Card */}
        <Form
          className="flex flex-col gap-5 rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-sm"
          onSubmit={onSubmit}
        >
          {/* Email Field */}
          <TextField
            isRequired
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-neutral-800">
              ইমেইল
            </Label>
            <Input
              name="email"
              placeholder="you@example.com"
              className="h-11 rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 text-sm text-neutral-900 outline-none transition focus:border-emerald-600 focus:bg-white"
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            minLength={8}
            type="password"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-neutral-800">
              পাসওয়ার্ড
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="h-11 rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 text-sm text-neutral-900 outline-none transition focus:border-emerald-600 focus:bg-white"
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Main Submit Button */}
          <Button
            type="submit"
            className="mt-2 h-11 w-full rounded-xl bg-[#038843] font-semibold text-white shadow-sm hover:bg-[#027037] active:scale-[0.99] transition-all"
          >
            সাইন ইন
          </Button>

          {/* Divider */}
          <div className="relative my-1 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <span className="relative bg-white px-3 text-xs text-neutral-500">
              অথবা
            </span>
          </div>

          {/* Social Sign In Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full ">
            <Button
              type="button"
              onClick={logIn}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition !justify-center"
            >
              <FcGoogle className="h-4 w-4" />
              <span>Google দিয়ে চালিয়ে যান</span>
            </Button>

            <Button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition !justify-center"
            >
              <FaGithub className="h-4 w-4 text-neutral-900" />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-2 text-center text-xs font-medium text-neutral-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-[#038843] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </div>
        </Form>

        {/* Back to Home Link */}
        <div className="mt-6 text-center text-xs font-medium text-neutral-500">
          <Link href="/" className="hover:text-neutral-800 transition">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;