const mailer=require("nodemailer")
require("dotenv").config()

// const mailSend=async(to,subject,text)=>{
// const mailSend=async(to,subject,html)=>{
const mailSend=async(to,subject,html,attachments=[])=>{
    const transporter=mailer.createTransport({
        service:"gmail",
        auth:{
             //user:"nilampanchal603@gmail.com",
             //pass:"qrvu tgll cgkh tnpk"
            user:process.env.EMAIL_USER,
            pass:process.env.PASS_USER
        }
    })
    const mailOptions={
        to:to,
        subject:subject,
        // text:text
        html:html,
        attachments:attachments

    }
    const mailResponse=await transporter.sendMail(mailOptions)
    console.log(mailResponse)
    return mailResponse
}
module.exports=mailSend