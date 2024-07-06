const nodemailer = require("nodemailer")

module.exports.sendMail = async (req, res, user) => {
    const OTP = Math.floor(Math.random() * 9000)
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: process.env.ADMIN_EMAIL_ADDRESS,
            pass: process.env.ADMIN_EMAIL_PASS,
        },
    });

    const info = {
        from: '"Social 👻" <mrsourabh05@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `Your one time password to reset password is <h1>${OTP}</h1>`, // html body
    };

    transporter.sendMail(info, async(err, info) => {
        if (err) return res.send(err)
            // console.log(info);
            // console.log(user);
            user.otp=OTP
            await user.save()
            return res.redirect(`/verifyOTP/${user._id}`)
        
    })
}