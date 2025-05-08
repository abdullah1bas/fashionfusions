import { Suspense } from "react";
import Loading from "../_components/Loading";
import CheckoutInner from "../_components/checkout/CheckoutInner";

function Checkout() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckoutInner />
    </Suspense>
  );
}

export default Checkout;
