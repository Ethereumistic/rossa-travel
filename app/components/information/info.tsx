"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Logo = ({
  title,
  href,
  src,
  className,
}: {
  title: string;
  href: string;
  src: string;
  className?: string;
}) => {
  return (
    <Link href={href} className={cn("flex space-x-2", className)}>
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

