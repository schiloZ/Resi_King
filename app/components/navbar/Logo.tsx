"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      alt="logo"
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
      src="/images/log3.png"
    />
  );
};

export default Logo;
