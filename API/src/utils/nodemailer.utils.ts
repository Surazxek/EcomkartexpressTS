import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.gmail.com",

  port: Number(
    process.env.SMTP_PORT ?? 587
  ),

  secure:
    Number(process.env.SMTP_PORT ?? 587) === 465,

  family: 4,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});


export const sendVerificationEmail = async (
  email: string,
  token: string
) => {

  // ⭐ For now, directly call backend
  const verificationUrl =
    `${process.env.API_URL}/auth/verify-email?token=${token}`;


  await transporter.sendMail({
    from: `"Shop Kart" <${process.env.SMTP_USER}>`,

    to: email,

    subject: "Verify your Shop Kart account",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 20px;
      ">

        <h2>Welcome to Shop Kart!</h2>

        <p>
          Thank you for registering with Shop Kart.
        </p>

        <p>
          Please click the button below
          to verify your email address.
        </p>

        <a
          href="${verificationUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #008080;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Verify Email
        </a>

        <p style="margin-top: 20px;">
          This verification link will expire
          in 15 minutes.
        </p>

      </div>
    `,
  });
};

































// import nodemailer from "nodemailer";



// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST ?? "smtp.gmail.com",
//   port: Number(process.env.SMTP_PORT ?? 587),
//   secure: Number(process.env.SMTP_PORT ?? 587) === 465,

//   // Force IPv4 because you previously got ENETUNREACH
//   family: 4,

//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// export const sendVerificationEmail = async (
//   email: string,
//   token: string
// ) => {
//   const verificationUrl =
//     `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

//   await transporter.sendMail({
//     from: `"Shop Kart" <${process.env.SMTP_USER}>`,

//     to: email,

//     subject: "Verify your Shop Kart account",

//     html: `
//       <h2>Welcome to Shop Kart!</h2>

//       <p>
//         Thank you for creating an account.
//       </p>

//       <p>
//         Please verify your email address by clicking
//         the button below.
//       </p>

//       <a
//         href="${verificationUrl}"
//         style="
//           display:inline-block;
//           padding:12px 20px;
//           background:#008080;
//           color:white;
//           text-decoration:none;
//           border-radius:6px;
//         "
//       >
//         Verify Email
//       </a>

//       <p>
//         This verification link will expire in 15 minutes.
//       </p>

//       <p>
//         If you did not create this account,
//         you can ignore this email.
//       </p>
//     `,
//   });
// };