"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Logo = ({
  title,
  href,
  src,
}: {
  title: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md "
      />

    </Link>
  );
};

