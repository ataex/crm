class Security {
    checkModel(req, model){
        return new Promise((resolve, reject) => {
            if(model._account.toString() != req.user._account._id.toString()) {
                reject({ error : 'document_access_denied' });
            }
            else {
                resolve(model);
            }
        });
    }

    userIs(req, type) {
        let user = req.user;

        return new Promise((resolve, reject) => {
            user.type == type ? resolve() : reject();
        })
    }
}

module.exports = new Security;