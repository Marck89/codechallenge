const User = require('../models/user.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }
    // Create a User
    const user = new User({ 
		id : req.body.id,    
		name: req.body.name,
		email : req.body.email,
		birthday : req.body.birthday,
		address: 
		{
			id : req.body.address.id,    
			state: req.body.address.state,
			country: req.body.address.country,
			street: req.body.address.street,
			city: req.body.address.city,
			zip: req.body.address.zip
		}
    });
    // Save User in the database
    user.save()
    .then(data => {
        res.send('CREATED');
    }).catch(err => {
		res.status(405).send({
            message:   "Invalid input"
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find({}, {_id:0})
    .then(users => {
         if(!users || users.length == 0) {
            return res.status(404).send({
                message: "User list empty"
            });            
        }
        res.send({
            message: "OK", users
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users"
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
	const filter = {"id" : req.params.userId};
    User.find(filter, {_id:0})
    .then(user => {
        if(!user || user.length == 0) {
            return res.status(404).send({
                message: "User not found"
            });            
        }
        res.send({
            message: "OK", user
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(400).send({
                message: "User not found"
            });                
        }
        return res.status(400).send({
            message: "Invalid userID"
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
	const filter ={"id" : req.params.userId};
    // Find user and update it with the request body
    User.findOneAndUpdate(filter, {
        $set: {
			id : req.body.id, 
            name: req.body.name,
			email : req.body.email,
			birthday : req.body.birthday,
			address: 
			{
				id : req.body.address.id,    
				state: req.body.address.state,
				country: req.body.address.country,
				street: req.body.address.street,
				city: req.body.address.city,
				zip: req.body.address.zip
			}
		}
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }
        res.send({
            message: "OK"
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(400).send({
                message: "Invalid userID"
            });                
        }
        return res.status(400).send({
            message: "Invalid userID"
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
	const filter ={"id" : req.params.userId};
    User.findOneAndRemove(filter)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }
        res.send({
            message: "OK"
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found"
            });                
        }
        return res.status(400).send({
            message: "Invalid userID"
        });
    });
};


