const nodemailer = require('nodemailer');

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: 'digismart800@gmail.com', // your email
    pass: 'echj beds emef kqqe' // your email password or app-specific password
  }
});

module.exports = transporter;
