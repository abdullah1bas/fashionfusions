import { EmailTemplate } from "../../_components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();

  try {
    const data = await resend.emails.send({
      from: "7a7abas@gmail.com", // تأكد من أن البريد الإلكتروني مسجل في Resend
      to: [body.email], // البريد الإلكتروني المستلم
      subject: "Your purchase details from Abazza Tech FashionFusion",
      react: EmailTemplate({ body }), // تأكد أن EmailTemplate جاهز لاستقبال props
    });

    // console.log("Email sent successfully:", data); // تحقق من الاستجابة
    return new Response(JSON.stringify(data), { status: 200 }); // إرسال استجابة ناجحة
  } catch (error) {
    console.error("Error sending email:", error); // تحقق من أي أخطاء
    return new Response(JSON.stringify({ error: error.message }), { status: 500 }); // إرسال استجابة عند حدوث خطأ
  }
}
