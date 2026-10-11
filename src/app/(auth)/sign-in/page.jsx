"use client";

import React from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {
  const router = useRouter();

  // Email and password login
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const { data: signInData, error } =
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
          callbackURL: "/",
        });

      if (error) {
        console.error("Sign-in failed:", error);
        toast.error(
          error.message || "ইমেইল অথবা পাসওয়ার্ড ভুল!"
        );
        return;
      }

      if (signInData) {
        toast.success("সফলভাবে লগইন হয়েছে!");

        router.replace("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("লগইন করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  // Google login
  const logIn = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        console.error("Google login failed:", error);
        toast.error(
          error.message || "Google login ব্যর্থ হয়েছে"
        );
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login করা যায়নি।");
    }
  };


  return (
    <div className="flex items-center justify-center bg-[#f2f5f1] px-4 py-12 ">
      <div className="w-full max-w-[460px] rounded-2xl bg-white p-6 shadow-sm sm:p-8">

        <div className="mb-7 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            সাইন ইন
          </h1>

          <p className="text-sm text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <Form
          className="flex flex-col gap-5"
          onSubmit={onSubmit}
        >
          <TextField
            className="flex w-full flex-col gap-2"
            isRequired
            type="email"
            name="email"
          >
            <Label>ইমেইল</Label>

            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            />

            <FieldError />
          </TextField>

          <TextField
            className="flex w-full flex-col gap-2"
            isRequired
            name="password"
          >
            <Label>পাসওয়ার্ড</Label>

            <Input
              name="password"
              type="password"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              autoComplete="current-password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            />

            <FieldError />
          </TextField>

          <Button
            type="submit"
            className="w-full rounded-xl bg-[#05893E] py-3 font-semibold text-white"
          >
            সাইন ইন
          </Button>

          <div className="flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">
              অথবা
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <Button
            type="button"
            onPress={logIn}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition !justify-center"
          >
            <FcGoogle size={20} />
            Google দিয়ে সাইন ইন
          </Button>



          <p className="w-full text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-[#05893E] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
