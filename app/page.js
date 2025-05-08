import Hero from "./_components/_hero/Hero";
import dynamic from "next/dynamic";
import Loading from "./_components/Loading";

const Main = dynamic(() => import("./_components/_main/Main"), {
  loading: () => <Loading />,
  ssr: false,
});
export default function Home() {
  return (
    <main className="min-h-lvh flex flex-col">
      <Hero />
      <Main IsSearch={false} />
    </main>
  );
}
