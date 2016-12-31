module.exports = function (schema) {

    schema.add({ deletedAt: { type : Date, default : null }});

    schema.methods.softdelete = function(callback) {
        this.deletedAt = new Date();
        this.save(callback);
    };

    schema.methods.restore = function(callback) {
        this.deletedAt = null;
        this.save(callback);
    }
};
