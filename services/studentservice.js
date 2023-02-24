const Student = require('../models/student')

exports.create = async (req, res) => {

    const exist = await Student.find({ name: req.body.name })

    if (exist.length == 0) {
        const newStudent = new Student({
            name: req.body.name,
            age: req.body.age,
            note: req.body.note
        })

        newStudent.save()
            .then(data => res.send(data))
            .catch(err => res.status(500).send({ message: "Erreur" }))
    }
    else {
        res.status(500).send({ message: "Already exists" })
    }

}

exports.update = async (req, res) => {

}

exports.delete = async (req, res) => {
    Student.deleteMany()
        .then(data => {
            res.send({
                message: `${data.deletedCount} Student(s) were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Students."
            });
        });
}

exports.findByName = async (req, res) => {
    Student.find({ name: req.params.name })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.findSorted = async (req, res) => {
    Student.find({ note: { $gt: 10 } }).sort({ name: 1 })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.findAll = async (req, res) => {
    Student.find({ age: { $gte: 18 } })
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
}

exports.advancedUpdate = async (req, res) => {

    const students = await Student.find({ age: { $gt: 18 }, name: { $regex: '^a' } })
    for (let i = 0; i < students.length; i++) {
        await Student.findOneAndUpdate({_id: students[i]._id}, { $set: { note: students[i].note += 2 } })
    }
    res.send({ message: "c bon" })
}