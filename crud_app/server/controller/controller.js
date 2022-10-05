var Userdb = require('../model/model');

// create and save user
exports.create = (req, res)=>{
//validate request
if(!req.body){
    res.status(400).send({ message: "Content can not be empty"});
    return;
}

//new user
const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
})

// save user in the database
user
    .save(user)
    .then(data => {
    // res.send(data)
    res.redirect('/add_user')
})
.catch(err =>{
    res.status(500).send({
        message: err.message || "Some error occured while creating a create operation"
    });
});

}

//retrieve and return all users/ retrieve and return a single user
exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;

    Userdb.findById(id)
    .then(data =>{
        if(!data){
        console.log(data)
            res.status(404).send({ message: "Not found user with id" +id})
        }else{
            res.render('_show', data)
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).send({message: "Error retrieving user with id" + id})
    })
    }else{
    Userdb.find()
    .then(user =>{
        console.log(user)
        res.render('_show', user)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).send({message: err.message || 'Error Occured while retrieving user information'})
    })
    }
}


//Update a new identified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({ message: "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body, {useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({ message: "Error Update user information"})
    })
}

//Delete a user specified user id in the request
exports.delete = (req, res)=>{
    const id= req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong`})
        }else{
            res.send({
                message: "User was deleted successfully"
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message:"Could not delete User with id=" + id
        });
    });
}