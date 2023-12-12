const amqplib = require('amqplib/callback_api');
const nodemailer = require('nodemailer');

require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'veronica.okuneva58@ethereal.email',
        pass: 'R5qkHY9aVSZC98y123'
    }
});

amqplib.connect(process.env.AMQP_URL, (err, conn) => {
    if (err) throw err;

    // Listener
    conn.createChannel((err, ch) => {
        if (err) throw err;

        ch.assertQueue(process.env.QUEUE);

        ch.consume(process.env.QUEUE, (msg) => {
            if (msg !== null) {

                var msgJSON = JSON.parse(msg.content.toString());
                // console.log(msgJSON)
                const mailOptions = {
                    from: 'no-reply@mark85.com',
                    to: msgJSON.email,
                    subject: 'E-mail enviado!',
                    html: msgJSON.html
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(" [x] Jaiminho enviando email para => %s", msg.content.toString());
                        console.log(' [x] Preview URL: %s', nodemailer.getTestMessageUrl(info));

                        ch.ack(msg);
                    }
                });
            } else {
                console.log('Consumer cancelled by server');
            }
        });
    });

});



