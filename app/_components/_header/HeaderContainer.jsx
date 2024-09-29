/* eslint-disable react/prop-types */
import React from "react";

const HeaderContainer = ({ headerComponents }) => {
  const child = headerComponents.map((child, index) => {
    let Element = child;
    return <div key={index}>{React.cloneElement(<Element />)}</div>;
  });
  return <>{child}</>;
};

export default HeaderContainer;
