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
      subject: 'DigiSmartMarket Vendor Access - Approved !',
      text: `Hello ${toUser.userName}, 

We would like to confirm that your request for DigiSmart Market Vendor is Approved !.
Good to see your operations being digitized with DigiSmartSolutions !
Thank you`
    };

    // Send email
    await transporter.sendMail(mailOptions);
    logger.info('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmailToUser
