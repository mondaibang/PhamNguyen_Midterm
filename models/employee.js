let mongoose = require('mongoose');

// create a Model of employee
let employeeModel = mongoose.Schema(
    {
        "name": String,
        "address": String,
        "contactNumber": String
    },
    {
        collection:"employee"
    }
);

module.exports = mongoose.model('Employee', employeeModel);