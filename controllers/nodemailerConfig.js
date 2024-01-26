// This file is used to configure nodemailer for sending emails
// to users when they register or reset their password
const nodemailer = require('nodemailer');


const sendEmail = async (to, subject, text) => {
    try{
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        // enter email and password for the email account you want to use to send emails
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
};

const info = await transporter.sendMail(mailOptions);
console.log('Message sent: ', info.messageId);
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
};

module.exports = { sendEmail };  //Took 'transporter' out of the module.exports  -CRN