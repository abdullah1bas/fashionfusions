"use client";
// import { Box, Stack } from "@mui/material";
import Hero from "./_components/_hero/Hero";
import Main from "./_components/_main/Main";
// import { useMode } from "./_style/theme";

export default function Home() {
  // const [theme] = useMode();
  return (
    <div className="flex flex-col">
      <div 
      // bgcolor={theme.palette.bg.main}
      >
        <Hero />
        <Main IsSearch={false} />
      </div>
    </div>
  );
}
