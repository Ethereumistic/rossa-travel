"use client";

import Image from "next/image";
import { Main } from "./components/main/Main";
import { CookieConsent } from "./components/modals/cookies";
import Selector from "./components/ui/Selector";
import HotelList from "./components/hotel/HotelList";
import { useState } from "react";
import { Hotel } from "@/types/hotel";

export default function Home() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchData: any) => {
    setIsLoading(true);
    try {
      console.log('Search data:', searchData); // Debug log
      setHotels(searchData);
    } catch (error) {
      console.error('Error handling search results:', error);
      setHotels([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <Main />
      <div className="-translate-y-48">
      <Selector onSearch={handleSearch} />
        {isLoading ? (
          <div className="text-center py-10">
            <p>Loading hotels...</p>
          </div>
        ) : (
          <div className="mt-12">
            <HotelList hotels={hotels} />
          </div>
        )}
      </div>

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
