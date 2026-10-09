"use client";
import { useState, useEffect } from "react";
import { Link, Button } from "@heroui/react";
import Image from "next/image";
import Logo from "@/assets/logo-icon.png";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";


export default function Navbar({ categories = [] }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = authClient.useSession();
    const [formattedDate, setFormattedDate] = useState("");
    const router = useRouter();

    console.log(session);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in"); // redirect to login page
                },
            },
        });

    }

    console.log(categories);

    useEffect(() => {
        const dateStr = new Intl.DateTimeFormat("bn-BD", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date());

        setFormattedDate(dateStr);
    }, []);

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="mx-auto flex h-16 container mx-auto  justify-between px-6">
                <div className="flex w-full justify-between items-center">
                    <Link href="/" className="no-underline hover:no-underline">
                        <div className="flex items-center gap-3">
                            <Image
                                src={Logo}
                                alt="Bazar Dor"
                                width={40}
                                height={40}
                                className="bg-[#05893E] p-2 rounded-xl"
                            />
                            <div className="flex flex-col">
                                <p className="font-bold">বাজার দর</p>
                                <p className="text-sm text-gray-500">
                                    {formattedDate}
                                </p>
                            </div>
                        </div>
                    </Link>

                    <button
                        className="ml-auto md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
                <div className="hidden w-full justify-end items-center gap-4 md:flex">
                    {session?.user ? <><Button onClick={handleSignOut}>Logout</Button></> :
                        <> <Link href="/sign-in" className="no-underline hover:no-underline">সাইন ইন</Link>
                            <Link href="sign-up" className="no-underline hover:no-underline"><div className="bg-[#05893E] py-3 rounded-xl px-5 text-white font-semibold text-sm leading-[21px]">সাইন আপ</div></Link>
                        </>}

                </div>
            </header>
            <div className="border-t border-gray-200">
                <div className="container mx-auto hidden gap-3 px-4 py-4  list-none sm:flex sm:flex-wrap sm:gap-8">
                {
                    categories?.map(cat => <li key={cat?.id}><Link href={`/category/${cat?.slug}`} className="flex items-center gap-2 no-underline"><span>{cat?.icon}</span>{cat?.nameBn}</Link></li>)
                }
            </div>
            </div>
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-2 p-4">
                        {/* Categories */}
                        {categories?.map((cat) => (
                            <li key={cat.id} className="list-none">
                                <Link
                                    href={`/category/${cat.slug}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm no-underline hover:bg-gray-100"
                                >
                                    <span className="text-xl">{cat.icon}</span>
                                    <span>{cat.nameBn}</span>
                                </Link>
                            </li>
                        ))}
                        <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                            <Link href="#" className="block py-2">
                                সাইন ইন
                            </Link>
                            <Button className="w-full">সাইন আপ</Button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

