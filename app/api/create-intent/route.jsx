import { NextResponse } from "next/server";
import Stripe from "stripe";

// إزالة علامة ! بعد المتغير لأن JavaScript لا يتطلب تحديد أنواع
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export async function POST(request) {
  try {
    const data = await request.json();
    const amount = data.amount;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100, // تحويل القيمة إلى عدد صحيح
      currency: "USD",
    });

    // إرسال client_secret في الاستجابة
    return NextResponse.json(paymentIntent.client_secret, { status: 200 });
  } catch (error) {
    // التعامل مع الأخطاء وإرجاع الاستجابة
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
