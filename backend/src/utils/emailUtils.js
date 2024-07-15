import nodemailer from "nodemailer";

const sendOrderConfirmationEmail=async(customerEmail, order)=>{
  try{
    const transporter = nodemailer.createTransport({
       service:'gmail',
        auth: {
          user: "vibhamaurya060@gmail.com",
          pass: "jn7jnAPss4f63QBp6D",
        },
      });

      let mailOptions={
        from: "vibhamaurya060@gmail.com",
        to: customerEmail,
        subject: 'Order Confirmation',
        text: `Thank you for your order, Here is your order details: ${JSON.stringify(order)}`
      };

      let info=await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.messageId}`);
  }catch(error){
    console.log(`error sending email:`,error)
  }
}

export default sendOrderConfirmationEmail;