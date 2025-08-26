import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  private readonly sendGridApiKey = 'YOUR_SENDGRID_API_KEY';

  constructor() {
    sgMail.setApiKey(this.sendGridApiKey);
  }

  async sendForgotPasswordEmail(email: string) {
    const msg = {
      to: email,
      from: 'kishorkumar.official@outlook.com',
      subject: 'Password Reset Request',
      text: 'Your password reset request has been received. Please wait for admin assistance.',
      html: '<p>Your password reset request has been received. Please wait for admin assistance.</p>',
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error.response?.body || error.message);
      throw new Error('Failed to send email');
    }
  }
}