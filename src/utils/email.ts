import { htmlToText } from 'html-to-text';
import nodemailer from 'nodemailer';
import { renderFile } from 'pug';
interface IEmail {
  to: string;
  firstName: string;
  url: string;
  from: string;
}

interface IUser {
  email: string;
  name: string;
}

type DailyAppointments = Array<{
  appointmentNumber: number;
  patientName: string;
  date: string;
}>;

export default class Email implements IEmail {
  to: string;
  firstName: string;
  url: string;
  from: string;

  constructor(user: IUser, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Vastra Team <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Need Authentcation from `SendGrid` for production
      /* return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      }); */
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: +process.env.EMAIL_PORT!,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(
    template: 'invoice' | 'newAppointment' | 'dailyAppointment',
    subject: string,
    dailyAppointments?: DailyAppointments
  ) {
    // todo 1) Render HTML based on a pug template
    const html = renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      usr: this.url,
      subject,
      dailyAppointments,
    });

    // todo 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    // todo 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendInvoice() {
    await this.send('invoice', 'Your invoice for appointment');
  }

  async sendNewAppointment() {
    await this.send('newAppointment', 'New Appointment');
  }

  async sendDailyAppointment(DailyAppointments: DailyAppointments) {
    await this.send(
      'dailyAppointment',
      'The Daily Appointments',
      DailyAppointments
    );
  }
}
