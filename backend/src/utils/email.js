import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email
export const sendEmail = async (options) => {
  const transporter = createTransporter();

  const message = {
    from: `${process.env.FROM_NAME || 'AlumniConnect'} <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
};

// Email templates
export const emailTemplates = {
  welcome: (name) => ({
    subject: 'Welcome to AlumniConnect!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to AlumniConnect, ${name}!</h1>
        <p>Thank you for joining our community of students and alumni.</p>
        <p>You can now:</p>
        <ul>
          <li>Connect with alumni from your institution</li>
          <li>Share your experiences through blogs</li>
          <li>Ask questions and get career advice</li>
          <li>Build your professional network</li>
        </ul>
        <p>Get started by completing your profile and exploring the platform.</p>
        <p>Best regards,<br>The AlumniConnect Team</p>
      </div>
    `,
  }),

  connectionRequest: (requesterName, message) => ({
    subject: `New connection request from ${requesterName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">New Connection Request</h1>
        <p><strong>${requesterName}</strong> wants to connect with you on AlumniConnect.</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        <p>Log in to your account to accept or decline this request.</p>
        <p>Best regards,<br>The AlumniConnect Team</p>
      </div>
    `,
  }),

  questionAnswer: (questionTitle, answererName) => ({
    subject: `New answer to your question: ${questionTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">New Answer to Your Question</h1>
        <p><strong>${answererName}</strong> has answered your question:</p>
        <p><strong>"${questionTitle}"</strong></p>
        <p>Log in to your account to view the answer.</p>
        <p>Best regards,<br>The AlumniConnect Team</p>
      </div>
    `,
  }),

  blogComment: (blogTitle, commenterName) => ({
    subject: `New comment on your blog: ${blogTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">New Comment on Your Blog</h1>
        <p><strong>${commenterName}</strong> has commented on your blog post:</p>
        <p><strong>"${blogTitle}"</strong></p>
        <p>Log in to your account to view the comment.</p>
        <p>Best regards,<br>The AlumniConnect Team</p>
      </div>
    `,
  }),
};