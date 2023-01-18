const { TWILIO_SID, TWILIO_TOKEN, SENDGRID_API_KEY, ADMIN_PHONE, ADMIN_EMAIL } =
  process.env;

const twilio = require("twilio")(TWILIO_SID, TWILIO_TOKEN);
const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(SENDGRID_API_KEY);

const notificationService = {
  notifyByWhatsApp: async (nuevoUsuario) => {
    await twilio.messages.create({
      body: `Tienes un nuevo usuario registrado con el nombre ${nuevoUsuario.username} y su email es ${nuevoUsuario.email}`,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${ADMIN_PHONE}`,
    });
  },
  notifyByEmailCompra: (asunto, listaProductos, usuarioComprador) => {
    /* const msg = {
      to: ADMIN_EMAIL, // Change to your recipient
      from: ADMIN_EMAIL, // Change to your verified sender
      subject: "Nueva compra",
      html: `Nueva compra de ${asunto.username} ${usuarioComprador.email} ${listaProductos.email}`,
    };
    await sendGrid.send(msg);
    console.info("Comprobante de compra enviado por whats app"); */
  },
  notifyByEmailUser: async (nuevoUsuario) => {
    const msg = {
      to: ADMIN_EMAIL, // Change to your recipient
      from: ADMIN_EMAIL, // Change to your verified sender
      subject: "Nuevo usuario",
      html: `Nuevo usuario registrado ${nuevoUsuario.username} ${nuevoUsuario.email}`,
    };
    await sendGrid.send(msg);
    console.info("Email enviado correctamente");
  },
};
module.exports = notificationService;
