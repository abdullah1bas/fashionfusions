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

const headerComponents = [HeaderMode, HeaderSearch, HeaderCategories];

function App({ children }) {
  console.log("app");
  const [theme, colorMode] = useMode();

  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <HeaderContainer headerComponents={headerComponents} />
            <div className="min-h-lvh">{children}</div>
            <Footer />
            
            <ScrollToTop />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
