class Sendgrid {

    static send(toEmail, subject, content, contentType = 'text/html') {

        return new Promise((resolve, reject) => {
            let helper      = require('sendgrid').mail;

            let from_email  = new helper.Email('noreply@crm.com');
            let to_email    = new helper.Email(toEmail);
            let mail        = new helper.Mail(from_email, subject, to_email, new helper.Content(contentType, content));

            let sg = require('sendgrid')(process.env.SENDGRID_KEY);
            let request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
            });

            sg.API(request, function(error, response) {
                error ? reject(error) : resolve(response);
            })
        });

    }
}

module.exports = Sendgrid;


