let timestampable = function lastModifiedPlugin (schema, options) {


    schema.add({ updatedAt: Date, default : null });
    schema.add({ deletedAt: Date, default : null });

    schema.pre('save', function (next) {
        this.lastMod = new Date
        next()
    })

    if (options && options.index) {
        schema.path('lastMod').index(options.index)
    }
};

module.exports = timestampable;