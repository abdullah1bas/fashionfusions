import { Box, CircularProgress } from "@mui/material";
import Hero from "./_components/_hero/Hero";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("./_components/_main/Main"), {
  loading: () => (
    <Box sx={{ py: 11, textAlign: "center" }}>
      <CircularProgress />
    </Box>
  ),
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
