import nodemailer from "nodemailer";

class SendEmailService {
  execute(receiverEmail: string, subject: string, body: string) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "msp.genealogika@gmail.com",
        pass: "12##MSPGenealogika",
      },
    });

    transporter
      .sendMail({
        from: '"Genealogika" <msp.genealogika@gmail.com>', // sender address
        to: receiverEmail, // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        //html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
      })
      .then((info) => {
        console.log({ info });
      })
      .catch(console.error);
  }
}

export { SendEmailService };
