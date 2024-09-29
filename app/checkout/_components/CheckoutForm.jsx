import { Container } from "@mui/material";
import { deleteAllProducts } from "../../_redux/cartSlice";
import { useUser } from "@clerk/nextjs";
import { useStripe, useElements, PaymentElement,} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CheckoutForm = ({ amount, products }) => {
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);
    // Send an Email
    sendEmail();

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch("api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    });
    const clientSecret = await res.json();

    const result = await stripe.confirmPayment({
      //  clientSecret de lazem yt8yr m3 kol payment
      clientSecret,
      elements,
      confirmParams: {
        return_url: "https://fashionfusions-two.vercel.app/payment-confirm",
      },
    });

    
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const sendEmail = async () => {
    const res = await fetch("api/send-email", {
      method: "POST",
      body: JSON.stringify({
        amount,
        email: user.primaryEmailAddress.emailAddress,
        fullName: user.fullName,
        products,
      }),
    });
    if(res) dispatch(deleteAllProducts(user?.username)); // Delete all products
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container className="flex flex-col px-10  h-lvh justify-center ">
        <PaymentElement />
        <button className="w-full p-2 mt-4 text-white rounded-md bg-primary" disabled={loading}>
          Submit
        </button>
      </Container>
    </form>
  );
};

export default CheckoutForm;
