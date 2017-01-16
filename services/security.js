class Security {
    checkModel(req, res, model){


        return new Promise((resolve, reject) => {
            if(model._account.toString() != req.user._account._id.toString()) {
                reject({ error : 'model_access_denied' });
            }
            else {
                resolve();
            }
        });
    }
}

module.exports = new Security;