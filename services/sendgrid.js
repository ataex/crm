class Sendgrid {

    static send(toEmail, subject, content, contentType = 'text/html') {
        let sendgridConfig  = require('./../config/sendgrid');
        let helper          = require('sendgrid').mail;

        let from_email  = new helper.Email('noreply@crm.com');
        let to_email    = new helper.Email(toEmail);
        content         = new helper.Content(contentType, content);
        let mail        = new helper.Mail(from_email, subject, to_email, content);

        let sg = require('sendgrid')(sendgridConfig.SENDGRID_API_KEY);
        let request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });

        sg.API(request, function(error, response) {
            console.log(response.statusCode)
            console.log(response.body)
            console.log(response.headers)
        })
    }
}

module.exports = Sendgrid;


