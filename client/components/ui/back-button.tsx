"use client";

import Link from "next/link";
import { Button } from "./button";

interface BackButtonProps{
    href: string;
    label: string;
    request: string;
}

export const BackButton = (
    {
        href,
        label,
        request,
    }: BackButtonProps
) => {
  return (
    <>
    <p className="font-normal w-auto text-sm">{request}</p>
     <Button
      variant="link"
      className="w-auto text-[#9400FF] text-sm"
      asChild
    >
        <Link href={href}>
           {label}
        </Link>

    </Button>
    </>
   
  )
}
