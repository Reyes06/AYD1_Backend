const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'AYD1.Grupo7@gmail.com',
        pass: 'PassWord123$'
    }
});

const sendMail = (from, to, subject, text) =>
{
    const mailOptions = {from, to, subject, text};
    transporter.sendMail(mailOptions, (err, info) =>
    {
        if (err) console.log(err);
        else     console.log(info);
    }); 
}

module.exports = sendMail;