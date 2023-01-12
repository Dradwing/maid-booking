const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Ashutosh Saini <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "development") {
      //1. with sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, text) {
    //2. send email
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
    };

    //3. send mail
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const subject = "Welcome to Maid Booking family! ";
    const text = `Hi ${this.firstName}!\nThis is the confirmation email that you have created an account on Maid Booking https://maid-booking.onrender.com.\nFollow this link to see your profile: \n ${this.url}.`;
    await this.send(subject, text);
  }

  async sendPasswordReset() {
    const subject = "Your password reset token (valid for 10 minutes).";
    const text = `Forgot your password? Submit a patch request with your new password with confirmPassword to: 
        ${this.url}\n If you did't forgot your password, please ignore this email.`;
    await this.send(subject, text);
  }
  async sendEmailToMe(data) {
    const from = "dradwing50@gmail.com";
    const to = "9058139810ig@gmail.com";
    const subject = `Maid Booking mail from ${data.name} by ${data.email}`;
    const text = data.message;
    const mailOptions = {
      from,
      to,
      subject,
      text,
    };

    //3. send mail
    await this.newTransport().sendMail(mailOptions);
  }
};
