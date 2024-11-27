import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

// Define the interface for the email object
interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;  // userId is of type string, so it should be used as _id in the query
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
  try {
    // Hash the userId to create the token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update the user document based on the emailType
    if (emailType === "VERIFY") {
      await User.findOneAndUpdate({ _id: userId }, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date().getTime() + 3600000, // 1 hour expiry
        },
      });
    } else if (emailType === "RESET") {
      await User.findOneAndUpdate({ _id: userId }, {
        $set: {
          forgetPasswordToken: hashedToken,
          forgetPasswordTokenExpiry: new Date().getTime() + 3600000, // 1 hour expiry
        },
      });
    }

    // Create the transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lightsout1811@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD, // Use an App Password if 2FA is enabled
      },
    });
<<<<<<< Updated upstream
    
=======
>>>>>>> Stashed changes

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
      sandbox: true, // If you use Mailtrap in sandbox mode, keep this. Otherwise, remove it.
    };

    // Send the email
    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error) {
    // Provide more specific error handling
    throw new Error(`Error sending email: ${error instanceof Error ? error.message : String(error)}`);
  }
};
