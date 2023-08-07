module.exports = mongoose => {

    var schema = mongoose.Schema(

        {
            name: String,
            quantity: Number,
            category: String
        },
    );

    schema.method("toJSON", function () {

        const { __v, _id, ...object } = this.toObject();

        object.id = _id;

        return object;

    });

    const Order = mongoose.model("order", schema);

    return Order;

}