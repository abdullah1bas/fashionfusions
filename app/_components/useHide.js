'use client'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useHide = () => {
  const [hide, setHide] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const isLogIn = pathName.includes("sign-in");
    const isLogUp = pathName.includes("sign-up");
    const isPaymentConfirm = pathName.includes("payment-confirm");
    const isCheckout = pathName.includes("checkout");

    setHide(isLogIn || isLogUp || isPaymentConfirm || isCheckout);
  }, [pathName]);
  return hide;
};