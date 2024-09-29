"use client";
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
  const [hide, setHide] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const isLogIn = pathName.includes("sign-in");
    const isLogUp = pathName.includes("sign-up");

    setHide(isLogIn || isLogUp);
  }, [pathName]);

  return (
    <Provider store={store}>
      {!hide && <HeaderContainer headerComponents={headerComponents} />}
      <div className="min-h-lvh">{child}</div>
      {!hide && <Footer />}

      <ScrollToTop />
    </Provider>
  );
}

export default App;
