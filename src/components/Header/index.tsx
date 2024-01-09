"use client";
import Image from "next/image";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header: FC<HeaderProps> = () => {
  const navigation = useRouter();
  return (
    <header>
      <nav className="px-6 py-5 bg-white border-b-2 border-black">
        <ul className="flex justify-between items-center">
          <li className="flex">
            <Link href="/">
              <Image
                src="/assets/logo.svg"
                alt="logo"
                width="200"
                height="300"
              />
            </Link>
            <div className="ml-8 hidden md:block">
              <a
                href="#"
                className="px-2 text-sm hover:text-gray-600 text-black"
              >
                Recipes
              </a>
              <a
                href="#"
                className="px-2 text-sm hover:text-gray-600 text-black"
              >
                Ingrédients
              </a>
            </div>
          </li>
          <div className="flex items-center">
            <li className="mx-4">
              <span className="text-gray-400">|</span>
            </li>
            <li className="">
              <Button
                onClick={() => {
                  navigation.push("/signin");
                }}
                variant="secondary"
              >
                Signup
              </Button>
            </li>
            {/* <li className=''>
                            <span className='text-gray-400'>|</span>
                        </li> */}
            {/* <li className=''>
                            <a href="/auth/signin" className='px-2 text-sm hover:text-gray-600 text-black'>Login</a>
                        </li> */}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

type HeaderProps = {};
