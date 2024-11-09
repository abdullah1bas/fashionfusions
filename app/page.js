"use client";
import Hero from "./_components/_hero/Hero";
import Main from "./_components/_main/Main";

export default function Home() {
  return (
    <main className="min-h-lvh flex flex-col">
      <Hero />
      <Main IsSearch={false} />
    </main>
  );
}
