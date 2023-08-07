module.exports = mongoose => {

    var schema = mongoose.Schema(

        {
            name: String,
            price: Number,
            quantity: Number,
            description: String,
            category: String
        },
    );

    schema.method("toJSON", function () {

        const { __v, _id, ...object } = this.toObject();

        object.id = _id;

        return object;

    });

    const Medicine = mongoose.model("medicine", schema);

    return Medicine;

};