const nodemailer = require("nodemailer");

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

async function sendActivationMail(transporter, to, link) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: "Активация аккаунта на " + process.env.API_URL,
    text: "",
    html: `
      <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
      </div>
    `,
  });
}

const transporter = createTransporter();

module.exports = {
  sendActivationMail: (to, link) => sendActivationMail(transporter, to, link),
};
