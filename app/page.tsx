"use client";

import Image from "next/image";
import { Main } from "./components/main/Main";
import { CookieConsent } from "./components/modals/cookies";
import Selector from "./components/ui/Selector";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <Main />

      <h1 className="text-4xl font-bold my-32">Hello</h1>
      <h1 className="text-4xl font-bold my-32">Hello</h1>
      <h1 className="text-4xl font-bold my-32">Hello</h1>
      <h1 className="text-4xl font-bold my-32">Hello</h1>
      <h1 className="text-4xl font-bold my-32">Hello</h1>
      <h1 className="text-4xl font-bold my-32">Hello</h1>
      <h1 className="text-4xl font-bold my-32">Hello</h1>
      <h1 className="text-4xl font-bold my-32">Hello</h1>
      <h1 className="text-4xl font-bold my-32">Hello</h1>
      <CookieConsent />
    </div>
  );
}
