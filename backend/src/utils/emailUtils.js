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

// Example API endpoint for placing an order
app.post('/api/orders', async (req, res) => {
    try {
      // Process order logic here
  
      // Emit event to update order status and notify customer
      io.emit('orderPlaced', { orderId: 'your_order_id', customerEmail: req.body.customerEmail });
  
      res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
      logger.error(`Error placing order: ${error.message}`);
      res.status(500).json({ error: 'Failed to place order' });
    }
  });

  cron.schedule('0 8 * * 0', async () => {
    try {
      const mailOptions = {
        from: 'your_email@example.com',
        to: 'recipient@example.com',
        subject: 'Weekly Promotion',
        text: 'Check out our latest promotions!'
      };
      await transporter.sendMail(mailOptions);
      logger.info('Promotional email sent successfully.');
    } catch (error) {
      logger.error(`Error sending promotional email: ${error.message}`);
    }
  }, {
    timezone: '' 
  });

  
export default sendOrderConfirmationEmail;