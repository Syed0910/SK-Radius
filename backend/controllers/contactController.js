const { ContactMessage } = require('../models');
const nodemailer = require('nodemailer');

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // 1. Validate incoming data
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, Email, and Message are required fields.' });
    }

    // 2. Save to database via Sequelize
    const newMessage = await ContactMessage.create({
      name,
      email,
      company: company || null,
      message,
    });

    // 3. Send Email Notification
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_RECIPIENT_EMAIL, // muskanaanirids07@gmail.com
      replyTo: email,
      subject: `New Website Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #fa6e43; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin-top: 0; color: #555;"><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #333;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #999; margin-top: 30px;">
            This email was generated from the SKRadius website contact form.
          </p>
        </div>
      `,
    };

    // Send email (we don't await this so the user gets a faster response)
    transporter.sendMail(mailOptions).catch(err => {
      console.error('Failed to send contact email:', err);
    });

    // 4. Return success
    return res.status(201).json({ 
      success: true, 
      message: 'Message saved and email sent successfully',
      data: newMessage
    });

  } catch (error) {
    console.error('Error in submitContactForm:', error);
    return res.status(500).json({ error: 'Internal server error while processing the request.' });
  }
};
