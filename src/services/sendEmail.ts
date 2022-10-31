import nodemailer from "nodemailer";

export default async function sendEmail(
  email: string,
  username: string,
  token: string,
  id: string,
  route: string,
  message: string,
  title: string
) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "luccazvps@gmail.com", // generated ethereal user
        pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "Memory Game  <luccazvps@gmail.com>", // sender address
      to: email, // list of receivers
      subject: `${title}`, // Subject line
      text: ``, // plain text body
      html: `<p>Hi ${username}, ${message}</p><br/><a href="${process.env.DOMAIN_NAME}/${route}/${token}/${id}"> ${process.env.DOMAIN_NAME}/${route}/${token}/${id}   </a>
              `, // html body
    });
  } catch (e) {
    console.log(e);
  }
}
