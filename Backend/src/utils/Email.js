import nodemailer from 'nodemailer'

const generateEmail = (name, toEmail, url, subject, html) => {
    const transoporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })


    const mailOptions = {
        from: `Vishal Yadav <${process.env.EMAIL}>`,
        to: toEmail,
        subject: subject,
        html: `<h4 style="color: rgb(0, 17, 255);  font-size: 16px;">Hey ${name}</h4>` + html
    }


    transoporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error sending email :', err);
        } else {
            console.log('Email sent :' + info);

        }
    })
}

export default generateEmail;