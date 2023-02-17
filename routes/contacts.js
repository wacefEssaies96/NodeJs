const express = require('express');
const router = express.Router();
var Contact = require('../models/contact');

router.get('/', (req, res, next) => {
    Contact.find((err, contacts) => {
        if (err) {
            console.log('err : ' + err);
        } else {
            res.json(contacts);
        }
    })
    // res.json();
});

router.post('/', (req, res, next) => {
    var contact = new Contact({
        fullname: req.body.fullname,
        phone: req.body.phone
    })
    contact.save((err, newContact) => {
        if (err) {
            console.log('err : ' + err);
        } else {
            res.json(newContact);
        }
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Contact.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Contact with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Contact with id=" + id });
        });
});

router.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`
                });
            } else res.send({ message: "Contact was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Contact with id=" + id
            });
        });
});

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    Contact.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
                });
            } else {
                res.send({
                    message: "Contact was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Contact with id=" + id
            });
        });
});


module.exports = router;