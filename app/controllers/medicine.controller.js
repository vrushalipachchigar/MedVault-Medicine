const db = require("../models");

const Medicine = db.medicines;

// Create and Save a new Medicine
exports.create = (req, res) => {

    // Validate request

    if (!req.body.name) {

        res.status(400).send({ message: "Content can not be empty!" });

        return;

    }

    // Create a Medicine

    const medicine = new Medicine({

        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        category: req.body.category

    });

    // Save Medicine in the database

    Medicine

        .create(medicine)

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Some error occurred while creating the Medicine."

            });

        });

};

// Retrieve all Medicines from the database.

exports.findAll = (req, res) => {

    const name = req.query.name;

    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Medicine

        .find(condition)

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Some error occurred while retrieving medicines."

            });

        });

};

// Find a single Medicine with an id

exports.findOne = (req, res) => {

    const id = req.params.id;

    Medicine.findById(id)

        .then(data => {

            if (!data)

                res.status(404).send({ message: "Not found Medicine with id " + id });

            else res.send(data);

        })

        .catch(err => {

            res

                .status(500)

                .send({ message: "Error retrieving Medicine with id=" + id });

        });
};

// Update a Medicine by the id in the request

exports.update = (req, res) => {

    if (!req.body) {

        return res.status(400).send({

            message: "Data to update can not be empty!"

        });

    }

    const id = req.params.id;

    Medicine.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

        .then(data => {

            if (!data) {

                res.status(404).send({

                    message: `Cannot update Medicine with id=${id}. Maybe Medicine was not found!`

                });

            } else res.send({ message: "Medicine was updated successfully." });

        })

        .catch(err => {

            res.status(500).send({

                message: "Error updating Medicine with id=" + id

            });

        });

};

// Delete a Medicine with the specified id in the request

exports.delete = (req, res) => {

    const id = req.params.id;

    Medicine.findByIdAndRemove(id)

        .then(data => {

            if (!data) {

                res.status(404).send({

                    message: `Cannot delete Medicine with id=${id}. Maybe Medicine was not found!`

                });

            } else {

                res.send({

                    message: "Medicine was deleted successfully!"

                });

            }

        })

        .catch(err => {

            res.status(500).send({

                message: "Could not delete Medicine with id=" + id

            });

        });
};

// Delete all Medicines from the database.

exports.deleteAll = (req, res) => {

    Medicine.deleteMany({})

        .then(data => {

            res.send({

                message: `${data.deletedCount} Medicines were deleted successfully!`

            });

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Some error occurred while removing all medicines."

            });

        });

};

