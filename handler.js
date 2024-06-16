'use strict';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendEmail = async (event) => {
  try {
    const { receiver_email, subject, body_text } = JSON.parse(event.body);

    if (!receiver_email || !subject || !body_text) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing required fields: receiver_email, subject, body_text',
        }),
      };
    }

    const msg = {
      to: receiver_email,
      from: 'your-email@example.com', // Use your verified sender email
      subject: subject,
      text: body_text,
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email sent successfully!',
      }),
    };
  } catch (error) {
    console.error('Error sending email', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to send email',
        error: error.message,
      }),
    };
  }
};
