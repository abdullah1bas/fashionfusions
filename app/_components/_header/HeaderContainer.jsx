import React from "react";
import { useHide } from "../useHide";

const HeaderContainer = ({ headerComponents }) => {
  const hide = useHide();
  const child = headerComponents.map((child, index) => {
    let Element = child;
    return <div key={index}>{React.cloneElement(<Element />)}</div>;
  });
  return <>{!hide && child}</>;
};

export default HeaderContainer;
