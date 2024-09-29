"use client";
import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          text: {
            primary: "#2B3445",
          },
          myColor: {
            main: "#F6F9FC",
          },

          bg: {
            main: "#F6F6F6",
          },

          neutral: {
            main: "#64748B",
          },

          favColor: {
            main: grey[300],
          },
        }
      : {
          // palette values for dark mode
          text: {
            primary: "#fff",
          },

          myColor: {
            main: "#252b32",
          },

          bg: {
            main: "#1D2021",
          },

          neutral: {
            main: "#64748B",
          },

          favColor: {
            main: grey[800],
          },
        }),
  },
});

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("mode") || "light";
      setMode(storedMode);
      document.body.classList.toggle("dark", storedMode === "dark");
    }
  }, []);

  const colorMode = useMemo(() => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === "light" ? "dark" : "light";
          if (typeof window !== "undefined") {
            localStorage.setItem("mode", newMode);
            document.body.classList.toggle("dark", newMode === "dark");
          }
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return [theme, colorMode];
};

// mesh lazem use theme.palette.bg.main === 'bg.main'
