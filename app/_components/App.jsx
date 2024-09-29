"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../_style/theme";
import { Provider } from "react-redux";
import { store } from "../_redux/store";
import Footer from "./Footer";
import "../_i18n/i18n";
import HeaderContainer from "./_header/HeaderContainer";
import HeaderMode from "./_header/HeaderMode";
import HeaderSearch from "./_header/HeaderSearch";
import HeaderCategories from "./_header/HeaderCategories";
import ScrollToTop from "./ScrollToTop";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const headerComponents = [HeaderMode, HeaderSearch, HeaderCategories];

function App({ child }) {
  const [theme, colorMode] = useMode();
  const [hide, setHide] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const isLogIn = pathName.includes("sign-in");
    const isLogUp = pathName.includes("sign-up");
    const isPaymentConfirm = pathName.includes("payment-confirm");
    const isCheckout = pathName.includes("checkout");

    setHide(isLogIn || isLogUp || isPaymentConfirm || isCheckout);
  }, [pathName]);

  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            {!hide && <HeaderContainer headerComponents={headerComponents} />}
            <div className="min-h-lvh">{child}</div>
            {!hide && <Footer />}
            
            <ScrollToTop />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
