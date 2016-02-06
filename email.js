var nodemailer = require('nodemailer');
function SendEmail(data, cb){
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: '',
        pass: ''
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

var mailOptions = {
    from: 'Switches <fromAddress>', // sender address
    to: 'toAddress', // list of receivers
    subject: 'Switch Backups', // Subject line
    html: data.toString() // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    cb();
});
}

exports.SendEmail = SendEmail;
