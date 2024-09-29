import { EmailTemplate } from "../../_components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();

  try {
    const data = await resend.emails.send({
      // da 3bara 3an al domin
      from: "onboarding@resend.dev", // تأكد من أن البريد الإلكتروني مسجل في Resend
      // hb3to le meen
      to: [body.email], // البريد الإلكتروني المستلم
      subject: "Your purchase details from Abazza Tech FashionFusion",
      react: EmailTemplate({ body }), // تأكد أن EmailTemplate جاهز لاستقبال props
    });

    // console.log("Email sent successfully:", data); // تحقق من الاستجابة
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
