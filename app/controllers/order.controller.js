const db = require("../models");

const Order = db.orders;

// Create and Save a new Order
exports.create = (req, res) => {

    // Validate request

    if (!req.body.name) {

        res.status(400).send({ message: "Content can not be empty!" });

        return;

    }

    // Create a Order

    const order = new Order({

        name: req.body.name,
        quantity: req.body.quantity,
        category: req.body.category

    });

    // Save Order in the database

    Order

        .create(order)

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Some error occurred while creating the Order."

            });

        });

};

// Retrieve all Orders from the database.

exports.findAll = (req, res) => {

    const name = req.query.name;

    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Order.find(condition)

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Some error occurred while retrieving orders."

            });

        });

};

// Find a single Order with an id

exports.findOne = (req, res) => {

    const id = req.params.id;

    Order.findById(id)

        .then(data => {

            if (!data)

                res.status(404).send({ message: "Not found Order with id " + id });

            else res.send(data);

        })

        .catch(err => {

            res

                .status(500)

                .send({ message: "Error retrieving Order with id=" + id });

        });

};

// Update a Order by the id in the request

exports.update = (req, res) => {

    if (!req.body) {

        return res.status(400).send({

            message: "Data to update can not be empty!"

        });

    }

    const id = req.params.id;

    Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

        .then(data => {

            if (!data) {

                res.status(404).send({

                    message: `Cannot update Order with id=${id}. Maybe Order was not found!`

                });

            } else res.send({ message: "Order was updated successfully." });

        });

};

// Delete a Order with the specified id in the request

exports.delete = (req, res) => {

    const id = req.params.id;

    Order.findByIdAndRemove(id)

        .then(data => {

            if (!data) {

                res.status(404).send({

                    message: `Cannot delete Order with id=${id}. Maybe Order was not found!`

                });

            } else {

                res.send({

                    message: "Order was deleted successfully!"

                });

            }

        })

        .catch(err => {

            res.status(500).send({

                message: "Could not delete Order with id=" + id

            });

        });

};

// Delete all Orders from the database.

exports.deleteAll = (req, res) => {

    Order.deleteMany({})

        .then(data => {

            res.send({

                message: `${data.deletedCount} Orders were deleted successfully!`

            });

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Some error occurred while removing all orders."

            });

        });

};