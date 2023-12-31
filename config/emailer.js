const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD, 
    },
    tls: {
      rejectUnauthorized: false
    },
});
transporter.verify().then (() => {
    console.log ('Ready to send emails')
})
module.exports = transporter;