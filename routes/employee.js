var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

// connect ot model
let Employee = require("../models/employee");


/* GET employees listing. */
router.get('/', function(req, res, next) {
    Employee.find((err, employeeList)=>{
        if(err){
            return console.error(err);
        }else {
            //console.log(employee);
            res.render('./employee/list', {title: 'Employee Info', EmployeeList: employeeList})
        }
    });
    
});


// to open add employee page
router.get('/add', function(req, res, next) {
    res.render('./employee/add', {title: 'Add employee'});
})

// to inser empoyee data into mongdb collection
router.post('/add', (req, res, next) => {
    // getting data from form
    //console.log("body: ", req.body);
    let newEmployee = Employee({
        name: req.body.name,
        address: req.body.company,
        contactNumber: req.body.contactNumber
    });

    // insert data into the MongoDB
    Employee.create(newEmployee,(err, data) => {
        if(err) {
            console.log(err);
            res.end(err);
        }else {
            res.redirect('/employee');
        }
    });
})


// to delete documents from the collection
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    Employee.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/employee');
        }
    })
})

module.exports = router;
