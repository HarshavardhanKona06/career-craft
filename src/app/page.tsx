import HomePage from "@/components/sections/home-page";
import { Metadata } from 'next'

export const metadata:Metadata = {
    title: "Welcome to CareerCraft",
}

export default function Home() {
  return (
      <main>
        <HomePage />
      </main>
  );
}
