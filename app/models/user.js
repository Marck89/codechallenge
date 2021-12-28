const mongoose = require('mongoose');
//var AutoIncrement = require('mongoose-sequence')(mongoose);

var AddressSchema = new mongoose.Schema({
	id : { type: Number, default: 0 },
	state: String,
	country: String,
	street: String,
	city: String,
	zip: String
},{ _id: false });

var  UserSchema = mongoose.Schema({
    id: { type: Number,required: true },
    name: String,
	email : String,
	birthday : Date,
    address: AddressSchema
},{ versionKey: false });

//UserSchema.plugin(AutoIncrement, {id:'id_user',inc_field: 'id'});
UserSchema.index({id: 1}, {unique: true});
var counter = mongoose.model('User', UserSchema);
module.exports = counter;



