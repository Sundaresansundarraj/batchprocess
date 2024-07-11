const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();


const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const ACCOUNTSID = process.env.ACCOUNTSID;
const ACCOUNTTOKEN = process.env.ACCOUNTTOKEN;
const PHONENUMBER = process.env.PHONENUMBER

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const twilioClient = twilio(ACCOUNTSID, ACCOUNTTOKEN);

const sendEmail = async (to, subject, body) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    text: body,
  };
  return transporter.sendMail(mailOptions);
};

const sendSMS = async (to, body) => {
    if (!to) {
      throw new Error("The 'to' parameter is missing.");
    }
    // console.log(`Sending SMS to: ${to} with body: ${body}`);
    return twilioClient.messages.create({
      body:body,
      from: PHONENUMBER,
      to:to,
    });
  };

module.exports = {
  sendEmail,
  sendSMS,
};






