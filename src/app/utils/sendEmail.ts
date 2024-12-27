import nodemailer from "nodemailer";
import { envConfig } from "../../config";

export const sendEmail = async (to: string, link: string) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: envConfig.node_end === "production" ? 486 : 587,
		secure: envConfig.node_end ? true : false, // true for port 465, false for other ports
		auth: {
			user: envConfig.emailUtils.email,
			pass: envConfig.emailUtils.password,
		},
	});

	const info = await transporter.sendMail({
		from: envConfig.emailUtils.email, // sender address
		to, // list of receivers
		subject: "Reset Trip Mate password", // Subject line
		html: `
			<div>
				<p style='margin-bottom: "20px"'>
					<b>Reset your password within 10 minutes</b>
				</p>
				<a href=${link} >Click here to reset your password</a>
			</div>
		`,
	});
	return info?.messageId;
};
