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
}

module.exports = new Security;