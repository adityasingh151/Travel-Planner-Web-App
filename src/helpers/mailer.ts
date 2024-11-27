import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { MailtrapTransport } from "mailtrap";

const TOKEN = "aed21bab1a74e5e0d93d60355bc52a54";
const MAILTRAP_TEST_INBOX_ID = 3202472;

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Hash the userId to create the token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findOneAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date().getTime() + 3600000, // 1 hour expiry
        },
      });
    } else if (emailType === "RESET") {
      await User.findOneAndUpdate(userId, {
        $set: {
          forgetPasswordToken: hashedToken,
          forgetPasswordTokenExpiry: new Date().getTime() + 3600000, // 1 hour expiry
        },
      });
    }

    // Create the transporter using MailtrapTransport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lightsout1811@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD, // Use an App Password if 2FA is enabled
      },
    });
    

    // Define email subject and message based on email type
    const subject =
      emailType === "VERIFY" ? "Verify your email" : "Reset your password";
    const htmlMessage = `<p>Click <a href="${
      process.env.DOMAIN
    }/verifyemail?token=${hashedToken}">here</a> to ${
      emailType === "VERIFY" ? "verify your email" : "reset your password"
    }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}
      </p>`;

    // Email options
    const mailOptions = {
      from: {
        name: "Let's Go Travel Planner",
        address: "lightsout1811@gmail.com",
      },
      to: email,
      subject: subject,
      html: htmlMessage,
      category: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      sandbox: true,
    };

    // Send the email
    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};