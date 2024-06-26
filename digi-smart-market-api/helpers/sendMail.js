const transporter = require('./mailer');
const models = require('../models'); // Adjust the path as needed
const logger = require('./logger');

const sendEmailToUser = async (toUserId) => {
  try {
    // Retrieve user data
    const toUser = await models.User.findByPk(toUserId);

    if (!toUser) {
      throw new Error('User not found');
    }

    // Set up email data
    const mailOptions = {
      from: 'digismart800@gmail.com',
      to: toUser.email,
      subject: 'Email from DigiSmart - Access approval',
      text: `Hello ${toUser.userName}, I would like to confirm you that your request for DigiSmart Market Admin is accepted successfully. Please consider the approval. Thank you`
    };

    // Send email
    await transporter.sendMail(mailOptions);
    logger.info('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmailToUser
