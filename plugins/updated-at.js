let updatedAt = function lastModifiedPlugin (schema, options) {

    schema.add({ updatedAt: Date, default : null });
    schema.pre('save', function (next) {
        if(this._id) this.updatedAt = new Date;
        next()
    });

};

module.exports = updatedAt;