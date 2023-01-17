const sgMail = require("@sendgrid/mail");
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require("twilio")(accountSid, authToken);
console.log(accountSid);
const notificationService = {
  notifyByWhatsApp: async (nuevoUsuario) => {
    await client.messages
      .create({
        body: `Nuevo usuario registrado ${nuevoUsuario.username} ${nuevoUsuario.email}`,
        from: "whatsapp:+14155238886",
        to: `whatsapp:${process.env.ADMIN_PHONE}`,
      })
  },
  notifyByEmailCompra: (asunto, listaProductos, usuarioComprador) => {},
  notifyByEmailUser: async(nuevoUsuario) => {
     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: process.env.ADMIN_EMAIL, // Change to your recipient
      from: process.env.ADMIN_EMAIL, // Change to your verified sender
      subject: "Nuevo usuario",
      text: `Nuevo usuario registrado ${nuevoUsuario.username} ${nuevoUsuario.email}`,
      //html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    await sgMail  
      .send(msg)
  },
};
module.exports = notificationService;
